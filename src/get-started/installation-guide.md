# Installation Guide

## Development Environment

### Basic

The easiest way to get started developing locally is to use either [Laravel Herd](https://herd.laravel.com/windows), or [Laragon](https://laragon.org/). Reference [Laravel's installation docs](https://laravel.com/docs/master/installation#creating-a-laravel-project) to learn more. It's recommended to use the [Laravel Installer](#laravel-installer) installation option for this type of environment.

### Docker

If you want more flexibility and already have Docker knowledge, this starter kit provides a streamlined [Docker development setup](/get-started/docker) to get you up and running in no time. You'll want to use the [Manual (Git)](#manual-git) installation option if you don't want/have PHP, Composer, & Node installed on your machine.

## Laravel Installer

Setup a new project using the [Laravel installer](https://laravel.com/docs/master/installation#installing-php):

```bash
laravel new your-project-name --using=connora/laravel-primevue-starter-kit
```

## Composer

If you don't want to use the Laravel installer, you can use Composer directly:

```bash
composer create-project connora/laravel-primevue-starter-kit your-project-name
```

The Composer scripts should handle all the PHP/Laravel related setup, all you'll need to do is install the npm dependencies:
```bash
npm install
```

## Manual (Git)

Clone directly from source repository:
::: code-group

```bash [HTTPS]
git clone https://github.com/connorabbas/laravel-primevue-starter-kit.git your-project-name
```

```bash [SSH]
git clone git@github.com:connorabbas/laravel-primevue-starter-kit.git your-project-name
```

:::

Alternatively:

-   Create a new repository using the [public template](https://github.com/new?template_name=laravel-primevue-starter-kit&template_owner=connorabbas) (then clone)
-   Create a [new fork](https://github.com/connorabbas/laravel-primevue-starter-kit/fork) (then clone)
-   Download the ZIP

### Setup

1. **Navigate to the project directory**:

    ```bash
    cd your-project-name
    ```

2. **Copy the `.env.example` file to create a `.env` file**:

    ::: code-group

    ```bash [Unix/Mac]
        cp .env.example .env
    ```

    ```bash [Windows]
        copy .env.example .env
    ```

    :::

3. **Install Composer dependencies**:

    ```bash
    composer install
    ```

4. **Generate an application key**:

    ```bash
    php artisan key:generate
    ```

5. **Migrate database tables**

    ```bash
    php artisan migrate
    ```

6. **Install npm dependencies**:

    ```bash
    npm install
    ```
