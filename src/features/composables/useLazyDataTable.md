# useLazyDataTable

## About

`useLazyDataTable` extends the `usePaginatedData` composable to integrate with **PrimeVue's** paginated [`<DataTable />`](https://primevue.org/datatable/#pagination) component, using event-driven filtering & sorting callbacks instead of reactive watchers.

::: tip
Make sure to always include the [`lazy`](https://primevue.org/datatable/#api.datatable.props.lazy) prop in the `<DataTable />` component implementation, to avoid recursive update errors.
:::

## Parameters

-   `propDataToFetch: string | string[]` - The Inertia prop key(s) to request when fetching data, specified in the controller.
-   `initialFilters: PrimeVueDataFilters` _(optional, default: `{}`)_ - Initial filtering definitions per field.
-   `initialRows: number` _(optional, default: `20`)_ - The default/initial number of rows per page.

## Returned State & Functions

-   Inherited from `usePaginatedData`:

    -   `processing: Ref<boolean>`
    -   `filters: Ref<PrimeVueDataFilters>`
    -   `sorting: Ref<SortState>`
    -   `pagination: Ref<PaginationState>`
    -   `firstDatasetIndex: ComputedRef<number>`
    -   `filteredOrSorted: ComputedRef<boolean>`
    -   `debounceInputFilter: (fn: () => void) => void`
    -   `scrollToTop: () => void`
    -   `fetchData(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>`
    -   `paginate(event: PageState | DataTablePageEvent): Promise<Page<PageProps>>`
    -   `hardReset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>`

-   `filter(event: DataTableFilterEvent): void` - Applies filters from the DataTable event & fetches.
-   `sort(event: DataTableSortEvent): void` - Applies sorting from the DataTable event & fetches.
-   `reset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>` - Resets filters, sorting & pagination to initial values, then fetches.

## Reference

- [Example - Demo](https://demo.laravel-primevue-starter-kit.comexamples/data-table/contacts)
- [Example - Source Code](https://github.com/connorabbas/laravel-primevue-starter-kit-demo/blob/master/resources/js/pages/examples/data-table/contacts/Index.vue)
- [Types](https://github.com/connorabbas/laravel-primevue-starter-kit/blob/master/resources/js/types/index.d.ts)
