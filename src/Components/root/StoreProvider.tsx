import React, { useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useRef } from 'react'
import { useAuth, useFirestore } from '../../lib/firebase'
import { userSettingsAtom } from '../../store'
import { useAtom, useSetAtom } from 'jotai'
import { IUserSettings } from '../../pages'

interface StoreProviderProps {
    children?: React.ReactNode
}
/**
 * Component that is responsible for fetching the user settings from the database and storing them in the global state
 */
function StoreProvider({ children }: StoreProviderProps) {
    const setUserSettingsAtom = useSetAtom(userSettingsAtom)
    const store = useFirestore()
    const userId = useAuth().currentUser?.uid || ''

    // Fetch user settings and set it to store atom
    useEffect(() => {
        getDocs(collection(store, 'userData', userId, 'settings')).then(docsSnap => {
            const data = docsSnap.docs[0]?.data() as IUserSettings
            setUserSettingsAtom({
                defaultStartDestination: data?.defaultStartDestination || '',
                rounding: data?.rounding || '0',
                backDrive: data?.backDrive || true,
                defaultPrice: data?.defaultPrice || 4,
            })
        })
    }, [])

    return <>{children}</>
}

export default StoreProvider

// React compnent that render only children
