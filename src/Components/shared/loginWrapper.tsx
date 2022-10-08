import { createStyles, Paper } from '@mantine/core'
import { ComponentWithChildren } from '../../interfaces'

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
            paddingTop: 20,
        },
    },
}))

export default function LogiWrapper({ children }: ComponentWithChildren) {
    const { classes } = useStyles()
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0}>
                {children}
            </Paper>
        </div>
    )
}
