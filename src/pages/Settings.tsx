import {
    Button,
    Checkbox,
    Input,
    LoadingOverlay,
    NumberInput,
    Radio,
    SimpleGrid,
    TextInput,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useRef, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { useAuth, useFirestore } from '../lib/firebase'
import { showNotification } from '@mantine/notifications'
import SaveButton from '../Components/shared/SaveButton'
export interface IUserSettings {
    defaultStartDestination: string
    rounding: string | null
    backDrive: boolean
    defaultPrice: number
}

export default function Settings() {
    const form = useForm<IUserSettings>({
        initialValues: {
            defaultStartDestination: '',
            rounding: null,
            backDrive: true,
            defaultPrice: 4,
        },
    })
    const [isLoading, setisLoading] = useState(false)
    const [isOverlayVisible, setOverlayVisible] = useState(true)

    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''
    const colRef = useRef(collection(store, 'userData', userId, 'settings'))

    useEffect(() => {
        setOverlayVisible(true)
        getDocs(colRef.current).then(docsSnap => {
            const data = docsSnap.docs[0]?.data()
            form.setValues({
                defaultStartDestination: data?.defaultStartDestination || '',
                rounding: data?.rounding || '0',
                backDrive: data?.backDrive || true,
                defaultPrice: data?.defaultPrice || 4,
            })
            setOverlayVisible(false)
        })
    }, [])

    const handleSubmit = async (values: IUserSettings) => {
        setisLoading(true)
        try {
            //delete id from values
            await addDoc(colRef.current, {
                ...values,
            })
            showNotification({
                color: 'green',
                title: `Success`,
                message: `Settings saved`,
            })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
        setisLoading(false)

        return
    }

    return (
        <>
            <Title order={2}>Settings</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <SimpleGrid
                    cols={1}
                    pt="1rem"
                    pb="3rem"
                    spacing="xl"
                    sx={{ maxWidth: '500px', position: 'relative' }}
                >
                    <LoadingOverlay visible={isOverlayVisible} overlayBlur={1} />
                    <TextInput
                        description="Applied if no person is selected or person do not have default start destination"
                        label="Default start destination"
                        {...form.getInputProps('defaultStartDestination')}
                    />
                    <NumberInput
                        min={1}
                        step={0.05}
                        precision={2}
                        stepHoldDelay={200}
                        stepHoldInterval={100}
                        withAsterisk
                        label="Default price per km in kč"
                        {...form.getInputProps('defaultPrice')}
                    />

                    <Radio.Group
                        mr="lg"
                        name="rounding"
                        label="Default rounding of the result to decimal places"
                        {...form.getInputProps('rounding')}
                    >
                        <Radio value="0" label="No rounding" />
                        <Radio value="1" label="10s" />
                        <Radio value="2" label="100s" />
                    </Radio.Group>
                    <Input.Wrapper label="Default value of 'Include drive back'">
                        <Checkbox
                            pt={10}
                            {...form.getInputProps('backDrive', { type: 'checkbox' })}
                            label="Include drive back"
                        />
                    </Input.Wrapper>
                    <SaveButton loading={isLoading} mt="sm">
                        {isLoading ? 'Saving...' : 'Save'}
                    </SaveButton>
                </SimpleGrid>
            </form>
        </>
    )
}
