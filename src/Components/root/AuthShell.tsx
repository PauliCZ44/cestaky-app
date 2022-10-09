import React, { ReactNode } from 'react'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useSignIn, useSignOut } from '../contexts/UserContext'
import { setupFirebase } from '../../lib/firebase'

interface AuthShellProps {
    children: ReactNode
}
function AuthShell(props: AuthShellProps) {
    const { signIn } = useSignIn()
    const { signOut } = useSignOut()
    useEffect(() => {
        setupFirebase()
        const auth = getAuth()

        onAuthStateChanged(auth, user => {
            if (user) {
                signIn(user)
            } else {
                signOut()
            }
        })
    }, [])
    return <>{props.children}</>
}

export default AuthShell
