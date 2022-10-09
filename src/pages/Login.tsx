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
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
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
    const { classes } = useStyles()
    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            password: '',
            keepMeLoggedIn: false,
        },
    })

    const handleSubmit = async (formValues: FormValues) => {
        console.log(formValues)
        const auth = useAuth()
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then(cred => {
                console.log(cred)
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
                    <Anchor<'a'> weight={700} size="lg" pt="sm">
                        Register
                    </Anchor>
                </Link>
            </Text>
        </LogiWrapper>
    )
}
