import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { AppContent, Header, AppNavbar, Footer } from './Components'
import './global.css'
import { themeOverrides } from './themeOverrides'
import { CustomFonts } from './utils/CustomFonts'

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
                theme={{ colorScheme, ...themeOverrides }}
                withGlobalStyles
                withNormalizeCSS
            >
                <CustomFonts />
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
                    <AppContent />
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
