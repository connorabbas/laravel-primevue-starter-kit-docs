import 'dotenv/config';
import { defineConfig } from 'vitepress';

const devPort = parseInt(process.env.VITEPRESS_PORT || '5173');
const hostDomain = process.env.VITEPRESS_HOST_DOMAIN || 'localhost';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: './src',
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
    title: 'Laravel + PrimeVue',
    description: 'Documentation for connorabbas/laravel-primevue-starter-kit project',
    markdown: {
        theme: 'tokyo-night',
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            //{ text: 'Home', link: '/' },
            //{ text: 'Examples', link: '/markdown-examples' },
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ],
            },
            {
                text: 'Introduction',
                items: [
                    { text: 'Getting Started', link: '/introduction/getting-started' },
                    { text: 'Development With Docker', link: '/introduction/docker' },
                ],
            },
            {
                text: 'Main Starter Kit',
                items: [
                    { text: 'Overview', link: '/main/overview' },
                    { text: 'Setup', link: '/main/setup' },
                    { text: 'Authentication', link: '/main/authentication' },
                    { text: 'Theming', link: '/main/theming' },
                    {
                        text: 'Components',
                        //link: '/main/components',
                        items: [
                            { text: 'Overview', link: '/main/overview' },
                            { text: 'Setup', link: '/main/setup' },
                            { text: 'Authentication', link: '/main/authentication' },
                            { text: 'Theming', link: '/main/theming' },
                            { text: 'Components', link: '/main/components' },
                            { text: 'Composables', link: '/main/composables' },
                            { text: 'Examples', link: '/main/examples' },
                        ],
                    },
                    { text: 'Composables', link: '/main/composables' },
                    { text: 'Examples', link: '/main/examples' },
                ],
            },
            {
                text: 'Admin Role Branch',
                items: [
                    { text: 'Overview', link: '/admin/overview' },
                    { text: 'Setup', link: '/admin/setup' },
                    { text: 'Admin Panel', link: '/admin/admin-panel' },
                    { text: 'Components', link: '/admin/components' },
                    { text: 'Composables', link: '/admin/composables' },
                    { text: 'Examples', link: '/admin/examples' },
                ],
            },
            {
                text: 'SPA/API Starter Kit',
                items: [
                    { text: 'Overview', link: '/spa-api/overview' },
                    { text: 'Setup', link: '/spa-api/setup' },
                    { text: 'Authentication', link: '/spa-api/authentication' },
                    { text: 'Theming', link: '/spa-api/theming' },
                    { text: 'Components', link: '/spa-api/components' },
                    { text: 'Composables', link: '/spa-api/composables' },
                    { text: 'Examples', link: '/spa-api/examples' },
                ],
            },
            {
                text: 'Reference',
                items: [
                    { text: 'Component Reference', link: '/reference/components' },
                    { text: 'Composable Reference', link: '/reference/composables' },
                    { text: 'Theme Presets', link: '/reference/theme-presets' },
                    { text: 'Troubleshooting', link: '/reference/troubleshooting' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/connorabbas/laravel-primevue-starter-kit' }],
    },
});
