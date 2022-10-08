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
import { Link } from 'react-router-dom'
import { SignInButton } from '../Components/auth/SignInButton'
import LogiWrapper from '../Components/shared/loginWrapper'

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

    return (
        <LogiWrapper>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                Welcome back to CestakyApp!
            </Title>

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
            <Button mt="xl" my="lg" fullWidth>
                Login
            </Button>
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
