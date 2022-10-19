import { Button, Group, LoadingOverlay, Modal, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { doc, setDoc } from 'firebase/firestore'
import { useAuth, useFirestore } from '../../lib/firebase'
import FluentSave28Regular from '~icons/fluent/save-28-regular'
import { Person } from '../../pages'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'

interface EditPersonModalProps {
    isOpen: boolean
    person: Person
    onClose?: () => void | undefined
    onSubmit?: (person: Person) => void
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>
}

function EditPersonModal({ isOpen, person, onClose, onSubmit, setPersons }: EditPersonModalProps) {
    console.log('opened :>> ', isOpen)
    const [isLoading, setIsLoading] = useState(false)
    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''
    const form = useForm<Person>({
        initialValues: {
            name: person?.name,
            address: person?.address,
            defaultStartDestination: person?.defaultStartDestination,
        },
        validate: {
            name: value => (value.length === 0 ? 'Name is required' : null),
        },
    })

    const handleSubmit = async (values: Person) => {
        setIsLoading(true)
        try {
            //delete id from values
            const docRef = doc(store, 'userData', userId, 'persons', person.id!)
            await setDoc(docRef, values)
            showNotification({
                title: 'Success',
                message: `Person ${values.name} was updated`,
            })
            setIsLoading(false)
            onClose?.()
            setPersons(prevPersons => prevPersons.map(p => (p.id === person.id ? values : p)))
        } catch (e) {
            setIsLoading(false)
            showNotification({
                title: 'Error',
                message: `There was an error: ${e}`,
            })
        }
    }
    return (
        <Modal
            centered
            opened={isOpen}
            onClose={() => {
                onClose?.()
            }}
            title={<Title order={3}>Edit {person?.name}</Title>}
        >
            <LoadingOverlay visible={isLoading} overlayBlur={1} />
            <div>
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
                        <Group mt={2} position="right">
                            <Button onClick={onClose} mt="sm" variant="outline">
                                Cancel
                            </Button>
                            <Button leftIcon={<FluentSave28Regular />} type="submit" mt="sm">
                                Save
                            </Button>
                        </Group>
                    </SimpleGrid>
                </form>
            </div>
        </Modal>
    )
}

export default EditPersonModal
