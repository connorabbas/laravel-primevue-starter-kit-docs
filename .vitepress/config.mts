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
    appearance: 'force-dark',
    markdown: {
        // https://shiki.style/themes#bundled-themes
        theme: 'tokyo-night',
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Demo Application', link: 'https://laravel-primevue-starter-kit-demo.laravel.cloud' },
            { text: 'Laravel Docs', link: 'https://laravel.com/docs/master' },
            { text: 'PrimeVue Docs', link: 'https://primevue.org/' },
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
                text: 'Get Started',
                items: [
                    { text: 'Introduction', link: '/get-started/introduction' },
                    { text: 'Installation Guide', link: '/get-started/installation-guide' },
                    { text: 'Development With Docker', link: '/get-started/docker' },
                ],
            },
            {
                text: 'Features',
                items: [
                    { text: 'Server-Side Rendering', link: '/features/ssr' },
                    { text: 'Theming', link: '/features/theming' },
                    { text: 'Layouts', link: '/features/layouts' },
                    {
                        text: 'Composables',
                        items: [
                            { text: 'usePaginatedData', link: '/features/composables/usePaginatedData' },
                            { text: 'useLazyDataTable', link: '/features/composables/useLazyDataTable' },
                        ],
                    },
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

        socialLinks: [
            { icon: 'github', link: 'https://github.com/connorabbas/laravel-primevue-starter-kit' },
            { icon: 'linkedin', link: 'https://www.linkedin.com/in/connorabbas/' },
        ],
    },
});
