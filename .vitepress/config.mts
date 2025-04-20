import 'dotenv/config';
import { defineConfig } from 'vitepress';

const devPort = parseInt(process.env.VITEPRESS_PORT || '5173');
const hostDomain = process.env.VITEPRESS_HOST_DOMAIN || 'localhost';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    vite: {
        server: {
            port: devPort,
            host: true,
            hmr: {
                host: hostDomain,
            },
            cors: true,
            watch: {
                usePolling: true,
            },
        },
    },
    title: 'Laravel PrimeVue Starter Kit',
    description: 'Documentation for connorabbas/laravel-primevue-starter-kit project',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' },
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
});
