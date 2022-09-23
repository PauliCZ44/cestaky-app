import {
    Box,
    Button,
    Checkbox,
    Divider,
    NumberInput,
    Radio,
    SimpleGrid,
    TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import FluentCalendarLtr24Regular from '~icons/fluent/calendar-ltr-24-regular'
interface FormValues {
    distance: number | undefined
    result: string
    name: string
    date: Date | null
    price: number | undefined
    destinationEnd: string
    destinationStart: string
    rounding: string
}

const roundPrice = (price: number, rounding: number) => {
    const factor = Math.pow(10, rounding)
    return Math.round(price / factor) * factor
}

export function AppContent() {
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
        },
    })

    useEffect(() => {
        console.log(form.values)
        const { distance, price, rounding } = form.values
        if (distance && price) {
            form.setFieldValue('result', `Kč ${roundPrice(distance * price, parseInt(rounding))},-`)
        }
    }, [form.values])

    return (
        <Box px="sm">
            <form onSubmit={form.onSubmit(values => console.log(values))}>
                <SimpleGrid cols={2} pt="1rem" pb="3rem" spacing="xl">
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
                        step={0.05}
                        precision={2}
                        stepHoldDelay={200}
                        stepHoldInterval={100}
                        withAsterisk
                        label="Price per km in kč"
                        {...form.getInputProps('price')}
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
                    <TextInput
                        withAsterisk
                        label="Name of the driver"
                        placeholder="Name"
                        {...form.getInputProps('name')}
                    />
                    <DatePicker
                        icon={<FluentCalendarLtr24Regular />}
                        placeholder="DD/MM/YYYY"
                        label="Date of the drive"
                        withAsterisk
                        {...form.getInputProps('date')}
                    />
                </SimpleGrid>
                <Divider></Divider>
                <SimpleGrid cols={2} pt="1rem" pb="3rem" spacing="xl">
                    <Radio.Group
                        name="rounding"
                        label="Round the result to decimal places"
                        {...form.getInputProps('rounding')}
                    >
                        <Radio value="0" label="0" />
                        <Radio value="1" label="1" />
                        <Radio value="2" label="2" />
                    </Radio.Group>
                    <TextInput
                        mt="md"
                        label="Result in Kč"
                        readOnly
                        {...form.getInputProps('result')}
                    />
                </SimpleGrid>

                {/* <Button type="submit">So smth</Button> */}
            </form>
        </Box>
    )
}
