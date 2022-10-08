import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { Route, Routes } from 'react-router-dom'
import './global.css'
import Layout from './Layout'
import { Error404, MainApp } from './pages'
import { themeOverrides } from './themeOverrides'
import { CustomFonts } from './utils/CustomFonts'

function NoMatch() {
    return <div>NoMatch</div>
}

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
                <Routes>
                    <Route
                        path="/"
                        element={<Layout isDark={isDark} toggleColorScheme={toggleColorScheme} />}
                    >
                        <Route index element={<MainApp />} />
                        <Route path="persons" element={<h4>Users</h4>} />
                        <Route path="settings" element={<h4>settings</h4>} />

                        {/* Using path="*"" means "match anything", so this route
                                acts like a catch-all for URLs that we don't have explicit
                                routes for. */}
                        <Route path="*" element={<Error404 />} />
                    </Route>
                </Routes>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
