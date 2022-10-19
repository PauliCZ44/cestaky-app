import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import Router from './Router'
import { themeOverrides } from '../../themeOverrides'
import { CustomFonts } from '../../utils/CustomFonts'
import AuthShell from './AuthShell'
import { AuthProvider } from '../contexts/UserContext'
import { NotificationsProvider } from '@mantine/notifications'

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
        <AuthProvider>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{ colorScheme, ...themeOverrides }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <NotificationsProvider>
                        <CustomFonts />
                        <AuthShell>
                            <Router isDark={isDark} toggleColorScheme={toggleColorScheme} />
                        </AuthShell>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </AuthProvider>
    )
}
