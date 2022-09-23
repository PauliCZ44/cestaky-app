import { Group, Header as MantineHeader } from '@mantine/core'
import { ToggleScheme } from './ToggleScheme'

export function Header() {
    return (
        <MantineHeader height={60}>
            <Group sx={{ height: '100%' }} px={20} position="apart">
                <ToggleScheme />
            </Group>
        </MantineHeader>
    )
}
