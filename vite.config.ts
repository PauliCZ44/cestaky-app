import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
// https://jotai.org/docs/guides/vite
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
        Icons({
            compiler: 'jsx',
            jsx: 'react',
        }),
    ],
})
