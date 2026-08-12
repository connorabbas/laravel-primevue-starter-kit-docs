# Development with AI

This starter kit intentionally does not ship with AI configuration files, since tool preferences vary among developers. That said, agentic tools like Cursor, Claude Code, OpenCode, Codex, etc. can significantly improve developer velocity. Use the MCP servers and project rules below to give your coding agent accurate, application-specific context.

## MCP

When working with AI using this starter kit, configure [Laravel Boost](https://laravel.com/docs/13.x/boost) and the official [PrimeVue MCP Server](https://v4.primevue.org/mcp/). These servers provide tools for inspecting your Laravel application, searching version-specific Laravel documentation, and consulting PrimeVue component APIs and examples.

### OpenCode

The PrimeVue documentation does not provide an example for using its MCP server with OpenCode. You can use the following configuration:

::: code-group

```json [opencode.json]
{
    "$schema": "https://opencode.ai/config.json",
    "mcp": {
        "laravel-boost": {
            "type": "local",
            "enabled": true,
            "command": ["php", "artisan", "boost:mcp"]
        },
        "primevue": {
            "type": "local",
            "enabled": true,
            "command": ["npx", "-y", "@primevue/mcp"]
        }
    }
}
```

:::

## Project Rules

[Laravel Boost v2.5+ project rules](https://laravel.com/docs/13.x/boost#project-rules) capture application-specific conventions in scoped Markdown files under `.ai/rules`. Boost maintains an index of each rule's applicable paths so agents load only the context relevant to the files they are working on.

After configuring the Laravel Boost MCP server, send each prompt below to your agent. The agent will use Boost's `record-rule` tool to create the scoped rule files and update `.ai/rules/index.md`. Review and commit the generated `.ai/rules` directory so the conventions are shared with every teammate and coding agent.

```text
Remember this project rule for app/Data/**: Use Spatie Data objects for structured application and frontend-facing payloads. Mark frontend-facing Data classes with #[TypeScript] so `php artisan typescript:transform` emits matching TypeScript types. Run the transformer after changing Data classes or route signatures.

Remember this project rule for app/**: Use typed Data objects or value objects for internal structured payloads; do not pass associative arrays between application layers. Flat or list arrays are allowed when documented with generics, for example `array<int, FooData>`. Associative arrays are allowed only at framework boundaries that require them, such as `Inertia::render(...)` props, Form Request rules and messages, configuration maps, and validation maps.

Remember this project rule for app/Http/Controllers/**: In controllers, transform models and structured Inertia payloads into Data objects before returning them. Simple scalar and list values may remain in the framework-required `Inertia::render(...)` prop map. For paginated props, transform items with paginator `through(...)` and add PHPDoc generics for the transformed paginator type.

Remember this project rule for app/Http/Controllers/**: For controller-driven application notifications, use `Inertia::flash()` instead of ad hoc Laravel session flash keys. Name keys `<severity>_toast` for global toasts and `<severity>_message` for inline messages, using `success`, `info`, `warn`, or `error`. Unknown prefixes intentionally fall back to `secondary` in the frontend flash utilities.

Remember this project rule for app/Http/Middleware/**: The shared Inertia `auth.user` prop is `App\Data\UserData|null`. Keep `HandleInertiaRequests` and the frontend Inertia type declarations aligned when the authenticated user payload changes. Keep the `queryParams` shared prop available because the starter kit's pagination composables use it to initialize and reset request state.

Remember this project rule for resources/js/components/**: Server-driven toasts are rendered centrally from `resources/js/components/AppRoot.vue`, and inline flash messages are rendered by `FlashMessages.vue`. Page-level success callbacks may reset local UI state, but should not duplicate server mutation-success toasts. Configure manual toasts only for client-only actions such as copying to the clipboard.

Remember this project rule for resources/js/types/**: Keep shared Inertia props in the hand-authored `AppPageProps<T>` type and keep it aligned with `HandleInertiaRequests`. Use generated `App.Data.*` types for frontend-facing Data contracts and `LengthAwarePaginator<T>` from `@/types` for paginated props. Do not hand-edit generated declarations or the transformer manifest; regenerate them with `php artisan typescript:transform`.

Remember this project rule for resources/js/**: Import `route` from `@/utils/route` in Vue and TypeScript files for named application routes. Do not rely on a global route helper or controller-provided route tables for normal frontend navigation. Regenerate the helper with `php artisan typescript:transform` after route signature changes; do not edit it directly.

Remember this project rule for resources/js/pages/**/*.vue: Type Inertia page props with the starter kit's `AppPageProps<T>` from `@/types`. Declare page-specific props with `defineProps<AppPageProps<{ ... }>>()`, using generated `App.Data.*` types for structured payloads and `LengthAwarePaginator<App.Data.FooData>` from `@/types` for paginated Data objects. Use the same `AppPageProps<T>` composition when supplying a generic to `usePage()`.

Remember this project rule for resources/js/**/*.vue: Consult the PrimeVue MCP server before adding or changing UI, and do not rely on memory for component props, slots, events, Pass Through keys, or design tokens. Check sibling pages for established usage patterns and prefer PrimeVue catalog components and composition over custom interactive UI. If PrimeVue does not provide a suitable component, ask before creating a custom one.

Remember this project rule for resources/js/**/*.vue: This project uses PrimeVue v4 styled mode with its custom preset in `resources/js/theme/`. Use Tailwind CSS for layout around PrimeVue components, not to restyle component borders, radii, shadows, or colors. Use the `tailwindcss-primeui` theme-aware surface, primary, text, border, and radius utilities instead of raw Tailwind color classes or `dark:` variants. Customize PrimeVue appearance with design tokens through the `dt` prop or the global preset. Use Pass Through only for supported internal spacing and layout adjustments; consult the PrimeVue MCP server for valid keys and do not use `:deep()` overrides.

Remember this project rule for resources/js/**/*.vue: Use the starter kit's wrappers in `resources/js/components/router-link-menus/` for menus, menubars, breadcrumbs, tabs, tiered menus, context menus, and panel menus instead of importing the corresponding PrimeVue components directly. These wrappers preserve Inertia SPA navigation for items with a `route` property. Keep wrapper behavior aligned with the underlying PrimeVue component APIs.

Remember this project rule for resources/js/**: Type menu models as `MenuItem[]` using `MenuItem` from `@/types`, not `primevue/menuitem`. Use `route` for Inertia navigation, `lucideIcon` for Lucide component icons, `lucideIconClass` for icon classes, and `active` where a wrapper requires explicit active state. Build named URLs with `route` from `@/utils/route`.

Remember this project rule for resources/js/pages/**/*.vue: Display genuinely tabular server-paginated data with PrimeVue `DataTable` and the starter kit's `usePaginatedDataTable()` composable. Wire its loading, filters, pagination, filter, sort, and page state to the matching DataTable props and events. Include `lazy` when data arrives through deferred Inertia props. Put filter controls in each `Column` component's `#filter` slot and use its `filterModel` and `filterCallback`; do not maintain standalone table-filter inputs outside the DataTable.

Remember this project rule for resources/js/pages/**/*.vue: For paginated, filtered, or sorted data that is not genuinely tabular, use `usePaginatedData()` with PrimeVue `Paginator`. Present results with PrimeVue components such as `Card`, use `Skeleton` placeholders that mirror the loaded layout while requests are processing, and place the paginator below the result collection. Use `pagination.value.rows` for placeholder counts, debounce text filtering with `debounceInputFilter(() => filter())`, and use `hardReset()` when clearing active filters or sorting.

Remember this project rule for resources/js/**/*.vue: Use icons only from `@lucide/vue`; PrimeIcons is not installed. Import only the icons needed by the component and render them through the relevant PrimeVue icon slot. Never use `pi pi-*` class strings. For menu models, use the custom `MenuItem.lucideIcon` field instead of PrimeVue's string `icon` field.

Remember this project rule for resources/js/**/*.vue: When an internal Inertia link is presented as a button, render a PrimeVue `Button` with Inertia's `Link` passed through the button's `as` prop and the named route passed to `href`. Import `Link` as `InertiaLink`, preserve SPA navigation, and apply `no-underline` when needed. Do not nest `Button` and `Link`, and do not style a plain anchor to imitate a PrimeVue button.
```
