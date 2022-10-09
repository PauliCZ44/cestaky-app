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
    Box,
    Space,
    Center,
    Divider,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { SignInButton } from '../Components/auth/SignInButton'
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
    passwordAgain: string
}

export default function Register() {
    const { classes } = useStyles()
    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            password: '',
            passwordAgain: '',
        },
        validateInputOnBlur: ['passwordAgain'],
        validateInputOnChange: ['password'],
        validate: ({ passwordAgain, password, email }) => ({
            password: password.length < 6 && 'Password must be at least 6 characters long',
            passwordAgain: passwordAgain !== password ? 'Password do not match' : null,
            email: /^\S+@\S+$/.test(email) ? null : 'Invalid email',
        }),
    })

    const handleSubmit = (formValues: FormValues) => {
        console.log(formValues)
        const auth = useAuth()
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then(cred => {
                console.log('User created. Go to login', cred)
            })
            .catch(err => {
                console.log('err :>> ', err)
            })
    }

    return (
        <LogiWrapper>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                Register new user
            </Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    name="email"
                    type="email"
                    required
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
                    required
                />
                <PasswordInput
                    {...form.getInputProps('passwordAgain')}
                    required
                    name="passwordAgain"
                    label="Password again"
                    placeholder="Your password again"
                    mt="md"
                    size="md"
                />
                <Button mt="xl" my="lg" fullWidth type="submit">
                    Regsiter
                </Button>
            </form>

            <Divider
                label="Or continue with google account"
                labelPosition="center"
                my="xl"
                py="md"
            />

            <Center>
                <SignInButton>Sign Up with Google</SignInButton>
            </Center>

            <Text align="center" mt="xl">
                Do you already have an account? <br />
                <Link to="/login">
                    <Anchor<'a'> weight={700} size="md">
                        Go to login
                    </Anchor>
                </Link>
            </Text>
        </LogiWrapper>
    )
}
