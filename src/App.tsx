import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { AppContent, Header, Navbar, Footer } from './Components'
import './global.css'

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
                    navbar={<Navbar />}
                    header={<Header />}
                    footer={<Footer />}
                    styles={theme => ({
                        main: {
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                        },
                    })}
                >
                    <AppContent />
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
