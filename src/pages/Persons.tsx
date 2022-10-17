import {
    ActionIcon,
    Button,
    Group,
    ScrollArea,
    SimpleGrid,
    Table,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuth, useFirestore } from '../lib/firebase'
// import FluentEdit28Regular from '~icons/fluent/edit-28-regular'
// import FluentSave28Regular from '~icons/fluent/save-28-regular'
import FluentDelete28Regular from '~icons/fluent/delete-28-regular'

export interface Person {
    name: string
    address: string
    defaultStartDestination: string
    id?: string
}

export default function Persons() {
    const [persons, setPersons] = useState<Person[]>([])
    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''
    const colRef = useRef(collection(store, 'userData', userId, 'persons'))
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        getDocs(colRef.current).then(docsSnap => {
            setPersons(docsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Person)))
        })
        return
    }, [])

    const form = useForm<Person>({
        initialValues: {
            name: '',
            address: '',
            defaultStartDestination: 'Prlov',
            id: undefined,
        },
        validate: {
            name: value => (value.length === 0 ? 'Name is required' : null),
        },
    })

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(store, 'userData', userId, 'persons', id))
        setPersons(persons.filter(person => person.id !== id))
    }

    const handleSubmit = async (values: Person) => {
        let userExists = persons.find(
            person => person.name.toLowerCase().trim() === values.name.toLowerCase().trim()
        )
        if (userExists) {
            alert('User with this name already exists')
            return
        }
        try {
            //delete id from values
            const { id, ...valuesWithoutId } = values
            let res = await addDoc(colRef.current, {
                ...valuesWithoutId,
            })
            values.id = res.id
            setPersons(persons.concat(values))
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    const tableRows = useMemo(
        () =>
            persons.map(person => (
                <tr key={person.name}>
                    <td>
                        <Text size="sm" weight={500}>
                            {person.name}
                        </Text>
                    </td>

                    <td>
                        <Text size="sm" weight={500}>
                            {person.address}
                        </Text>
                    </td>
                    <td>
                        <Text size="sm" weight={500}>
                            {person.defaultStartDestination}
                        </Text>
                    </td>
                    <td>
                        <Group spacing={0} position="right">
                            {/* <ActionIcon>
                                {editMode ? <FluentEdit28Regular /> : <FluentSave28Regular />}
                            </ActionIcon> */}
                            <ActionIcon color="red" onClick={() => handleDelete(person.id!)}>
                                <FluentDelete28Regular />
                            </ActionIcon>
                        </Group>
                    </td>
                </tr>
            )),
        [persons]
    )

    return (
        <>
            <SimpleGrid cols={1} pt="1rem" spacing="xl">
                <div>
                    <Title order={2}>Add new person</Title>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <SimpleGrid spacing="xs">
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
                            <Button type="submit" mt="sm">
                                ADD
                            </Button>
                        </SimpleGrid>
                    </form>
                </div>
                <div>
                    <Title order={2} mb="md">
                        Person list
                    </Title>
                    <ScrollArea mb="xl" py="sm">
                        <Table sx={{ minWidth: 500 }} verticalSpacing="xs" horizontalSpacing="xs">
                            <thead>
                                <tr>
                                    <th style={{ width: '30%' }}>Name</th>
                                    <th style={{ width: '30%' }}>Adress</th>
                                    <th style={{ width: '30%' }}>Default destination</th>
                                    <th style={{ minWidth: '75px' }} />
                                </tr>
                            </thead>
                            <tbody>{tableRows}</tbody>
                        </Table>
                    </ScrollArea>
                </div>
            </SimpleGrid>
        </>
    )
}
