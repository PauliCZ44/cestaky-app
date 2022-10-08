import { Button } from '@mantine/core'
import { useAuth } from '../../lib/firebase'

export const SignOutButton = () => {
    const handleClick = () => {
        const auth = useAuth()
        auth.signOut()
    }

    return (
        <Button onClick={handleClick} type="button" className="btn normal-case">
            Sign Out
        </Button>
    )
}
