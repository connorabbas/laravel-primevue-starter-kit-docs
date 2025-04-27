import 'dotenv/config';
import { defineConfig } from 'vitepress';

const devPort = parseInt(process.env.VITEPRESS_PORT || '5173');
const hostDomain = process.env.VITEPRESS_HOST_DOMAIN || 'localhost';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/laravel-primevue-starter-kit-docs/',
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
        // https://shiki.style/themes#bundled-themes
        theme: 'tokyo-night',
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            //{ text: 'Home', link: '/' },
            //{ text: 'Examples', link: '/markdown-examples' },
        ],

        sidebar: [
            /* {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ],
            }, */
            {
                text: 'Introduction',
                items: [
                    { text: 'Getting Started', link: '/introduction/getting-started' },
                    { text: 'Development With Docker', link: '/introduction/docker' },
                ],
            },
            {
                text: 'PrimeVue Integration',
                items: [
                    { text: 'Theming', link: '/primevue/theming' },
                    /* {
                        text: 'Composables',
                        items: [
                            { text: 'usePaginatedData', link: '/primevue/composables/usePaginatedData' },
                            { text: 'useLazyDataTable', link: '/primevue/composables/useLazyDataTable' },
                        ],
                    }, */
                ],
            },
            {
                text: 'Alternatives',
                items: [
                    { text: 'Branch - Admin Role', link: '/alt/admin-role-branch' },
                    { text: 'API / SPA Starter Kit', link: '/alt/api-spa' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/connorabbas/laravel-primevue-starter-kit' }],
    },
});
