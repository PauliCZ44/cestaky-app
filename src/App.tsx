import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { AppContent, Header, AppNavbar, Footer } from './Components'
import './global.css'

export default function App() {
    const preferredColorScheme = useColorScheme()
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    const isDark = colorScheme === 'dark'
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{ colorScheme, dateFormat: 'DD/MM/YYYY' }}
                withGlobalStyles
                withNormalizeCSS
            >
                <AppShell
                    sx={theme => ({
                        display: 'flex',
                        flexDirection: 'column',
                        '& footer': {
                            backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[3],
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
                        },
                    })}
                >
                    <AppContent />
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
