import { Global } from '@mantine/core'

export function CustomFonts() {
    return (
        <Global
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-300.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-300.woff') format('woff')`,
                    },
                },
                /* ubuntu-300italic - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'italic',
                        fontWeight: 300,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-300italic.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-300italic.woff') format('woff')`,
                    },
                },
                /* ubuntu-regular - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-regular.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-regular.woff') format('woff')`,
                    },
                },
                /* ubuntu-italic - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-italic.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-italic.woff') format('woff')`,
                    },
                },
                /* ubuntu-500 - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-500.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-500.woff') format('woff')`,
                    },
                },
                /* ubuntu-500italic - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'italic',
                        fontWeight: 500,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-500italic.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-500italic.woff') format('woff')`,
                    },
                },
                /* ubuntu-700 - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-700.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-700.woff') format('woff')`,
                    },
                },
                /* ubuntu-700italic - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'italic',
                        fontWeight: 700,
                        src: `local(''), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-700italic.woff2') format('woff2'), url('/fonts/ubuntu/ubuntu-v20-latin-ext_latin-700italic.woff') format('woff')`,
                    },
                },
                /* passion-one-regular - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Passion One',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        src: `local(''), url('/fonts/passion-one/passion-one-v16-latin-ext_latin-regular.woff2') format('woff2'), url('/fonts/passion-one/passion-one-v16-latin-ext_latin-regular.woff') format('woff')`,
                    },
                },
                /* passion-one-700 - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Passion One',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        src: `local(''), url('/fonts/passion-one/passion-one-v16-latin-ext_latin-700.woff2') format('woff2'), url('/fonts/passion-one/passion-one-v16-latin-ext_latin-700.woff') format('woff')`,
                    },
                },
                /* passion-one-900 - latin-ext_latin */
                {
                    '@font-face': {
                        fontFamily: 'Passion One',
                        fontStyle: 'normal',
                        fontWeight: 900,
                        src: `local(''), url('/fonts/passion-one/passion-one-v16-latin-ext_latin-900.woff2') format('woff2'), url('/fonts/passion-one/passion-one-v16-latin-ext_latin-900.woff') format('woff')`,
                    },
                },
            ]}
        />
    )
}
