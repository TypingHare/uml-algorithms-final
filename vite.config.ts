import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    base: '/algorithms-final-site',
    plugins: [react()],
})
