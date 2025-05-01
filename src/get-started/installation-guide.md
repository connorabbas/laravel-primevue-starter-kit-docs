# Installation

## Download Source Code

Clone from source repository:
::: code-group

```bash [HTTPS]
git clone https://github.com/connorabbas/laravel-primevue-starter-kit.git
```

```bash [SSH]
git clone git@github.com:connorabbas/laravel-primevue-starter-kit.git
```

:::

Alternatively:

-   Create a new repository using the [public template on GitHub](https://github.com/new?template_name=laravel-primevue-starter-kit&template_owner=connorabbas).
-   Create a [new fork](https://github.com/connorabbas/laravel-primevue-starter-kit/fork) on GitHub.
-   Download the ZIP from GitHub.

## Local Development Environment

### Basic

The easiest way to get started developing locally is to use either [Laravel Herd](https://herd.laravel.com/windows), or [Laragon](https://laragon.org/).

### Docker

If you want more flexibility and already have Docker knowledge, this starter kit provides a streamlined [Docker development setup](/introduction/docker) to get you up and running in no time.

## Local Setup

1. **Navigate to the project directory**:

    ```bash
    cd laravel-primevue-starter-kit
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

4. **Install npm dependencies**:

    ```bash
    npm install
    ```

5. **Generate an application key**:

    ```bash
    php artisan key:generate
    ```

6. **Start the local Vite development server**:
    ```bash
    npm run dev
    ```
