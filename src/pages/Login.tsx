import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Space,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogiWrapper from '../Components/shared/loginWrapper'
import { useAuth } from '../lib/firebase'

const useStyles = createStyles(theme => ({
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}))

interface FormValues {
    email: string
    password: string
    keepMeLoggedIn: boolean
}

export default function Login() {
    const navigate = useNavigate()
    const { classes } = useStyles()
    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            password: '',
            keepMeLoggedIn: false,
        },
    })

    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (formValues: FormValues) => {
        console.log(formValues)
        const auth = useAuth()
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then(() => {
                navigate('/')
                showNotification({
                    autoClose: 4000,
                    color: 'green',
                    title: 'Success login',
                    message: `Logged in as ${formValues.email}`,
                })
            })
            .catch(err => {
                console.log(err)
                setErrorMsg('Wrong email or password')
            })
    }

    const handleAnonymousLogin = async () => {
        const auth = useAuth()
        signInAnonymously(auth)
            .then(() => {
                navigate('/')
                showNotification({
                    autoClose: 4000,
                    color: 'yellow',
                    title: 'Success login',
                    message:
                        'You are now logged in. Your data will not be stored and will be removed after logout 😥.',
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <LogiWrapper>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                Welcome back to CestakyApp!
            </Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    name="email"
                    label="Email address"
                    placeholder="hello@gmail.com"
                    size="md"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    {...form.getInputProps('password')}
                    name="password"
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                    size="md"
                    error={errorMsg}
                />
                <Checkbox
                    name="keepMeLoggedIn"
                    label="Keep me logged in"
                    mt="xl"
                    size="md"
                    {...form.getInputProps('keepMeLoggedIn')}
                />
                <Button mt="xl" my="lg" fullWidth type="submit">
                    Login
                </Button>
            </form>

            {/* <SignInButton mt="xl" my="lg" fullWidth /> */}

            <Text align="center" mt="lg">
                Don&apos;t have an account? <br />
                <Space h="md" />
                <Link to="/register">
                    <Anchor<'span'> weight={700} size="lg" pt="sm" component="span">
                        Register
                    </Anchor>
                </Link>
            </Text>

            <Button mt="xl" my="lg" fullWidth variant="default" onClick={handleAnonymousLogin}>
                Take a look without login 🐱‍👤
            </Button>
        </LogiWrapper>
    )
}
