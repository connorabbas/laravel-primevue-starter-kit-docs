# Layouts

Similar to the official Laravel version, this starter kit includes two different primary layouts for you to choose from: a "sidebar" layout and a "header" layout. 

## Sidebar Layout

The header layout is used by default, to use the sidebar layout update `resources/js/layouts/AppLayout.vue`:

```vue
<script setup>
import AppLayout from '@/layouts/app/HeaderLayout.vue'; // [!code --]
import AppLayout from '@/layouts/app/SidebarLayout.vue'; // [!code ++]

defineProps({
    breadcrumbs: {
        type: Array,
        default: () => [],
    },
});
</script>
```