# Server-Side Rendering

## Setup

Server-side rendering is configured and ready for use out of the box. Simply build the client & server side bundles with the following script:

```bash
npm run build:ssr
```

Then start the Node-based Inertia SSR server:

```bash
php artisan inertia:start-ssr
```

With the server running, you should be able to access your app within the browser with server-side rendering enabled. You can reference [Inertia's SSR Documentation](https://inertiajs.com/docs/v2/advanced/server-side-rendering) for further information.

## Disable SSR / SPA Only Mode

If your application is not public facing and does not require server-side rendering (internal administrative application, dashboard, etc.) then you can remove the SSR related configurations to have the site operate as a traditional SPA, without server-rendered markup and client-side hydration.

Use the following steps to disable SSR:

1. Delete `resources/js/ssr.ts`
2. Front-end code changes

    ::: code-group

    ```ts [resources/js/app.ts]
    import { createSSRApp, DefineComponent, h } from 'vue' // [!code --]
    import { createApp, DefineComponent, h } from 'vue' // [!code ++]

    // ...

    createSSRApp(Root) // [!code --]
    createApp(Root) // [!code ++]
    ```

    ```ts [resources/js/layouts/app/SidebarLayout.vue]
    import { useStorage } from '@vueuse/core' // [!code ++]

    // ...

    const sidebarOpen = useSsrStorage('desktop-sidebar-open', true) // [!code --]
    const sidebarOpen = useStorage('desktop-sidebar-open', true) // [!code ++]
    ```

    ```json [package.json]
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "build:ssr": "vite build && vite build --ssr", // [!code --]
        "lint": "eslint . --fix"
    }
    ```

    ```js [vite.config.ts]
    plugins: [
        laravel({
            input: 'resources/js/app.ts',
            ssr: 'resources/js/ssr.ts', // [!code --]
            refresh: true,
        }),
        // ...
    ]
    ```

    :::

3. Back-end code changes
   ::: code-group

    ```php [app/Http/Middleware/HandleInertiaRequests.php]
    use Tighten\Ziggy\Ziggy; // [!code --]

    // ...

    return [
        ...parent::share($request),
        'colorScheme' => fn () => $request->cookie('colorScheme', 'auto'), // [!code --]
        'ziggy' => fn () => [ // [!code --]
            ...(new Ziggy())->toArray(), // [!code --]
            'location' => $request->url(), // [!code --]
        ], // [!code --]
        // ...
    ];
    ```

    :::
