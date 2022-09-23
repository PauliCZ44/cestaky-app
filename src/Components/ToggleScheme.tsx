import { ActionIcon, ColorScheme, useMantineColorScheme } from '@mantine/core'
import FluentWeatherSunny28Filled from '~icons/fluent/weather-sunny-28-filled'
import FluentWeatherMoon28Filled from '~icons/fluent/weather-moon-28-filled'
import { useColorScheme } from '@mantine/hooks'

export function ToggleScheme() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'
    console.log('toggleColorScheme', dark)
    return (
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
            {dark ? <FluentWeatherSunny28Filled /> : <FluentWeatherMoon28Filled />}
        </ActionIcon>
    )
}
