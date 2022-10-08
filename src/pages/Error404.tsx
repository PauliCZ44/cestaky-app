// https://ui.mantine.dev/category/error-pages
import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core'
import { Link } from 'react-router-dom'

const useStyles = createStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    content: {
        position: 'relative',
        zIndex: 1,

        [theme.fn.smallerThan('sm')]: {
            paddingTop: 120,
        },
    },

    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },

    bg404: {
        position: 'absolute',
        fontSize: 'min(50rem, 35vw)',
        opacity: 0.125,
        left: '50%',
        transform: 'translateX(-50%)',
        top: '20%',
        lineHeight: 0.25,
    },
}))

export function Error404() {
    const { classes } = useStyles()

    return (
        <>
            <Container className={classes.root}>
                <Title order={1} mr="auto" className={classes.bg404}>
                    404
                </Title>
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text color="dimmed" size="lg" align="center" className={classes.description}>
                        Page you are trying to open does not exist. You may have mistyped the
                        address, or the page has been moved to another URL.
                    </Text>
                    <Group position="center">
                        <Link to={'/'}>
                            <Button size="md">Take me back to home page</Button>
                        </Link>
                    </Group>
                </div>
            </Container>
        </>
    )
}
