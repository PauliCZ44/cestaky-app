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
    Title,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { collection, getDocs } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useRef, useState } from 'react'
import FluentCalendarLtr24Regular from '~icons/fluent/calendar-ltr-24-regular'
import { SerachPlaceInput } from '../Components/serachPlaceInput'
import { AutoCompleteItem } from '../Components/shared/PersonSelectItem'
import { useAuth, useFirestore } from '../lib/firebase'
import { userSettingsAtom } from '../store'
import { createDirectionRequest } from '../utils/constants'
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
    const [userSettings] = useAtom(userSettingsAtom)
    const [startPlaceCoords, setStartPlaceCoords] = useState<any[] | null>()
    const [endPlaceCoords, setEndPlaceCoords] = useState<any[] | null>()
    const form = useForm<FormValues>({
        initialValues: {
            distance: undefined,
            name: '',
            destinationEnd: '',
            destinationStart: userSettings.defaultStartDestination,
            // Todays date
            date: new Date(),
            result: 'Kč 0,-',
            price: userSettings.defaultPrice,
            rounding: userSettings.rounding,
            backDrive: userSettings.backDrive,
        },
    })
    const cols = useMediaLarger('xs') ? 2 : 1
    const { distance, price, rounding, backDrive } = form.values
    const [persons, setPersons] = useState<Person[]>([])
    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''

    useEffect(() => {
        getDocs(collection(store, 'userData', userId, 'persons')).then(docsSnap => {
            setPersons(docsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Person)))
        })
        return
    }, [])

    useEffect(() => {
        console.log(startPlaceCoords, endPlaceCoords, 'eff')
        if (startPlaceCoords && endPlaceCoords) {
            fetch(createDirectionRequest(startPlaceCoords, endPlaceCoords)).then(
                (res: any) => {
                    res.json().then((data: any) => {
                        const distance = data.routes[0].distance
                        form.setFieldValue('distance', distance * 0.001)
                    })
                },
                (err: any) => {
                    console.log(err)
                }
            )
        }
        // deps - better to check if place coords changed with this hack, than additional requests :)
    }, [JSON.stringify(startPlaceCoords), JSON.stringify(endPlaceCoords)])

    useEffect(() => {
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
        console.log(form.values)
    }, [distance, price, rounding, backDrive])

    const handleAutocompleteConfirm = (value: Person) => {
        form.setFieldValue('name', value.name)
        form.setFieldValue('destinationStart', value.defaultStartDestination)
        showNotification({
            title: `${value.name} selected.`,
            message: `Default start destination set to ${value.defaultStartDestination}`,
            autoClose: 2500,
        })
    }

    const autocompleteData = useMemo(
        () => persons.map(item => ({ ...item, value: item.name })),
        [persons]
    )

    return (
        <>
            <Title order={2}>Calculator</Title>
            <form
                onSubmit={form.onSubmit(values => console.log(values))}
                className="position-relative"
            >
                <SimpleGrid cols={cols} pt="1rem" pb="xl" spacing="md">
                    <Autocomplete
                        transitionDuration={100}
                        transition="fade"
                        withAsterisk
                        label="Name of the driver"
                        placeholder="Name"
                        data={autocompleteData}
                        onItemSubmit={handleAutocompleteConfirm}
                        itemComponent={AutoCompleteItem}
                        filter={(value, item) =>
                            item.value.toLowerCase().includes(value.toLowerCase().trim())
                        }
                        {...form.getInputProps('name')}
                    />
                    <DatePicker
                        icon={<FluentCalendarLtr24Regular />}
                        placeholder="DD/MM/YYYY"
                        label="Date of the drive"
                        withAsterisk
                        {...form.getInputProps('date')}
                    />
                    <SerachPlaceInput
                        withAsterisk
                        label="Start destination"
                        placeholder="Search..."
                        onItemSubmit={place => {
                            setStartPlaceCoords(place.center)
                        }}
                        {...form.getInputProps('destinationStart')}
                    />
                    <SerachPlaceInput
                        withAsterisk
                        label="End destination"
                        placeholder="Search..."
                        onItemSubmit={place => {
                            setEndPlaceCoords(place.center)
                        }}
                        {...form.getInputProps('destinationEnd')}
                    />

                    <NumberInput
                        min={1}
                        step={0.5}
                        precision={1}
                        stepHoldDelay={200}
                        stepHoldInterval={100}
                        withAsterisk
                        label="Distance (km)"
                        placeholder="km"
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
        </>
    )
}
