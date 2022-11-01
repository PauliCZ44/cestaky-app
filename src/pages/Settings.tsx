import { Checkbox, Input, NumberInput, Radio, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { addDoc, collection } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import SaveButton from '../Components/shared/SaveButton'
import { useAuth, useFirestore } from '../lib/firebase'
import { userSettingsAtom } from '../store'
export interface IUserSettings {
    defaultStartDestination: string
    rounding: string
    backDrive: boolean
    defaultPrice: number
}

export default function Settings() {
    const [userSettings, setUserSettings] = useAtom(userSettingsAtom)
    const form = useForm<IUserSettings>({
        initialValues: userSettings,
    })
    const [isLoading, setisLoading] = useState(false)

    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''
    const colRef = useRef(collection(store, 'userData', userId, 'settings'))

    const handleSubmit = async (values: IUserSettings) => {
        setisLoading(true)
        try {
            await addDoc(colRef.current, {
                ...values,
            })
            setUserSettings(values)
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
