# Introduction

## About

An opinionated authentication starter-kit for [Laravel](https://laravel.com/docs/master), built with [Intertia.js](https://inertiajs.com/), [Vue.js](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [PrimeVue](https://primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/).

This starter kit aims to provide similar functionality as the official [Laravel + Vue Starter Kit](https://github.com/laravel/vue-starter-kit), but utilizing **PrimeVue** components instead of **Shadcn for Vue**.

This starter kit provides a simple implementation of all of Laravel's [authentication features](https://laravel.com/docs/master/authentication), including: login, registration, password reset, email verification, and password confirmation. There is also a User profile page, where authenticated Users can update their information (name, email, password), or delete their account if desired.

To view the starter kit in action, you can visit the [demo site](https://demo.laravel-primevue-starter-kit.com).

### Features

-   [Auto Import](https://primevue.org/autoimport/) PrimeVue components
-   Extended PrimeVue menu/navigation components utilizing Inertia's [`<Link />`](https://inertiajs.com/docs/v2/the-basics/links) component and [Lucide Icons](https://lucide.dev/)
-   [`usePaginatedData()`](/features/composables/usePaginatedData) & [`usePaginatedDataTable()`](/features/composables/usePaginatedDataTable) composables for use with PrimeVue's [`<Paginator />`](https://primevue.org/paginator/) & [`<DataTable />`](https://primevue.org/datatable/) components for easy server-driven pagination/filtering/sorting
-   Session-based flash messages
-   Error handling utilizing PrimeVue's [`<Toast />`](https://primevue.org/toast/) component (instead of default full-page modal response)
-   Light/dark/system color mode toggle
-   Easily customizable theming
-   Pre-configured [server-side rendering](/features/ssr)
-   PHPStan with level 8 compliance

## Alternatives

<!-- ### Branch - Admin Role

Want even more out of this starter kit? Check out the [Admin Role](https://github.com/connorabbas/laravel-primevue-starter-kit/tree/feature/admin-role) branch, which provides an Admin Role and permissions features.

Read the [setup docs](/alt/admin-role-branch) to learn more and get started. -->

### PrimeVue SPA + Laravel API Starter Kit

Do you prefer/need a separate Vue SPA front-end rather than using Inertia.js? Consider using the [PrimeVue SPA + Laravel API Starter Kit](https://github.com/connorabbas/laravel-api-primevue-starter-kit) instead.

Read the [setup docs](/alt/api-spa) to learn more and get started.
