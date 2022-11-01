import {
    ActionIcon,
    Box,
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
import FluentEdit28Regular from '~icons/fluent/edit-28-regular'
import FluentDelete28Regular from '~icons/fluent/delete-28-regular'
import EditPersonModal from '../Components/shared/EditPersonModal'
import { hideNotification, showNotification } from '@mantine/notifications'
import FluentArrowUndo28Regular from '~icons/fluent/arrow-undo-28-regular'
import FluentArrowUndo28Filled from '~icons/fluent/arrow-undo-28-filled'

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
    //TODO: add edit mode?
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const [isModalOpen, setModalOpen] = useState(false)

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
        const prevPersons = [...persons]
        const timeOut = setTimeout(async () => {
            await deleteDoc(doc(store, 'userData', userId, 'persons', id))
        }, 3000)

        showNotification({
            id: id,
            title: 'Item will be deleted',
            message: 'Undo by clicking on the icon',
            autoClose: 3000,
            icon: (
                <ActionIcon
                    variant="filled"
                    onClick={() => {
                        clearTimeout(timeOut)
                        setPersons(prevPersons)
                        hideNotification(id)
                    }}
                >
                    <FluentArrowUndo28Filled />
                </ActionIcon>
            ),
        })
        setPersons(persons.filter(person => person.id !== id))
    }

    const handleSubmit = async (values: Person) => {
        let userExists = persons.find(
            person => person.name.toLowerCase().trim() === values.name.toLowerCase().trim()
        )
        if (userExists) {
            showNotification({
                color: 'yellow',
                title: 'Error',
                message: 'Please choose a different name',
            })
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
                        <Text size="sm" weight={400}>
                            {person.address}
                        </Text>
                    </td>
                    <td>
                        <Text size="sm" weight={400}>
                            {person.defaultStartDestination}
                        </Text>
                    </td>
                    <td>
                        <Group spacing={0} position="right">
                            <ActionIcon
                                onClick={() => {
                                    setSelectedPerson(person)
                                    setModalOpen(true)
                                }}
                            >
                                <FluentEdit28Regular />
                            </ActionIcon>
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
            <SimpleGrid cols={1} spacing="xl">
                <Box sx={{ maxWidth: '500px' }}>
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
                                Add
                            </Button>
                        </SimpleGrid>
                    </form>
                </Box>
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

            {selectedPerson && (
                <EditPersonModal
                    setPersons={setPersons}
                    key={selectedPerson?.id}
                    isOpen={isModalOpen}
                    person={selectedPerson}
                    onClose={() => {
                        setModalOpen(false)
                    }}
                />
            )}
        </>
    )
}
