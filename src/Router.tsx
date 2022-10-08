import React from 'react'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { Route, Routes } from 'react-router-dom'
import './global.css'
import Layout from './Layout'
import { Error404, MainApp, Persons } from './pages'
import { themeOverrides } from './themeOverrides'
import { CustomFonts } from './utils/CustomFonts'

interface RouterProps {
    children?: React.ReactNode
    isDark: boolean
    toggleColorScheme: () => void
}

export default function Router({ isDark, toggleColorScheme }: RouterProps) {
    return (
        <Routes>
            <Route
                path="/"
                element={<Layout isDark={isDark} toggleColorScheme={toggleColorScheme} />}
            >
                <Route index element={<MainApp />} />
                <Route path="persons" element={<Persons />} />
                <Route path="settings" element={<h4>settings</h4>} />
                <Route path="*" element={<Error404 />} />
            </Route>
        </Routes>
    )
}
