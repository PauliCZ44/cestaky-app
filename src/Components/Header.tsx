import { Group, Header as MantineHeader, Title } from '@mantine/core'
import { ToggleScheme } from './ToggleScheme'

export function Header() {
    return (
        <MantineHeader height={60}>
            <Group sx={{ height: '100%' }} px={20} position="apart">
                <Title order={3} mr="auto">
                    Cestaky application
                </Title>
                <ToggleScheme />
            </Group>
        </MantineHeader>
    )
}
