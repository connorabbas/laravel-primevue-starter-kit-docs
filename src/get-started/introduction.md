# Introduction

## About

A basic authentication starter-kit for [Laravel](https://laravel.com/docs/master), built with [Intertia.js](https://inertiajs.com/), [PrimeVue](https://primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/).

This starter kit aims to provide similar functionality as the official [Laravel + Vue Starter Kit](https://github.com/laravel/vue-starter-kit), but utilizing **PrimeVue** components instead of **Shadcn for Vue**.

This starter kit provides a simple implementation of all of Laravel's [authentication features](https://laravel.com/docs/master/authentication), including login, registration, password reset, email verification, and password confirmation.

To view the starter kit in action, you can visit the [demo site](https://laravel-primevue-starter-kit-demo.laravel.cloud/).

### Features

-   Pre-configured [Auto Import](https://primevue.org/autoimport/) PrimeVue components
-   Extended PrimeVue menu/navigation components utilizing Inertia's `Link` component and [Lucide Icons](https://lucide.dev/)
-   `usePaginatedData()` & `useLazyDataTable()` composables for use with PrimeVue's `Paginator` & `DataTable` components for easy server-driven pagination/filtering/sorting
-   Light/dark/system color mode toggle
-   Easily customizable theming
-   Opt-in TypeScript usage

## Alternatives

### Branch - Admin Role

Want even more out of this starter kit? Check out the [Admin Role](https://github.com/connorabbas/laravel-primevue-starter-kit/tree/feature/admin-role) branch, which provides user permissions and roles using [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction).

Read the [setup docs](/alt/admin-role-branch) to learn more and get started.

### PrimeVue SPA + Laravel API Starter Kit

Do you prefer/need a separate Vue SPA front-end rather than using Inertia.js? Consider using the [PrimeVue SPA + Laravel API Starter Kit](https://github.com/connorabbas/laravel-api-primevue-starter-kit) instead.

Read the [setup docs](/alt/api-spa) to learn more and get started.
