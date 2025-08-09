# Server-Side Rendering

## Setup

Server-side rendering is configured and ready for use out of the box. Simply build the client & server side bundles:

```bash
npm run build
```

Then start the Node-based Inertia SSR server:

```bash
php artisan inertia:start-ssr
```

With the server running, you should be able to access your app within the browser with server-side rendering enabled. You can reference [Inertia's SSR Documentation](https://inertiajs.com/server-side-rendering) for further information.

## Disable SSR / SPA Only Mode

If your application is not public facing and does not require server-side rendering (internal administrative application, dashboard, etc.) then you can remove the SSR related configurations to have the site operate as a traditional SPA, without server-rendered markup and client-side hydration.

Reference the following steps to disable SSR:

1. Delete `resources/js/ssr.js`
2. Front-end changes

    ::: code-group

    ```json [package.json]
    "scripts": {
        "build": "vite build && vite build --ssr", // [!code --]
        "build": "vite build", // [!code ++]
        "dev": "vite",
        "lint": "eslint . --fix"
    }
    ```

    ```js [resources/js/app.js]
    import { createSSRApp, h } from 'vue'; // [!code --]
    import { createApp, h } from 'vue'; // [!code ++]

    // ...

    const app = createSSRApp(Root) // [!code --]
    const app = createApp(Root) // [!code ++]
    ```

    ```js [vite.config.js]
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js', // [!code --]
            refresh: true,
        }),
        // ...
        ssr: { // [!code --]
            noExternal: true, // bundle node server related files, so we don't need node_modules in production // [!code --]
        }, // [!code --]
    ];
    ```

    :::

3. Back-end changes
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
