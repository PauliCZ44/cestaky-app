import { Button, ButtonProps } from '@mantine/core'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useAuth } from '../../lib/firebase'
import { GoogleButton } from '../shared/GoogleButton'

export const SignInButton = (props: ButtonProps) => {
    const handleClick = () => {
        const provider = new GoogleAuthProvider()
        const auth = useAuth()
        // @see https://firebase.google.com/docs/auth/web/google-signin
        auth.languageCode = 'en'

        signInWithRedirect(auth, provider)
    }

    return (
        <GoogleButton onClick={handleClick} type="button" {...props}>
            {props.children}
        </GoogleButton>
    )
}
