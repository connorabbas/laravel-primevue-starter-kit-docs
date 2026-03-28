# Development with AI

This starter kit intentionally does not ship with AI configuration files, since tool preferences vary among developers. That said, agentic tools like Cursor, Claude Code, OpenCode, Codex, etc. can significantly improve developer velocity. Use the MCP servers, skills, and instructions below to get the most out of them.

## MCP

When working with AI using this starter kit you should configure the official [PrimeVue MCP Server](https://primevue.org/mcp/) and [Laravel Boost](https://laravel.com/docs/master/boost) to provide your coding agent with useful tools that will greatly improve the accuracy of your code.

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

## Styled Mode & Theming

This project uses PrimeVue's **styled mode** with a custom preset located in `resources/js/theme/`. The active preset is imported in `resources/js/app.ts`.

- **Do not** override component styles with arbitrary CSS, `:deep()`, or Tailwind utilities applied directly to PrimeVue components.
- **Do not** add custom `border`, `border-radius`, or `box-shadow` styles to any component — styled mode themes already provide these, and adding extras breaks theme-swap consistency.
- Customize component appearance via design tokens: use the `dt` prop for scoped instance overrides, or modify the preset file for global overrides.
- When in doubt about available tokens for a component, call `get_component_tokens` from the MCP.
- Reference: https://primevue.org/theming/styled/

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
- Reference: https://primevue.org/tailwind/

## Pass Through (PT)

Use Pass Through to apply Tailwind utility classes to a component's internal DOM elements when spacing or layout adjustments are needed that can't be achieved from outside the component.

```vue
<Panel header="Details" :pt="{ content: { class: 'px-6 py-4' } }" />
```

- Only use PT for **spacing and layout** (padding, margin, gap). Never use it for borders, shadows, or colors that conflict with the theme.
- Call `get_component_pt` from the MCP to discover all available PT keys for a component.
- Do not use `:deep()` as an alternative — PT is the correct and supported approach.
- Reference: https://primevue.org/passthrough/

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
import { Pencil, Trash } from 'lucide-vue-next';

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

`TabMenu` uses an `items` prop (not `model`) and automatically derives the active tab from Ziggy's `route().current()`. Set `active: true` on items to control the active highlight explicitly when needed.

```vue
<script setup lang="ts">
import type { MenuItem } from '@/types';
import TabMenu from '@/components/router-link-menus/TabMenu.vue';
import { KeyRound, Palette, ShieldCheck, UserRound } from 'lucide-vue-next';

const tabs: MenuItem[] = [
    {
        label: 'Profile',
        icon: UserRound,
        route: route('profile.edit'),
    },
    {
        label: 'Password',
        icon: KeyRound,
        route: route('password.edit'),
    },
    {
        label: 'Two-Factor Auth',
        icon: ShieldCheck,
        route: route('two-factor.show'),
    },
    {
        label: 'Appearance',
        icon: Palette,
        route: route('appearance'),
    },
];
</script>

<template>
    <TabMenu :items="tabs" />
</template>
```

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
- [Demo source](https://github.com/connorabbas/laravel-primevue-starter-kit-demo/blob/master/resources/js/pages/examples/data-table/contacts/Index.vue)
- [PrimeVue DataTable](https://primevue.org/datatable/)

**Basic usage pattern:**

```vue
<script setup lang="ts">
import { usePaginatedDataTable } from '@/composables/usePaginatedDataTable';
import { FilterMatchMode } from '@primevue/core/api';

const props = defineProps<{ contacts: any }>();

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
````

:::

### Instructions File

To invoke this skill automatically you can add the following section to your instructions file (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, etc.)

```md
# Laravel Boost Guidelines

...

## Skills Activation

...

- `primevue-development` — Activate for every Vue page or feature. All UI elements must use PrimeVue v4 components. Triggers include: creating or editing any Vue page/component, adding buttons, forms, inputs, dialogs, menus, tables, or any other UI element, working with DataTable and column filters, applying layout or styling, selecting between PrimeVue components, and customizing theme tokens or Pass Through options.

=== primevue rules ===

# PrimeVue v4

- IMPORTANT: Activate the `primevue-development` skill whenever working with any Vue UI — all component, styling, layout, and DataTable decisions are governed by that skill.
- All UI must use PrimeVue components. Never create custom UI components; always check the PrimeVue catalog first and ask the user if nothing fits.
- Always use the PrimeVue MCP server (`@primevue/mcp`) before implementing any component. Do not rely on memory for props, slots, or events.
```
