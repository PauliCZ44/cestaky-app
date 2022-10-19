import { Box, Group, Stack, Text } from '@mantine/core'
import { forwardRef } from 'react'
import { Person } from '../../pages'

const styles = {
    secondaryText: {
        display: 'flex',
        gap: '4px',
        '& > div': { marginRight: 'auto', width: '75%' },
    },
}

export const AutoCompleteItem = forwardRef<HTMLDivElement, Person>(
    ({ name, address, defaultStartDestination, ...others }: Person, ref) => (
        <div ref={ref} key={`${address}-${name}`} {...others}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Text>{name}</Text>
                <Text size="xs" color="dimmed" sx={styles.secondaryText}>
                    <div>{address}</div>
                    {defaultStartDestination}
                </Text>
            </Box>
        </div>
    )
)
