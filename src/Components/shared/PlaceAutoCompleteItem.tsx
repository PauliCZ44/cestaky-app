import { Box, Group, Stack, Text } from '@mantine/core'
import { forwardRef } from 'react'
import { Person } from '../../pages'

const styles = {
    secondaryText: {
        display: 'flex',
        gap: '4px',
    },
}

export const PlaceAutoCompleteItem = forwardRef<HTMLDivElement, Person>(
    ({ name, address, ...others }: Person, ref) => (
        <div ref={ref} key={`${address}-${name}-1`} {...others}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Text>{name}</Text>
                <Text size="xs" color="dimmed" sx={styles.secondaryText}>
                    <div>{address}</div>
                </Text>
            </Box>
        </div>
    )
)
