# Messaging

Providing effective messaging for user interactions is an essential part of any web application. This starter kit provides an easy to way to deliver messaging content and errors, utilizing PrimeVue's [`<Message />`](https://primevue.org/message/) and [`<Toast />`](https://primevue.org/toast/) components.

## Flash Messages

Laravel offers the concept of [session-based flash data](https://laravel.com/docs/master/session#flash-data), this can be paired with Inertia's [shared data props](https://inertiajs.com/shared-data#flash-messages) to provide flash messages displayed using PrimeVue's `<Message />` component, utilizing different [severity levels](https://primevue.org/message/#severity).

Each layout (header, sidebar, guest auth) is pre-configured with a [`<FlashMessages />`](https://github.com/connorabbas/laravel-primevue-starter-kit/blob/master/resources/js/components/FlashMessages.vue) component that will automatically display the session-based flash messages at the top of the page.

The following flash message types are available:

-   **success** - For successful user interactions: creating/updating resources, uploading files, etc. (green)
-   **info** - To provide useful information (blue)
-   **warn** - Show a warning, not as critical as an error (yellow)
-   **error** - Used for exceptions or failed actions (red)
-   **message** - A general message (gray/secondary)

To flash a message, reference the flash type prefixed with "flash\_" as the key argument, for example:

```php
// In your controller...

// Chained to session helper
session()->flash('flash_success', 'Success - Resource created!');

// Or with a redirect
try {
    // ...
} catch (Throwable $e) {
    report($e);
    return redirect()
        ->route('example-route')
        ->with('flash_error', 'Error - Update failed, we experienced an issue.');
}
```

## Toast Messages

A PrimeVue `<Toast />` component and the required [toast service plugin](https://primevue.org/toast/#toast-service) are already registered globally at the app level (`app.js/ssr.js`). To start using toast messages, simply import and utilize the `useToast()` composable as documented.

### Error Handling with Toasts

Inertia provides [error handling](https://inertiajs.com/error-handling) for XHR requests utilizing a full-page response modal and Laravel's built-in error pages. However, for SPA-style application flows with asynchronous requests, a full-page blocking modal isn't the most eloquent experience. This starter kit provides an alternative approach, utilizing PrimeVue's `<Toast />` component to display errors / warnings instead.

This functionality is handled by the `respond()` exception method within the `bootstrap/app.php` file, along with an [event listener](https://inertiajs.com/events#invalid) within the `resources/js/app.js` file to handle the JSON response and trigger the toast/s.

The toast component [severity](https://primevue.org/toast/#severity) is determined by the error status code: `400` level errors will use the "warn" severity, while `500` level errors will use the "error" severity.

### Custom Error Details

The `500` level "error" severity toast messages will use general-purpose error details defined within the `bootstrap/app.php` file. If you want to return specific error details for a toast message, you can throw a `App\Exceptions\ErrorToastException` exception at the controller level:

```php
// In your controller...

use App\Exceptions\ErrorToastException;

try {
    // ...
} catch (ExceptionWarrantingCustomErrorDetails $e) {
    report($e);
    // Will trigger an "error" severity level toast message on the front-end
    throw new ErrorToastException('Specific error message...');
}
```