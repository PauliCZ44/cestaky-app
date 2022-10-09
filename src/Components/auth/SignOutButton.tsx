import { Button, ButtonProps } from '@mantine/core'
import { useAuth } from '../../lib/firebase'

export const SignOutButton = (props: ButtonProps) => {
    const handleClick = () => {
        const auth = useAuth()
        auth.signOut()
    }

    return (
        <Button onClick={handleClick} type="button" {...props}>
            Sign Out
        </Button>
    )
}
