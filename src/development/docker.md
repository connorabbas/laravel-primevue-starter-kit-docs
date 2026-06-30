# Docker

This starter kit is configured to use Docker and Docker Compose for both local development and shipping to production, powered by images from [serversideup/php](https://serversideup.net/open-source/docker-php/docs) and [Traefik](https://traefik.io/traefik).

It's assumed that you have [Docker Desktop](https://www.docker.com/products/docker-desktop/), [Docker Compose](https://docs.docker.com/compose/install/), and [Git](https://git-scm.com/downloads) installed on your machine.

If you are developing on Windows, it is highly recommended to use [WSL 2](https://docs.docker.com/desktop/features/wsl/) for local development.

## Local Development

### Traefik Setup

1.  Clone the example Traefik project
    ```bash
    git clone git@github.com:connorabbas/traefik-docker-compose.git --single-branch traefik
    ```
2.  Step into the project
    ```bash
    cd traefik
    ```
3.  Spin up the container
    ```bash
    docker compose -f docker-compose.dev.yml up -d
    ```

### Application Setup

1. Install the starter kit using the [Manual (Git)](/get-started/installation-guide.html#manual-git) option

2. Update Laravel app `.env`

    ```bash
    # Use any desired domain ending with .localhost
    APP_DOMAIN=laravel-primevue.localhost # referenced by Traefik in docker-compose
    APP_URL="http://${APP_DOMAIN}"

    DB_CONNECTION=pgsql
    DB_HOST=pgsql # name of service
    DB_PORT=5432
    DB_FORWARD_PORT=5432 # adjust as needed when running multiple projects
    DB_DATABASE=laravel
    DB_USERNAME=laravel
    DB_PASSWORD=password

    VITE_APP_PORT=5173 # adjust as needed when running multiple projects

    USER_ID=1000
    GROUP_ID=1000
    ```

3. Build the Laravel app container using one of the following techniques:

    - Build manually using docker compose CLI
        ```bash
        docker compose -f docker-compose.dev.yml up -d
        ```
    - Build as a [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/tutorial) (recommended approach) using the `Dev Containers: Reopen in Container` command via the Command Pallette (`Ctrl+Shift+P`).
        ::: tip
        Dev containers are also supported with [`PhpStorm`](https://www.jetbrains.com/help/phpstorm/dev-containers-starting-page.html) from JetBrains, but has not been tested with this project.
        :::

### Why not [Laravel Sail](https://laravel.com/docs/master/sail)?

-   **Image Size**: The image used for Sail is over 3gb in size, whereas the Server Side Up image comes in just over 400mb for development, and 300mb for production, utilizing multi-stage builds.
-   **Production-Ready Server**: The Server Side Up image employs Nginx with PHP-FPM, optimized for performance and scalability, unlike Sail's `artisan serve` approach, which is development-focused and unsuitable for production.
-   **Minimal Dependencies**: Installs only necessary dependencies (bcmath, gd, pgsql, etc.) and excludes dev tools in production, unlike Sail's inclusion of tools like Xdebug, and multiple database clients.

You could also consider using [Spin](https://serversideup.net/open-source/spin/) as an alternative option.

## Production

Shipping a Docker-based Laravel application to production is out of scope for the documentation of this starter kit.

However, using a combination of the example [Docker Compose Traefik](https://github.com/connorabbas/traefik-docker-compose) project along with the Docker-related files provided in this starter-kit, it is fully equipped to ship your project to production.

::: info
For example, the [Demo Application](https://demo.laravel-primevue-starter-kit.com/) is hosted on a basic VPS, served using Docker with the included `docker-compose.yml` configuration. SSR is also enabled, powered by a long running [S6 Overlay](https://serversideup.net/open-source/docker-php/docs/guide/using-s6-overlay) process (also provided by the starter-kit).
:::

## Additional configuration

If you wish to add additional services, or swap out PostgreSQL with an alternative database, the [Laravel Sail stubs](https://github.com/laravel/sail/tree/1.x/stubs) are a good reference point to update any `docker-compose` related changes as needed.
