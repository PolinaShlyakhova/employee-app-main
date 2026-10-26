import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        // Явно IPv4: по умолчанию Vite слушает только [::1], а VPN часто ломает IPv6-loopback
        host: '127.0.0.1',
        proxy: {
            '/api': {
                target: 'https://frontend-test-api.stk8s.66bit.ru',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
