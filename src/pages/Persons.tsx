import { Button, Group, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

export interface Person {
    name: string
    address: string
    defaultStartDestination: string
}

interface FormValues extends Person {}

export default function Persons() {
    const [persons, setPersons] = useState<Person[]>([])
    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            address: '',
            defaultStartDestination: 'Prlov',
        },
        validate: {
            name: value => (value.length === 0 ? 'Name is required' : null),
        },
    })

    const handleSubmit = (values: FormValues) => {
        console.log(values)
        setPersons([...persons, values])
    }

    return (
        <>
            <SimpleGrid cols={2} pt="1rem" spacing="xl">
                <div>
                    <Title order={2}>Add new person</Title>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <SimpleGrid spacing="xl">
                            <TextInput
                                withAsterisk
                                label="Name"
                                placeholder="Name"
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                label="Address"
                                placeholder="Prlov 123, Valašká Polanka, 756 11"
                                {...form.getInputProps('address')}
                            />
                            <TextInput
                                label="Default start destination"
                                placeholder="Prlov"
                                {...form.getInputProps('defaultStartDestination')}
                            />
                            <Button type="submit" mt="md">
                                ADD
                            </Button>
                        </SimpleGrid>
                    </form>
                </div>
                <div>
                    <Title order={2}>Person list</Title>
                    {persons.map(p => (
                        <>
                            <div>{p.name}</div>
                            <div>{p.address}</div>
                            <div>{p.defaultStartDestination}</div>
                        </>
                    ))}
                </div>
            </SimpleGrid>
        </>
    )
}
