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
} from '@mantine/core'
import { SignInButton } from '../Components/auth/SignInButton'

const useStyles = createStyles(theme => ({
    wrapper: {
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        height: '100%',
        minHeight: 900,
        maxWidth: 'calc(300px + 17vw)',
        padding: 'calc(25px + 2vw)',
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))

export default function Login() {
    const { classes } = useStyles()
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Welcome back to CestakyApp!
                </Title>

                <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
                <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
                <Checkbox label="Keep me logged in" mt="xl" size="md" />
                <SignInButton mt="xl" my="lg" fullWidth />

                <Text align="center" mt="lg">
                    Don&apos;t have an account?{' '}
                    <Anchor<'a'> href="#" weight={700} onClick={event => event.preventDefault()}>
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </div>
    )
}
