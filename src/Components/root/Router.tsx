import React, { lazy, ReactNode, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthState } from '../contexts/UserContext'
import Loader from '../shared/Loader'
import Settings from '../../pages/Settings'
import StoreProvider from './StoreProvider'

const Error404 = lazy(() => import('../../pages/Error404'))
const Layout = lazy(() => import('./Layout'))
const Login = lazy(() => import('../../pages/Login'))
const MainApp = lazy(() => import('../../pages/MainApp'))
const Persons = lazy(() => import('../../pages/Persons'))
const Register = lazy(() => import('../../pages/Register'))

interface RouterProps {
    children?: ReactNode
    isDark: boolean
    toggleColorScheme: () => void
}

const WithSuspense = ({ children }: { children: ReactNode }) => (
    <Suspense fallback={<Loader />}>{children}</Suspense>
)

export default function Router({ isDark, toggleColorScheme }: RouterProps) {
    const { state } = useAuthState()
    console.log(' state.state  :>> ', state.state)
    const isLoggedIn = state.state === 'SIGNED_IN'
    const isUnknownLogin = state.state === 'UNKNOWN'
    return (
        <Routes>
            {!isLoggedIn && (
                <Route
                    path="login"
                    element={
                        <WithSuspense>
                            <Login />
                        </WithSuspense>
                    }
                />
            )}
            {!isLoggedIn && (
                <Route
                    path="register"
                    element={
                        <WithSuspense>
                            <Register />
                        </WithSuspense>
                    }
                />
            )}
            <Route
                path="/"
                element={
                    isUnknownLogin ? (
                        <Loader />
                    ) : isLoggedIn ? (
                        <StoreProvider>
                            <Layout isDark={isDark} toggleColorScheme={toggleColorScheme} />
                        </StoreProvider>
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
                <Route path="settings" element={<Settings />} />
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
