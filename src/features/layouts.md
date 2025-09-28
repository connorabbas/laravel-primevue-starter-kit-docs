# Layouts

Similar to the official Laravel version, this starter kit includes two different primary layouts for you to choose from: a "sidebar" layout and a "header" layout. 

## Sidebar Layout

The header layout is used by default, to use the sidebar layout update `resources/js/layouts/AppLayout.vue`:

```vue
<script setup lang="ts">
import AppLayout from '@/layouts/app/HeaderLayout.vue' // [!code --]
import AppLayout from '@/layouts/app/SidebarLayout.vue' // [!code ++]

// ...
```

The `resources/js/layouts/AppLayout.vue` component is used as a basic wrapper, so you can easily define one preferred layout to use throughout your entire app. You can also use a different layout on a per-page basis, for example:

```vue
<!-- resources/js/pages/Example.vue -->
<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue' // [!code --]
import SidebarLayout from '@/layouts/app/SidebarLayout.vue' // [!code ++]

// ...
```