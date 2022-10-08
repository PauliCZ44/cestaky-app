import React, { lazy, ReactNode, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Login from '../../pages/Login'
import { useAuthState } from '../contexts/UserContext'

const Error404 = lazy(() => import('../../pages/Error404'))
const Persons = lazy(() => import('../../pages/Persons'))
const MainApp = lazy(() => import('../../pages/MainApp'))

interface RouterProps {
    children?: ReactNode
    isDark: boolean
    toggleColorScheme: () => void
}

const WithSuspense = ({ children }: { children: ReactNode }) => (
    <Suspense fallback={<>Loading...</>}>{children}</Suspense>
)

export default function Router({ isDark, toggleColorScheme }: RouterProps) {
    const { state } = useAuthState()
    const isLoggedIn = state.state === 'SIGNED_IN'
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route
                path="/"
                element={
                    isLoggedIn ? (
                        <Layout isDark={isDark} toggleColorScheme={toggleColorScheme} />
                    ) : (
                        <Login />
                    )
                }
            >
                <Route
                    index
                    element={
                        <WithSuspense>
                            <MainApp />
                        </WithSuspense>
                    }
                />
                <Route
                    path="persons"
                    element={
                        <WithSuspense>
                            <Persons />
                        </WithSuspense>
                    }
                />
                <Route path="settings" element={<h4>settings</h4>} />
                <Route
                    path="*"
                    element={
                        <WithSuspense>
                            <Error404 />
                        </WithSuspense>
                    }
                />
            </Route>
        </Routes>
    )
}
