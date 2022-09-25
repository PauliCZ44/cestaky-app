import { MantineTheme, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

type breakpoint = keyof MantineTheme['breakpoints']

export function useMediaLarger(breakpoint: breakpoint) {
    const theme = useMantineTheme()
    const map = {
        xs: `(min-width: ${theme.breakpoints.xs}px)`,
        sm: `(min-width: ${theme.breakpoints.sm}px)`,
        md: `(min-width: ${theme.breakpoints.md}px)`,
        lg: `(min-width: ${theme.breakpoints.lg}px)`,
        xl: `(min-width: ${theme.breakpoints.xl}px)`,
    }
    const match = useMediaQuery(map[breakpoint])
    return match
}

export function useMediaSmaller(breakpoint: breakpoint) {
    const theme = useMantineTheme()
    const map = {
        xs: `(max-width: ${theme.breakpoints.xs}px)`,
        sm: `(max-width: ${theme.breakpoints.sm}px)`,
        md: `(max-width: ${theme.breakpoints.md}px)`,
        lg: `(max-width: ${theme.breakpoints.lg}px)`,
        xl: `(max-width: ${theme.breakpoints.xl}px)`,
    }
    const match = useMediaQuery(map[breakpoint])
    return match
}
