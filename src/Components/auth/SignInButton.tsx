import { Button, ButtonProps } from '@mantine/core'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useAuth } from '../../lib/firebase'
import LogosGoogleIcon from '~icons/logos/google-icon'
export const SignInButton = (props: ButtonProps) => {
    const handleClick = () => {
        const provider = new GoogleAuthProvider()
        const auth = useAuth()
        // @see https://firebase.google.com/docs/auth/web/google-signin
        auth.languageCode = 'en'

        signInWithRedirect(auth, provider)
    }

    return (
        <Button
            onClick={handleClick}
            type="button"
            leftIcon={<LogosGoogleIcon />}
            variant="default"
            color="gray"
            radius="xl"
            {...props}
        />
    )
}
