import { Button, ButtonProps } from '@mantine/core'
import LogosGoogleIcon from '~icons/logos/google-icon'

export function GoogleButton(props: ButtonProps) {
    return (
        <Button
            leftIcon={<LogosGoogleIcon />}
            variant="default"
            color="gray"
            {...props}
            radius="xl"
        />
    )
}
