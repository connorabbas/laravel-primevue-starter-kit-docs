# Getting Started

## About

A basic authentication starter-kit built using [Laravel](https://laravel.com/docs/master), [Intertia.js](https://inertiajs.com/), [PrimeVue](https://primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/).

This starter kit aims to provide similar functionality as the official [Laravel + Vue Starter Kit](https://github.com/laravel/vue-starter-kit), but utilizing **PrimeVue** components instead of **Shadcn for Vue**.

This starter kit provides a simple implementation of all of Laravel's [authentication features](https://laravel.com/docs/master/authentication), including login, registration, password reset, email verification, and password confirmation.

### Features

-   Pre-configured [Auto Import](https://primevue.org/autoimport/) PrimeVue components
-   Extended PrimeVue menu/navigation components utilizing Inertia's `Link` component and [Lucide Icons](https://lucide.dev/)
-   `usePaginatedData()` & `useLazyDataTable()` composables for use with PrimeVue's `Paginator` & `DataTable` components for easy server-driven pagination/filtering/sorting
-   Light/dark/system color mode toggle
-   Easily customizable theming
-   Opt-in TypeScript usage
-   [Admin role branch](https://github.com/connorabbas/laravel-primevue-starter-kit/tree/feature/admin-role) using [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction)

## Create a New Application

To create a new application using this starter kit, there are a few options to choose from.

-   Create a new repository using the [public template on GitHub](https://github.com/new?template_name=laravel-primevue-starter-kit&template_owner=connorabbas).
-   Create a [new fork](https://github.com/connorabbas/laravel-primevue-starter-kit/fork) on GitHub.
-   Clone the repository
    ::: code-group
    ```bash [HTTPS]
    git clone https://github.com/connorabbas/laravel-primevue-starter-kit.git
    ```
    ```bash [SSH]
    git clone git@github.com:connorabbas/laravel-primevue-starter-kit.git
    ```
    :::
-   Download the ZIP from GitHub.

## Local development

### Basic

The easiest way to get started developing locally is to use either [Laravel Herd](https://herd.laravel.com/windows), or [Laragon](https://laragon.org/).

### Docker

If you want more flexibility and already have Docker knowledge, this starter kit provides a streamlined [Docker development setup](/introduction/docker) to get you up and running in no time.
