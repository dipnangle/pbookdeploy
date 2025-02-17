import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Or specify a specific IP like '192.168.1.100'
        port: 3000,       // Optionally, specify a port (default is 3000) 
    },
    base:'./',
})
