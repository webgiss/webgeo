import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
    },
    server: {
        watch: {
            // Watch for changes in .jsx files
            ignored: [],
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
    define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        global: {},
    },
})