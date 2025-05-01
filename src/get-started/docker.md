# Development with Docker

This starter kit is configured to use Docker Compose for local development with just a few extra steps, powered by images & configuration from [Laravel Sail](https://laravel.com/docs/master/sail). With this setup, you do not need PHP, Composer, PostgreSQL or Node.js installed on your machine to get up and running with this project.

If you are developing on Windows, it is highly recommended to use [WSL 2](https://docs.docker.com/desktop/features/wsl/).

## Setup

1. In a new directory (outside of your Laravel project) create a `docker-compose.yml` file to create a reverse proxy container using [Traefik](https://doc.traefik.io/traefik/getting-started/quick-start/). You can clone/reference this [example implementation](https://github.com/connorabbas/traefik-docker-compose/blob/master/docker-compose.yml).

2. Step into the directory containing the new compose file, and spin up the Traefik container:
    ```
    docker compose up -d
    ```
3. Update Laravel app `.env`

    ```env
    # Use any desired domain ending with .localhost
    # Match domain value in docker-compose.local.yml laravel service labels section
    APP_URL=http://laravel-primevue.localhost

    DB_CONNECTION=pgsql
    DB_HOST=pgsql # name of service
    DB_PORT=5432
    DB_DATABASE=laravel
    DB_USERNAME=sail
    DB_PASSWORD=password

    WWWGROUP=1000
    WWWUSER=1000

    # Update port values as needed when running multiple projects/services
    #APP_PORT=80 not required when using Traefik reverse proxy
    VITE_PORT=5173
    FORWARD_DB_PORT=5432
    ```

4. Build the Laravel app container using one of the following techniques:
    - Build manually using docker compose CLI
        ```bash
        docker compose -f docker-compose.local.yml up -d
        ```
    - Use [Laravel Sail](https://laravel.com/docs/master/sail)
    - Build as a [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/tutorial) using the `Dev Containers: Reopen in Container` command

## Additional configuration

If you wish to add additional services, or swap out PostgreSQL with an alternative database, you can reference the [Laravel Sail stubs](https://github.com/laravel/sail/tree/1.x/stubs) and update the `docker-compose.local.yml` file as needed.
