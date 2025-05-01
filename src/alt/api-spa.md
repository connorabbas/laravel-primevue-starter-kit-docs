# API / SPA Starter Kit

## Vue SPA

Clone from source repository:

::: code-group

```bash [HTTPS]
git clone https://github.com/connorabbas/laravel-api-primevue-starter-kit.git
```

```bash [SSH]
git clone git@github.com:connorabbas/laravel-api-primevue-starter-kit.git
```

:::

Alternatively:

-   Create a new repository using the [public template on GitHub](https://github.com/new?template_name=laravel-api-primevue-starter-kit&template_owner=connorabbas).
-   Create a [new fork](https://github.com/connorabbas/laravel-api-primevue-starter-kit/fork) on GitHub.
-   Download the ZIP from GitHub.

## Laravel API

1. Create a [new Laravel application](https://laravel.com/docs/master/installation)
2. Install [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#laravel-breeze-installation) using the [API Stack](https://laravel.com/docs/11.x/starter-kits#breeze-and-next) option
3. Setup necessary `.env` configuration values in the Laravel API project

    ```
    # Example implementation
    # Remember, your SPA and API must share the same top-level domain
    APP_URL=http://api.vue-spa.localhost # Match this value with VITE_API_BASE_URL in the Vue app
    FRONTEND_URL=http://vue-spa.localhost # Add app.frontend_url config entry as needed
    SANCTUM_STATEFUL_DOMAINS="vue-spa.localhost"
    SESSION_DOMAIN="vue-spa.localhost"
    ```

4. Create controllers

    ```bash
    php artisan make:controller ProfileController
    ```

    ```bash
    php artisan make:controller PasswordController
    ```

5. Copy Controller code
   ::: code-group

    ```php [ProfileController.php]
    <?php

    namespace App\Http\Controllers;

    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Http\Response;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Validation\Rule;
    use Illuminate\View\View;

    class ProfileController extends Controller
    {
        /**
        * Update the user's profile information.
        */
        public function update(Request $request): Response
        {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                    Rule::unique(User::class)->ignore($request->user()->id),
                ],
            ]);

            $request->user()->fill($validated);

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();

            return response()->noContent();
        }

        /**
        * Delete the user's account.
        */
        public function destroy(Request $request): Response
        {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);

            $user = $request->user();

            Auth::logout();

            $user->delete();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->noContent();
        }
    }

    ```

    ```php [PasswordController.php]
    <?php

    namespace App\Http\Controllers\Auth;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Illuminate\Http\Response;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\Rules\Password;

    class PasswordController extends Controller
    {
        /**
        * Update the user's password.
        */
        public function update(Request $request): Response
        {
            $validated = $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $request->user()->update([
                'password' => Hash::make($validated['password']),
            ]);

            if ($request->session()->has('password_hash_web')) {
                $user = Auth::user();
                $request->session()->forget('password_hash_web');
                Auth::login($user);
            }

            return response()->noContent();
        }
    }

    ```

    :::

6. Setup routes

    ```php
    Route::controller(App\Http\Controllers\ProfileController::class)
        ->middleware('auth')
        ->group(function () {
            Route::patch('/profile', 'update')->name('profile.update');
            Route::delete('/profile', 'destroy')->name('profile.destroy');
        });

    Route::put('password', [App\Http\Controllers\Auth\PasswordController::class, 'update'])
        ->middleware('auth')
        ->name('password.update');
    ```
