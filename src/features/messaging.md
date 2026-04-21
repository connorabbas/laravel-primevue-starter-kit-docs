# Messaging

Providing effective messaging for user interactions is an essential part of any web application. This starter kit provides an easy to way to deliver messaging content and errors utilizing PrimeVue's `<Message />` and `<Toast />` components, powered by Inertia's flash data and global router event listeners.

## Flash Messages

Server-driven messages are flashed using [`Inertia::flash()`](https://inertiajs.com/docs/v3/data-props/flash-data) and automatically rendered client-side with the correlated PrimeVue component based on the flash key suffix:

- `<severity>_message` renders an inline [`<Message />`](https://primevue.org/message/)
- `<severity>_toast` triggers a [`<Toast />`](https://primevue.org/toast/) notification

Supported severity prefixes: `success`, `info`, `warn`, `error`. Unknown prefixes will fall back to `secondary`.

This functionality is handled by the `resources/js/components/FlashMessages.vue` component, paired with Inertia's global [`flash`](https://inertiajs.com/docs/v3/advanced/events#flash) event listener.

In your controller:

```php
// Global toast
Inertia::flash('success_toast', 'Changes saved');
```

```php
// Inline closable message
Inertia::flash('warn_message', 'You are running low on tokens...');
```

```php
// Custom error handling
try {
    // ...
} catch (Throwable $e) {
    report($e);

    Inertia::flash('error_message', 'Update failed, we experienced an issue.');

    return redirect()->route('example-route');
}
```

You can even flash multiple messages at once:

```php
Inertia::flash([
    'success_toast' => 'Account created',
    'info_message' => 'Next step: review your settings',
]);
```

::: info
For client-only actions (e.g., clipboard copy), you should still use [`useToast()`](https://primevue.org/toast/#toast-service) directly.
:::

## Automatic Toast Error Handling

Inertia provides [error handling](https://inertiajs.com/docs/v3/advanced/error-handling) for XHR requests utilizing a full-page response modal and Laravel's built-in error pages. However, for SPA-style application flows with asynchronous requests, a full-page blocking modal isn't the most user-friendly experience. This starter kit provides an alternative approach, utilizing PrimeVue's `<Toast />` component to automatically display errors / warnings for failed mutation requests (POST, PATCH, PUT, DELETE) or network errors. You do not need to manually wire `useToast()` error handlers in your Vue pages.

This functionality is handled by the `respond()` exception callback in `bootstrap/app.php`, paired with Inertia's global [`httpException`](https://inertiajs.com/docs/v3/advanced/events#http-exception) and [`networkError`](https://inertiajs.com/docs/v3/advanced/events#network-error) event listeners.

- `4xx` status codes display a "warn" severity toast
- `5xx` status codes display an "error" severity toast
- Network failures display a connection error toast

Error details come from `config/errors.php` and can be customized.

### Custom Error Toasts

As covered in the previous [Flash Messages](/features/messaging.html#flash-messages) section, you can output custom message information using the `<severity>_toast` flash key if desired:

```php
// In your controller...
try {
    // ...
} catch (ExceptionWarrantingCustomErrorMessage $e) {
    report($e);

    Inertia::flash('error_toast', 'Update failed, we experienced an issue.')->back();
}
```