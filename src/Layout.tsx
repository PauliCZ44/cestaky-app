import { AppShell, Box } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { AppNavbar, Header } from './Components'
import './global.css'

interface LayoutProps {
    children?: React.ReactNode
    isDark: boolean
    toggleColorScheme: () => void
}

export default function Layout({ isDark, toggleColorScheme }: LayoutProps) {
    return (
        <AppShell
            sx={theme => ({
                '--mantine-navbar-width': '80px',
                [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                    '--mantine-navbar-width': 'max(200px, 15vw)',
                },
                display: 'flex',
                flexDirection: 'column',
                '& footer': {
                    backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[3],
                },
                '& nav': {
                    width: 'var(--mantine-navbar-width)',
                },
            })}
            padding="md"
            fixed={false}
            navbar={<AppNavbar />}
            header={<Header />}
            // footer={<Footer />}
            styles={theme => ({
                main: {
                    backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
                    width: 'calc (100% - var(--mantine-navbar-width))',
                },
            })}
        >
            <Box px="sm">
                <Outlet />
            </Box>
        </AppShell>
    )
}
