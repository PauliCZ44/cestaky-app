import { Button, Group, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

interface FormValues {
    defaultStartDestination: string
    address: string
    name: string
}

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export function Persons() {
    const [persons, setPersons] = useState([])
    /*
        // Input to add person. Save them to the local storage for now.
        // Fields: name, adress, defaultStartDestination,

        // List of persons
        // can be deleted 
    */
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

    const handleSubmit = (event: ButtonClickEvent) => {
        console.log(form.values)
        setPersons([...persons, form.values])
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
