# Development with AI

This starter kit intentionally does not ship with AI configuration files, since tool preferences vary among developers. That said, agentic tools like Cursor, Claude Code, OpenCode, Codex, etc. can significantly improve developer velocity. Use the MCP servers, skills, and instructions below to get the most out of them.

## MCP

When working with AI using this starter kit you should configure [Laravel Boost](https://laravel.com/docs/master/boost) and the official [PrimeVue MCP Server](https://primevue.org/mcp/) to provide your coding agent with useful tools that can greatly improve accuracy and efficiency.

### OpenCode

The PrimeVue docs do not provide an example for using their MCP server with OpenCode, you can reference the following:

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

## PrimeVue Development Skill

Based on the specific structure and configuration of this starter kit and how it uses PrimeVue (styled mode) with Inertia and Tailwind CSS, some AI models might not always get things exactly right when generating code. To overcome hallucinations and steer the AI in the right direction we can use a specific agent skill, which will utilize the PrimeVue MCP server tools and follow established patterns and conventions provided by the starter kit.

Add the following `primevue-development` skill into the relevant skills directory for your specific coding agent (`.github/skills`, `.claude/skills`, `.agents/skills`, etc.)

::: code-group

````md [/primevue-development/SKILL.md]
---
name: primevue-development
description: 'Apply this skill when developing with PrimeVue v4 UI in the Laravel + PrimeVue starter kit. Activate for every Vue page or feature — all UI elements must use PrimeVue components. Triggers include: creating or editing any Vue page/component, adding buttons, forms, inputs, dialogs, menus, tables, or any other UI element, working with DataTable and column filters, applying layout or styling, selecting between PrimeVue components, and customizing theme tokens or Pass Through options.'
license: MIT
metadata:
    author: connorabbas
---

# PrimeVue v4 Development

## MCP Server (Use First)

Always query the **PrimeVue MCP server** (`@primevue/mcp`) before implementing any component. Do not rely on memory for props, slots, or events.

Key tools:

- `suggest_component` — Find the right component for a use case before building anything.
- `get_component` / `get_component_props` / `get_component_slots` — Full API reference.
- `get_usage_example` / `get_example` — Real code samples.
- `get_component_pt` — Pass Through keys for DOM-level customization.
- `get_component_tokens` — Design tokens (CSS variables) for a component.
- `compare_components` — Side-by-side comparison when choosing between similar components.
- `search_all` — Broad search across components, guides, and props.

## Component Usage

- **Never create custom UI components.** Always check PrimeVue's full component catalog first via the MCP. If no suitable component exists, ask the user before building anything custom.
- Check sibling pages in `resources/js/pages/` for existing usage patterns before writing new markup.
- Prefer composition of existing PrimeVue components over any custom implementation.

## Inertia Flash Notifications

- For actions that require user-facing feedback after a server mutation, handle notifications server-side with `Inertia::flash(...)` (following project conventions in `AGENTS.md`) instead of manually wiring page-level `useToast()` success handlers or inline `Message` components. Manual Toasts should generally only be configured for client-side only actions (e.g., clipboard copy, etc.)

## Styled Mode & Theming

This project uses PrimeVue's **styled mode** with a custom preset located in `resources/js/theme/`. The active preset is imported in `resources/js/app.ts`.

- **Do not** override component styles with arbitrary CSS, `:deep()`, or Tailwind utilities applied directly to PrimeVue components.
- **Do not** add custom `border`, `border-radius`, or `box-shadow` styles to any component — styled mode themes already provide these, and adding extras breaks theme-swap consistency.
- Customize component appearance via design tokens: use the `dt` prop for scoped instance overrides, or modify the preset file for global overrides.
- When in doubt about available tokens for a component, call `get_component_tokens` from the MCP.
- Reference: https://primevue.org/llms/pages/styled.md

## Tailwind CSS Integration

Tailwind is used **only for layout** around PrimeVue components — never for component styling.

Use the `tailwindcss-primeui` plugin utility classes instead of raw Tailwind color/surface classes. These map to PrimeVue's active theme tokens and handle light/dark mode automatically — no `dark:` variants needed.

**Available theme-aware utility classes** (from the `#plugin` Extensions section):

| Class                        | Purpose                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `surface-0` … `surface-950`  | Surface color palette (use instead of `bg-white`, `bg-gray-*`, works for text- and bg-) |
| `primary-50` … `primary-950` | Primary color palette (text- and bg-)                                                   |
| `bg-primary`                 | Default primary background                                                              |
| `bg-emphasis`                | Emphasis background (e.g. hovered elements)                                             |
| `bg-highlight`               | Highlight background                                                                    |
| `bg-highlight-emphasis`      | Highlight background with emphasis                                                      |
| `text-color`                 | Standard text color                                                                     |
| `text-color-emphasis`        | Emphasized text color                                                                   |
| `text-muted-color`           | Secondary/muted text color                                                              |
| `text-muted-color-emphasis`  | Secondary text color with emphasis                                                      |
| `primary-contrast`           | Primary contrast color                                                                  |
| `primary-emphasis`           | Primary emphasis color                                                                  |
| `border-surface`             | Content border color                                                                    |
| `rounded-border`             | Theme border radius                                                                     |

- Do **not** use raw Tailwind color classes (`bg-gray-*`, `text-gray-*`, `bg-white`, etc.) for anything surface or text related.
- Do **not** add `dark:` variants for these — `tailwindcss-primeui` handles dark mode automatically.
- All variants and breakpoints are supported, e.g. `sm:bg-primary`, `hover:bg-emphasis`.
- Reference: https://primevue.org/llms/pages/tailwind.md

## Pass Through (PT)

Use Pass Through to apply Tailwind utility classes to a component's internal DOM elements when spacing or layout adjustments are needed that can't be achieved from outside the component.

```vue
<Panel header="Details" :pt="{ content: { class: 'px-6 py-4' } }" />
```

- Only use PT for **spacing and layout** (padding, margin, gap). Never use it for borders, shadows, or colors that conflict with the theme.
- Call `get_component_pt` from the MCP to discover all available PT keys for a component.
- Do not use `:deep()` as an alternative — PT is the correct and supported approach.
- Reference: https://primevue.org/llms/pages/passthrough.md

## Navigation & Menus

For any feature involving menus, navigation links, or breadcrumbs, always use the **custom wrapper components** found in `resources/js/components/router-link-menus/` instead of importing the PrimeVue originals directly. These wrappers extend their PrimeVue counterparts to render route-based items as Inertia `<Link>` components, enabling proper SPA navigation without full page reloads.

### Available wrappers

| Wrapper                             | Replaces                             |
| ----------------------------------- | ------------------------------------ |
| `router-link-menus/Menu.vue`        | `primevue/menu`                      |
| `router-link-menus/Menubar.vue`     | `primevue/menubar`                   |
| `router-link-menus/Breadcrumb.vue`  | `primevue/breadcrumb`                |
| `router-link-menus/TabMenu.vue`     | `primevue/tabs` + `primevue/tablist` |
| `router-link-menus/TieredMenu.vue`  | `primevue/tieredmenu`                |
| `router-link-menus/ContextMenu.vue` | `primevue/contextmenu`               |
| `router-link-menus/PanelMenu.vue`   | `primevue/panelmenu`                 |

All other props, slots, and exposed methods work identically to the underlying PrimeVue component.

### The `MenuItem` type

Always import `MenuItem` from `@/types` — **not** from `primevue/menuitem`. The custom type extends PrimeVueMenuItem with these additional properties:

```ts
import type { MenuItem } from '@/types';

// Additional fields beyond PrimeVue's MenuItem:
// route?:           string      — Inertia href; renders item as <Link> instead of <a>
// lucideIcon?:      LucideIcon  — Lucide icon component (alternative to PrimeVue's string `icon`)
// lucideIconClass?: string      — Classes applied to the lucide icon element
// active?:          boolean     — Marks the item as active (used by Menubar for active styling)
```

Any component that accepts or defines a menu items array must type it as `MenuItem[]`.

### Item rendering behaviour

- Items with a `route` property → rendered as an Inertia `<Link>` (SPA navigation, no page reload).
- Items with only a `url` property, or neither → rendered as a standard `<a>` tag.
- `lucideIcon` and `icon` are mutually exclusive per item; `lucideIcon` takes precedence when `icon` is absent.

### Usage example

```vue
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { MenuItem } from '@/types';
import Menu from '@/components/router-link-menus/Menu.vue';
import { Pencil, Trash } from '@lucide/vue';

const contextMenu = useTemplateRef<typeof Menu>('context-menu');
const contextMenuItems = ref<MenuItem[]>([]);

function openContextMenu(event: Event, rowData: SomeType) {
    contextMenuItems.value = [
        {
            label: 'Edit',
            lucideIcon: Pencil,
            command: () => {
                /* handle edit */
            },
        },
        {
            label: 'Delete',
            lucideIcon: Trash,
            command: () => {
                /* handle delete */
            },
        },
    ];
    if (contextMenu.value?.$el) {
        contextMenu.value.$el.toggle(event);
    }
}
</script>

<template>
    <Menu
        ref="context-menu"
        :model="contextMenuItems"
        popup
    />
    <Button
        type="button"
        @click="openContextMenu($event, rowData)"
    />
</template>
```

### `TabMenu` note

`TabMenu` uses an `items` prop (not `model`) and determines the active tab from each item's `active` boolean.

- Derive active state in the parent component (for example with `usePage().props.currentRouteName`).
- Build item URLs with `route` from `@/utils/route`.
- Set `active: true` on exactly one item for predictable highlighting.

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { MenuItem } from '@/types';
import TabMenu from '@/components/router-link-menus/TabMenu.vue';
import { KeyRound, Palette, ShieldCheck, UserRound } from '@lucide/vue';
import { route } from '@/utils/route';

const page = usePage();
const currentRoute = computed(() => page.props.currentRouteName);

const tabs = computed<MenuItem[]>(() => [
    {
        label: 'Profile',
        lucideIcon: UserRound,
        route: route('profile.edit'),
        active: currentRoute.value === 'profile.edit',
    },
    {
        label: 'Password',
        lucideIcon: KeyRound,
        route: route('password.edit'),
        active: currentRoute.value === 'password.edit',
    },
    {
        label: 'Two-Factor Auth',
        lucideIcon: ShieldCheck,
        route: route('two-factor.show'),
        active: currentRoute.value === 'two-factor.show',
    },
    {
        label: 'Appearance',
        lucideIcon: Palette,
        route: route('appearance'),
        active: currentRoute.value === 'appearance',
    },
]);
</script>

<template>
    <TabMenu :items="tabs" />
</template>
```

## Paginated Data Types

All paginated data returned from Laravel controllers must use Laravel's `LengthAwarePaginator` on the backend. On the frontend, type the corresponding Inertia page prop using `LengthAwarePaginator<T>` imported from `@/types`.

```ts
import type { LengthAwarePaginator } from '@/types';
```

Always provide the specific item type as the generic — never use `any` or leave it untyped:

```ts
// Correct
defineProps<{
    users: LengthAwarePaginator<User>;
    posts: LengthAwarePaginator<Post>;
}>();

// Wrong
defineProps<{
    users: LengthAwarePaginator<any>;
    users: any;
}>();
```

Pagination type reference: https://raw.githubusercontent.com/connorabbas/laravel-primevue-starter-kit/refs/heads/master/resources/js/types/pagination.d.ts

## DataTable & Pagination

When displaying tabular data, always use `<DataTable>` paired with the `usePaginatedDataTable()` composable from the starter kit.

**Composable parameters:**

- `propDataToFetch: string | string[]` — The Inertia prop key(s) to request on fetch.
- `initialFilters?: PrimeVueDataFilters` — Initial filter definitions per field (default: `{}`).
- `initialRows?: number` — Default rows per page (default: `20`).

**Key returned values to wire up:**

- `processing` — Bind to `:loading` on `<DataTable>`.
- `filters` — Bind to `v-model:filters` on `<DataTable>`.
- `pagination` / `firstDatasetIndex` — Bind to `:rows` and `:first`.
- `filter(event)` — Pass to `@filter` on `<DataTable>`.
- `sort(event)` — Pass to `@sort` on `<DataTable>`.
- `paginate(event)` — Pass to `@page` on `<DataTable>`.
- `reset()` — Clears filters, sorting, and pagination then re-fetches.

> **Important:** Include the `lazy` prop on `<DataTable>` when data arrives via deferred Inertia props to avoid recursive update errors.

**References:**

- [Composable docs](https://connorabbas.github.io/laravel-primevue-starter-kit-docs/features/composables/usePaginatedDataTable.html)
- [Demo source](https://raw.githubusercontent.com/connorabbas/laravel-primevue-starter-kit-demo/refs/heads/master/resources/js/pages/examples/data-table/contacts/Index.vue)
- [PrimeVue DataTable](https://primevue.org/llms/components/datatable.md)

**Basic usage pattern:**

```vue
<script setup lang="ts">
import { usePaginatedDataTable } from '@/composables/usePaginatedDataTable';
import { FilterMatchMode } from '@primevue/core/api';
import type { LengthAwarePaginator } from '@/types';
import type { Contact } from '@/types';

const props = defineProps<{
    contacts: LengthAwarePaginator<Contact>;
}>();

const { filters, processing, pagination, firstDatasetIndex, filter, sort, paginate, reset } = usePaginatedDataTable(
    'contacts',
    {
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    },
);
</script>

<template>
    <DataTable
        lazy
        :value="props.contacts.data"
        :loading="processing"
        v-model:filters="filters"
        filter-display="menu"
        :rows="pagination.rows"
        :total-records="props.contacts.total"
        :first="firstDatasetIndex"
        paginator
        @filter="filter"
        @sort="sort"
        @page="paginate"
    >
        <Column
            field="name"
            header="Name"
            sortable
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    placeholder="Search by name"
                />
            </template>
        </Column>
        <Column
            field="email"
            header="Email"
            sortable
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    placeholder="Search by email"
                />
            </template>
        </Column>
    </DataTable>
</template>
```

### Column Filters

- **Always** place filter inputs inside the `<Column>` component's `#filter` slot.
- **Never** use standalone inputs outside the table to manage filter state independently.
- Use the `filterModel` and `filterCallback` slot props for state binding and triggering the filter action.
- The `filter-display` prop on `<DataTable>` controls layout: `"row"` (inline) or `"menu"` (overlay).

```vue
<!-- CORRECT: filter lives inside the Column's #filter slot -->
<Column field="status" header="Status">
    <template #filter="{ filterModel, filterCallback }">
        <Select
            v-model="filterModel.value"
            :options="statusOptions"
            placeholder="Any"
            @change="filterCallback()"
        />
    </template>
</Column>

<!-- WRONG: standalone input outside the table -->
<InputText v-model="searchQuery" @input="fetchData()" />
```

## Paginated Cards (Non-Table Data)

When paginated, filtered, or sorted data doesn't fit a tabular layout, use `usePaginatedData()` paired with PrimeVue's `<Paginator>` component. Present items using `<Card>` components in a grid or list, and use `<Skeleton>` for the loading state while data is in-flight or changing.

Use this pattern for card grids, list layouts, gallery-style pages, feed-style results, and other non-tabular result sets. Use `<DataTable>` only when the content is genuinely tabular.

**Composable: `usePaginatedData`**

Same parameters as `usePaginatedDataTable`, but `filter()` and `sort()` accept options callbacks instead of DataTable events, making it suitable for any UI shape.

Key returned values:

- `processing` — `true` while a request is in-flight; use to toggle Skeleton visibility.
- `filters` / `sorting` / `pagination` — reactive state.
- `firstDatasetIndex` — zero-based index of the first item on the current page.
- `filteredOrSorted` — `true` if any filters or sorting are active.
- `debounceInputFilter(fn)` — debounced wrapper for text filter inputs; pass `() => filter()` as the callback.
- `paginate(event)` — pass to `@page` on `<Paginator>`.
- `filter()` — resets to page 1 and fetches with current filters.
- `hardReset()` — clears all state and performs a fresh Inertia visit.

> **Important:** `usePaginatedData` requires a `queryParams` shared prop to be present, which the starter kit's `HandleInertiaRequests` middleware adds automatically.

**References:**

- [Composable docs](https://connorabbas.github.io/laravel-primevue-starter-kit-docs/features/composables/usePaginatedData.html)
- [Demo source](https://raw.githubusercontent.com/connorabbas/laravel-primevue-starter-kit-demo/refs/heads/master/resources/js/pages/examples/paginator/contacts/Index.vue)
- [PrimeVue Paginator](https://primevue.org/llms/components/paginator.md)
- [PrimeVue Card](https://primevue.org/llms/components/card.md)
- [PrimeVue Skeleton](https://primevue.org/llms/components/skeleton.md)

**Usage pattern:**

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { usePaginatedData } from '@/composables/usePaginatedData';
import { FilterMatchMode } from '@primevue/core/api';
import type { LengthAwarePaginator } from '@/types';
import type { Project } from '@/types';

const props = defineProps<{
    projects: LengthAwarePaginator<Project>;
}>();

const { filters, processing, pagination, firstDatasetIndex, debounceInputFilter, filter, paginate, reset } =
    usePaginatedData('projects', {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

// Use pagination.rows (composable state) for skeleton count, not props.per_page
const skeletonItems = computed(() => Array.from({ length: pagination.value.rows }));
</script>

<template>
    <div class="flex flex-col gap-6">
        <!-- Filter controls -->
        <div class="flex items-center gap-2">
            <InputText
                :model-value="filters.global.value"
                placeholder="Search projects"
                @update:model-value="
                    (value) => {
                        filters.global.value = value;
                        debounceInputFilter(() => filter());
                    }
                "
            />
            <Button
                label="Reset"
                severity="secondary"
                variant="outlined"
                @click="reset()"
            />
        </div>

        <!-- Loading state: Skeleton cards matching the final card layout -->
        <div
            v-if="processing"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
            <Card
                v-for="(_, index) in skeletonItems"
                :key="index"
            >
                <template #content>
                    <div class="flex flex-col gap-3">
                        <Skeleton
                            height="1.5rem"
                            width="60%"
                        />
                        <Skeleton
                            height="1rem"
                            width="100%"
                        />
                        <Skeleton
                            height="1rem"
                            width="85%"
                        />
                    </div>
                </template>
            </Card>
        </div>

        <!-- Loaded state -->
        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
            <Card
                v-for="project in props.projects.data"
                :key="project.id"
            >
                <template #title>{{ project.name }}</template>
                <template #content>
                    <p>
                        {{ project.description ?? 'No description provided.' }}
                    </p>
                </template>
            </Card>
        </div>

        <Paginator
            :rows="pagination.rows"
            :total-records="props.projects.total"
            :first="firstDatasetIndex"
            @page="paginate"
        />
    </div>
</template>
```

- Use `pagination.value.rows` (from the composable) for the skeleton item count — not `props.per_page` directly.
- Mirror the card's internal structure with appropriately sized `<Skeleton>` elements.
- Always place `<Paginator>` outside and below the card grid, not inside any individual card.
- Wire filter text inputs using `debounceInputFilter(() => filter())` — do not call `filter()` directly on every keystroke.
- Use `filteredOrSorted` to conditionally show a reset/clear button, calling `hardReset()` on click.

### When to use this pattern

- Card grids and resource galleries
- Search result and directory pages
- Activity feeds and catalog pages
- Mobile-first layouts where a table would be awkward
- Any result set where rows don't map cleanly to columns

## Icons

All icons must come from **Lucide** (`@lucide/vue`). The `primeicons` package is not installed.

- **Never** use PrimeIcons class strings such as `pi pi-*`.
- **Never** import or depend on the `primeicons` package.
- **Never** pass icon class names into PrimeVue components when the component provides an icon slot.
- Import only the specific Lucide icons needed by the page/component.
- Render icons as Vue components **inside the relevant PrimeVue slot template** — use the MCP's `get_component_slots` to confirm the correct slot name.
- For menu models, use the custom `MenuItem['lucideIcon']` field from `@/types` instead of PrimeVue's string `icon` field.

### Correct pattern

```vue
<script setup lang="ts">
import { Link as InertiaLink, usePage } from '@inertiajs/vue3';
import { LayoutGrid } from '@lucide/vue';

const page = usePage();
</script>

<template>
    <Button
        v-if="page.props.auth.user"
        :as="InertiaLink"
        :href="route('dashboard')"
        label="Dashboard"
        size="large"
        raised
    >
        <template #icon>
            <LayoutGrid />
        </template>
    </Button>
</template>
```

### Incorrect patterns

```vue
<!-- WRONG: PrimeIcons class string -->
<Button icon="pi pi-home" label="Home" />

<!-- WRONG: manual icon placed outside the component slot -->
<Button label="Home" />
<Home />
```

## Button Links

When a link is visually presented as a button, always render it as a **PrimeVue `<Button>`** using Inertia's `<Link>` via the button's `as` prop.

- Import `Link` from `@inertiajs/vue3` as `InertiaLink`.
- Use `:as="InertiaLink"` together with `:href="route(...)"` on the `<Button>`.
- Apply the `no-underline` class on the button root when using a link-style or text-style button.
- **Do not** wrap `<Button>` in `<Link>`.
- **Do not** wrap `<Link>` in `<Button>`.
- **Do not** use plain `<a>` tags styled to look like PrimeVue buttons for internal app navigation.
- Internal navigation must preserve Inertia SPA behavior.

### Correct pattern

```vue
<script setup lang="ts">
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import { Link as InertiaLink } from '@inertiajs/vue3';
import { LayoutGrid } from '@lucide/vue';
</script>

<template>
    <!-- Standard nav button link -->
    <Button
        :as="InertiaLink"
        :href="route('dashboard')"
        label="Dashboard"
        class="no-underline"
    >
        <template #icon>
            <LayoutGrid />
        </template>
    </Button>

    <!-- Link-variant button with custom PT layout -->
    <Button
        :as="InertiaLink"
        :href="route('welcome')"
        variant="link"
        pt:root:class="flex items-center justify-start gap-4 no-underline p-0"
    >
        <ApplicationLogo class="block h-8 lg:h-10 w-auto fill-current text-surface-900 dark:text-surface-0" />
        <span class="font-bold">Laravel + PrimeVue Starter Kit</span>
    </Button>
</template>
```

### Incorrect patterns

```vue
<!-- WRONG: wrapping Button with Link -->
<InertiaLink :href="route('dashboard')">
    <Button label="Dashboard" />
</InertiaLink>

<!-- WRONG: wrapping Link with Button -->
<Button>
    <InertiaLink :href="route('dashboard')">Dashboard</InertiaLink>
</Button>

<!-- WRONG: plain anchor tag for internal navigation -->
<a :href="route('dashboard')" class="p-button">Dashboard</a>
```
````

:::

## Instructions File

To provide more context about the starter kit's preferred patterns, and to invoke the `primevue-development` skill automatically you can add the following section to the end of your instructions file (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, etc.)

```md
<laravel-primevue-starter-kit-guidelines>

=== starter kit guideline rules ===

# Laravel + PrimeVue Starter Kit Guidelines

## Scope & Precedence

- These starter-kit guidelines extend `<laravel-boost-guidelines>` and take precedence where they conflict.

## Foundational Context

This application is a starter kit based on Laravel + PrimeVue components (styled mode), relevant packages & versions are listed below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- spatie/laravel-data (LARAVEL_DATA) - v4
- spatie/laravel-typescript-transformer (LARAVEL_TYPESCRIPT_TRANSFORMER) - v3
- @inertiajs/vue3 (INERTIA_VUE) - v3
- primevue (PRIMEVUE) - v4
- tailwindcss (TAILWINDCSS) - v4
- vue (VUE) - v3
- eslint (ESLINT) - v10
- @lucide/vue (LUCIDE) - v1
- @vueuse/core (VUEUSE) - v14

## Data Contracts

- For structured data contracts in application code, use DTO/value object classes (prefer `spatie/laravel-data` `Data` objects).
- For Inertia page props, backend payloads should be represented by `Data` classes and passed to `Inertia::render(...)` as typed objects (not ad-hoc associative arrays).
- Annotate frontend-facing `Data` classes with `#[TypeScript]` so they are emitted to `resources/js/types/generated.d.ts` by the TypeScript transformer.
- After creating/updating any `Data` class or route signatures, run `php artisan typescript:transform` (or rely on the watch process in `composer run dev`) so TS contracts stay in sync.
- Do not use associative arrays for internal structured payloads.
- Flat/list arrays are allowed when type-hinted with generics (for example `array<int, FooData>`).
- Associative arrays are allowed only at framework boundaries where required (for example `Inertia::render(...)` props, Form Request `rules()`, config files, validation message maps).
- Shared props must use the generated Data types in frontend declarations. Example: `auth.user` is shared as `UserData` in `app/Http/Middleware/HandleInertiaRequests.php` and typed as `App.Data.UserData | null` in `resources/js/types/index.d.ts`.
- For paginated page props, always transform model items into Data objects before returning to Inertia. Prefer chaining `->through(...)` on the paginator and returning the Data object from the callback.
- Add explicit PHPDoc generics for paginated results and transformed collections so the contract is clear (for example `LengthAwarePaginator<int, UserData>` after transformation).
- On the frontend, consume paginator props with `LengthAwarePaginator<T>` imported from `@/types` (re-exported from `resources/js/types/pagination.d.ts`), where `T` is the generated Data type (for example `LengthAwarePaginator<App.Data.UserData>`).
- In Vue pages/components, use explicit prop typing with shared/page prop composition (for example `defineProps<AppPageProps<{ users: LengthAwarePaginator<App.Data.UserData> }>>()`).

## Inertia Flash Notifications

- For server-driven notifications, use `Inertia::flash(...)` instead of Laravel session flash keys like `flash_success`, `flash_warn`, or page-local ad hoc props.
- Use suffix-based flash key naming:
  - `<severity>_toast` to trigger global toast notifications.
  - `<severity>_message` to render inline `FlashMessages` content.
- Use severity prefixes: `success`, `info`, `warn`, `error`. Unknown prefixes fall back to `secondary` in the frontend.
- Toast rendering is centralized in `resources/js/composables/useInertiaRouterEvents.ts` via `router.on('flash', ...)`; do not duplicate mutation-success toasts in page-level `onSuccess` callbacks.
- Inline message rendering is centralized in `resources/js/components/FlashMessages.vue`; use `*_message` flash keys when you want visible page-level messaging.

## Frontend Routing

- In Vue or TypeScript files, import `route` from `@/utils/route`.
- The `@/utils/route` helper function is generated by the `spatie/laravel-typescript-transformer` composer package using the `php artisan typescript:transform` command, DO NOT alter the contents of the file directly
- Do not rely on global route helpers or pass in route data from controllers to Vue page props.

## Skills Activation

- `primevue-development` — Activate for every Vue page or feature. All UI elements must use PrimeVue v4 components. Triggers include: creating or editing any Vue page/component, adding buttons, forms, inputs, dialogs, menus, tables, or any other UI element, working with DataTable and column filters, applying layout or styling, selecting between PrimeVue components, and customizing theme tokens or Pass Through options.

=== primevue rules ===

# PrimeVue v4

- IMPORTANT: Activate the `primevue-development` skill whenever working with any Vue UI — all component, styling, layout, and DataTable decisions are governed by that skill.
- All UI must use PrimeVue components. Never create custom UI components; always check the PrimeVue catalog first and ask the user if nothing fits.
- Always use the PrimeVue MCP server (`@primevue/mcp`) before implementing any component. Do not rely on memory for props, slots, or events.

</laravel-primevue-starter-kit-guidelines>
```
