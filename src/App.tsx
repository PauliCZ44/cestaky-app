import { AppShell, Button, ColorScheme, ColorSchemeProvider, Group, Header, MantineProvider, Navbar } from '@mantine/core'
import { useState } from 'react'
import { theme } from './theme'
import { ToggleScheme } from './ToggleScheme'
import './global.css'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'

export default function App() {
    const preferredColorScheme = useColorScheme()
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <AppShell
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    padding="md"
                    fixed={false}
                    navbar={
                        <Navbar width={{ base: 300 }} height="100%" p="xs">
                            <Navbar.Section grow mt="xs">
                                Link
                            </Navbar.Section>
                            <Navbar.Section>Section</Navbar.Section>
                        </Navbar>
                    }
                    header={
                        <Header height={60}>
                            <Group sx={{ height: '100%' }} px={20} position="apart">
                                <ToggleScheme />
                            </Group>
                        </Header>
                    }
                    footer={<footer>Footer</footer>}
                    styles={theme => ({
                        main: {
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                        },
                    })}
                >
                    Your application goes here
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
