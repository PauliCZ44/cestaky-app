import { atom } from 'jotai'
import { IUserSettings } from './pages'

export const userSettingsAtom = atom<IUserSettings>({
    defaultStartDestination: '',
    rounding: '0',
    backDrive: true,
    defaultPrice: 4,
})
