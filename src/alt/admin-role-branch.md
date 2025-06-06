# Branch - Admin Role

## About

This branch provides additional functionality for roles/permissions provided by the [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction) composer package.

### Features

-   `Admin` role seeded by default
-   Artisan command to register new Users (and optionally assign their roles)
-   Example Users index page utilizing `useLazyDataTable()` composable

## Setup

Clone from source repository, specifying the branch.

::: code-group

```bash [HTTPS]
git clone -b feature/admin-role https://github.com/connorabbas/laravel-primevue-starter-kit.git your-project-name
```

```bash [SSH]
git clone -b feature/admin-role git@github.com:connorabbas/laravel-primevue-starter-kit.git your-project-name
```

:::

Follow the standard [setup instructions](/get-started/installation-guide.html#setup).

## Register User command

Since there is no registration page for admins, use the following artisan command:

```bash
php artisan user:register
```

And assign the Admin role.

## Admin Pages

A separate Admin dashboard page, and a Users index page are provided by default, protected by the `role:Admin` middleware

The Users index page provides an example using the `useLazyDataTable()` composable and PrimeVue's `<DataTable />` component. To seed the users table with test data (locally) you can run:

```bash
php artisan db:seed
```

## Changes

[Compare against the master branch](https://github.com/connorabbas/laravel-primevue-starter-kit/compare/master...feature/admin-role)
