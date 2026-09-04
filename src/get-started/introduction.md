# Introduction

::: warning
Before adopting this starter kit, be aware that it is designed for [PrimeVue v4](https://v4.primevue.org/), the final MIT-licensed open source release. PrimeTek has announced that PrimeVue v5 will transition to the [new PrimeUI licensing model](https://primeui.dev/pricing) and will no longer be released as open source. As a result, this starter kit does not plan to migrate to PrimeVue v5.

Consider migrating the PrimeVue packages to use [OpenVue](https://openvue.dev/), or use the [Laravel Nuxt UI Starter Kit](https://github.com/connorabbas/laravel-nuxtui-starter-kit) as an alternative.
:::

## About

An opinionated authentication starter-kit for [Laravel](https://laravel.com/docs/master), built with [Intertia.js](https://inertiajs.com/), [Vue.js](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [PrimeVue](https://v4.primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/).

This starter kit aims to provide similar functionality as the official [Laravel + Vue Starter Kit](https://github.com/laravel/vue-starter-kit), but utilizing **PrimeVue** components instead of **Shadcn for Vue**.

This starter kit provides an implementation of all of Laravel's authentication features powered by [Laravel Fortify](https://laravel.com/docs/master/fortify), including: login, registration, password reset, email verification, password confirmation, and two-factor authentication. There is also a User profile page, where authenticated Users can update their information (name, email, password), or delete their account if desired.

To view the starter kit in action, you can visit the [demo site](https://laravel-primevue.sodakswe.dev).

### Features

- [Auto Import](https://v4.primevue.org/autoimport/) PrimeVue components
- Extended PrimeVue menu/navigation components utilizing Inertia's [`<Link />`](https://inertiajs.com/docs/v3/the-basics/links) component and [Lucide Icons](https://lucide.dev/)
- [`usePaginatedData()`](/features/composables/usePaginatedData) & [`usePaginatedDataTable()`](/features/composables/usePaginatedDataTable) composables for use with PrimeVue's [`<Paginator />`](https://v4.primevue.org/paginator/) & [`<DataTable />`](https://v4.primevue.org/datatable/) components for easy server-driven pagination/filtering/sorting
- End-to-end type safety between PHP and TypeScript using [`spatie/laravel-data`](https://spatie.be/docs/laravel-data/v4/introduction) + [`spatie/laravel-typescript-transformer`](https://spatie.be/docs/typescript-transformer/v3/introduction)
- Inertia flash data setup to automatically display custom one-time messages using PrimeVue `<Message />` or `<Toast />` components
- Error handling utilizing PrimeVue's [`<Toast />`](https://v4.primevue.org/toast/) component (instead of default full-page modal response)
- Light/dark/system color mode toggle
- Easily customizable theming
- Pre-configured [server-side rendering](/features/ssr)
- PHPStan with level 8 compliance
