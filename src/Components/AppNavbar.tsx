import { useCallback, useState } from 'react'
import { createStyles, Navbar, Group, Code } from '@mantine/core'
import FluentAppGeneric24Regular from '~icons/fluent/app-generic-24-regular'
import FluentSettings24Regular from '~icons/fluent/settings-24-regular'
import FluentVideoPersonOff24Filled from '~icons/fluent/video-person-off-24-filled'
import FluentPersonNote24Regular from '~icons/fluent/person-note-24-regular'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/firebase'

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon')
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                justifyContent: 'center',
                '> span': {
                    display: 'none',
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                marginRight: theme.spacing.sm,
            },
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    }
})

const data = [
    { link: '/', label: 'Main app', icon: FluentAppGeneric24Regular },
    { link: '/persons', label: 'Persons', icon: FluentPersonNote24Regular },
    { link: '/settings', label: 'Settings', icon: FluentSettings24Regular },
]

export function AppNavbar() {
    const { classes, cx } = useStyles()
    const [active, setActive] = useState('Main app')

    const handleLogout = useCallback(() => {
        const auth = useAuth()
        auth.signOut()
    }, [])

    const links = data.map(item => (
        <Link
            to={item.link}
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            key={item.label}
            onClick={() => {
                setActive(item.label)
            }}
        >
            <item.icon className={classes.linkIcon} />
            <span>{item.label}</span>
        </Link>
    ))

    return (
        <Navbar height={'100%'} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    LOGO
                    <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={handleLogout}>
                    <FluentVideoPersonOff24Filled className={classes.linkIcon} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    )
}
