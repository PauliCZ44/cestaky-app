import { createStyles, Group, Header as MantineHeader, Title } from '@mantine/core'
import { ToggleScheme } from './ToggleScheme'
import FluentWalletCreditCard20Filled from '~icons/fluent/wallet-credit-card-20-filled'

const useStyles = createStyles(theme => ({
    logo: {
        color: theme.colors.gray[6],
        fontSize: '1.5rem',
    },
}))

export function Header() {
    const { classes } = useStyles()
    return (
        <MantineHeader height={60}>
            <Group sx={{ height: '100%' }} px={20} position="apart">
                <FluentWalletCreditCard20Filled className={classes.logo} fontSize="24px" />
                <Title order={3} mr="auto">
                    Cestaky application
                </Title>
                <ToggleScheme />
            </Group>
        </MantineHeader>
    )
}
