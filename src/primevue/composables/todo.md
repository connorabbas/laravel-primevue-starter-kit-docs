::: code-group
```vue [products/Index.vue]
<script setup lang="ts">
import { ref } from 'vue';
import { usePaginatedData } from '@/composables/usePaginatedData';
import { FilterMatchMode } from '@primevue/core/api';
import { FunnelX, Search } from 'lucide-vue-next';
import { type LengthAwarePaginator } from '@/types';

const props = defineProps<{
    products: LengthAwarePaginator<App.Data.DataTransferObjects.Entities.Product.Product>;
}>();

const pageTitle = 'Products';
const breadcrumbs = [
    { label: 'Dashboard', route: route('dashboard') },
    { label: pageTitle, route: route('products.index') },
    { label: 'List' },
];

const {
    filters,
    sorting,
    firstDatasetIndex,
    filteredOrSorted,
    paginate,
    filter,
    hardReset,
} = usePaginatedData('products', {
    name: {
        value: '',
        matchMode: FilterMatchMode.CONTAINS,
    },
}, props.products.per_page);
const sortOptions = ref([
    {
        label: 'Name - Asc',
        value: { field: 'name', order: 1 },
    },
    {
        label: 'Name - Desc',
        value: { field: 'name', order: 0 },
    },
    {
        label: 'SKU - Asc',
        value: { field: 'sku', order: 1 },
    },
    {
        label: 'SKU - Desc',
        value: { field: 'sku', order: 0 },
    },
]);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <InertiaHead :title="pageTitle" />
        <Container
            vertical
            fluid
        >
            <PageTitleSection>
                <template #title>
                    {{ pageTitle }}
                </template>
                <template #end>
                    <Button
                        v-if="filteredOrSorted"
                        severity="secondary"
                        type="button"
                        label="Clear"
                        outlined
                        raised
                        @click="hardReset"
                    >
                        <template #icon>
                            <FunnelX />
                        </template>
                    </Button>
                </template>
            </PageTitleSection>
            <Card pt:body:class="p-3">
                <template #content>
                    <!-- Manual pagination implementation example -->
                    <div class="space-y-4">
                        <div class="flex gap-3">
                            <InputGroup>
                                <InputText
                                    v-model="filters.name.value"
                                    placeholder="Search by product name"
                                    @keyup.enter="filter"
                                />
                                <Button
                                    @click="filter"
                                >
                                    <template #icon>
                                        <Search />
                                    </template>
                                </Button>
                            </InputGroup>
                            <Select
                                v-model="sorting"
                                :options="sortOptions"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Sort By"
                                @change="filter"
                            />
                        </div>
                        <div
                            v-auto-animate
                            class="grid grid-cols-1 sm:grid-cols-12 gap-4"
                        >
                            <div
                                v-for="product in props.products.data"
                                :key="product.sku"
                                class="sm:col-span-6 lg:col-span-3"
                            >
                                <Card
                                    class="h-full"
                                    pt:content:class="flex flex-col gap-5"
                                >
                                    <template #content>
                                        <div class="flex justify-center">
                                            <Skeleton
                                                width="10rem"
                                                height="7rem"
                                            ></Skeleton>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <div>{{ product.name }}</div>
                                            <div class="text-muted-color text-sm">
                                                SKU: {{ product.sku }}
                                            </div>
                                        </div>
                                    </template>
                                </Card>
                            </div>
                        </div>
                        <div>
                            <Paginator
                                class="border-t dynamic-border"
                                :rows="products.per_page"
                                :first="firstDatasetIndex"
                                :totalRecords="products.total"
                                :rowsPerPageOptions="[20, 50, 100]"
                                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                                @page="paginate"
                            >
                            </Paginator>
                        </div>
                    </div>
                </template>
            </Card>
        </Container>
    </AppLayout>
</template>
```
:::