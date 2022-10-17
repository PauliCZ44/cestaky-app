import {
    Autocomplete,
    Box,
    Checkbox,
    Divider,
    Input,
    NumberInput,
    Radio,
    SimpleGrid,
    TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import FluentCalendarLtr24Regular from '~icons/fluent/calendar-ltr-24-regular'
import { useAuth, useFirestore } from '../lib/firebase'
import { useMediaLarger } from '../utils/mediaQueriesConsts'
import { Person } from './Persons'
interface FormValues {
    distance: number | undefined
    result: string
    name: string
    date: Date | null
    price: number | undefined
    destinationEnd: string
    destinationStart: string
    rounding: string
    backDrive: boolean
}

const roundPrice = (price: number, rounding: number) => {
    const factor = Math.pow(10, rounding)
    return Math.round(price / factor) * factor
}

export default function MainApp() {
    const form = useForm<FormValues>({
        initialValues: {
            distance: undefined,
            name: '',
            destinationEnd: '',
            destinationStart: 'Prlov',
            date: null,
            result: 'Kč 0,-',
            price: 4,
            rounding: '0',
            backDrive: true,
        },
    })

    const cols = useMediaLarger('xs') ? 2 : 1

    const { distance, price, rounding, backDrive } = form.values
    const [persons, setPersons] = useState<Person[]>([])
    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''

    useEffect(() => {
        getDocs(collection(store, 'userData', userId, 'persons')).then(docsSnap => {
            console.log(
                'docsSnap.docs.map(doc => doc.data().name as Person) :>> ',
                docsSnap.docs.map(doc => doc.data().name as Person)
            )
            setPersons(docsSnap.docs.map(doc => doc.data().name as Person))
        })
        return
    }, [])

    useEffect(() => {
        console.log(form.values)
        const { distance, price, rounding, backDrive } = form.values
        if (distance && price) {
            let res = roundPrice(distance * price * (backDrive ? 2 : 1), parseInt(rounding))
            if (res === 0) {
                form.setFieldValue('result', `Invalid inputs - rounded to 0`)
                return
            }
            form.setFieldValue('result', `Kč ${roundPrice(res, parseInt(rounding))},-`)
        } else {
            form.setFieldValue('result', `...`)
        }
    }, [distance, price, rounding, backDrive])

    return (
        <form onSubmit={form.onSubmit(values => console.log(values))}>
            {JSON.stringify(persons)}
            <SimpleGrid cols={cols} pt="1rem" pb="xl" spacing="md">
                <Autocomplete
                    withAsterisk
                    label="Name of the driver"
                    placeholder="Name"
                    data={persons}
                    {...form.getInputProps('name')}
                />
                <DatePicker
                    icon={<FluentCalendarLtr24Regular />}
                    placeholder="DD/MM/YYYY"
                    label="Date of the drive"
                    withAsterisk
                    {...form.getInputProps('date')}
                />
                <TextInput
                    withAsterisk
                    label="Start destination"
                    placeholder="Search..."
                    {...form.getInputProps('destinationStart')}
                />
                <TextInput
                    withAsterisk
                    label="End destination"
                    placeholder="Search..."
                    {...form.getInputProps('destinationEnd')}
                />
                <NumberInput
                    min={1}
                    step={0.5}
                    precision={1}
                    stepHoldDelay={200}
                    stepHoldInterval={100}
                    withAsterisk
                    label="Distance"
                    placeholder="Km"
                    {...form.getInputProps('distance')}
                />
                <NumberInput
                    min={1}
                    step={0.05}
                    precision={2}
                    stepHoldDelay={200}
                    stepHoldInterval={100}
                    withAsterisk
                    label="Price per km in kč"
                    {...form.getInputProps('price')}
                />
            </SimpleGrid>
            <Divider></Divider>
            <SimpleGrid cols={cols} pt="1rem" pb="3rem" spacing="xl">
                <Box
                    sx={theme => ({
                        display: 'flex',
                        flexDirection: 'row',
                        gap: theme.spacing.lg,
                        flexWrap: 'wrap',
                    })}
                >
                    <Radio.Group
                        mr="lg"
                        name="rounding"
                        label="Round the result to decimal places"
                        {...form.getInputProps('rounding')}
                    >
                        <Radio value="0" label="No rounding" />
                        <Radio value="1" label="10s" />
                        <Radio value="2" label="100s" />
                    </Radio.Group>
                    <Input.Wrapper label="Include drive back">
                        <Checkbox
                            pt={10}
                            {...form.getInputProps('backDrive', { type: 'checkbox' })}
                        />
                    </Input.Wrapper>
                </Box>
                <TextInput label="Result in Kč" readOnly {...form.getInputProps('result')} />
            </SimpleGrid>
        </form>
    )
}
