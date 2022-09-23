import { Navbar as MantineNavbar } from '@mantine/core'

export function Navbar() {
    return (
        <MantineNavbar width={{ base: 300 }} height="100%" p="xs">
            <MantineNavbar.Section grow mt="xs">
                Link
            </MantineNavbar.Section>
            <MantineNavbar.Section>Section</MantineNavbar.Section>
        </MantineNavbar>
    )
}
