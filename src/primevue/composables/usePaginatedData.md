# usePaginatedData

## About

`usePaginatedData` is a composable that manages server-driven pagination, sorting, and filtering with **Inertia.js** and **PrimeVue's** [Paginator](https://primevue.org/paginator/) component. It handles URL sync, state management, and [Inertia's router](https://inertiajs.com/manual-visits) visits under the hood.

## Parameters

-   `propDataToFetch: string | string[]` - The Inertia prop key(s) to request when fetching data, specified in the controller.
-   `initialFilters: PrimeVueDataFilters` _(optional, default: `{}`)_ - Initial filtering definitions per field.
-   `initialRows: number` _(optional, default: `20`)_ - The default/initial number of rows per page.

## Returned State & Functions

-   `processing: Ref<boolean>` - `true` while a request is in flight.
-   `filters: Ref<PrimeVueDataFilters>` - Reactive filter metadata (values & match modes).
-   `sorting: Ref<SortState>` - Reactive sorting field & order.
-   `pagination: Ref<PaginationState>` - Reactive page index & rows per page.
-   `firstDatasetIndex: ComputedRef<number>` - Zero-based index of the first item on the current page.
-   `filteredOrSorted: ComputedRef<boolean>` - `true` if filters or sorting are active.
-   `debounceInputFilter: (fn: () => void) => void` - Debounced wrapper to throttle filter input.
-   `scrollToTop: () => void` - Smoothly scrolls the window to the top.
-   `fetchData(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>` - Performs an Inertia GET visit with current filters, sorting, and pagination.
-   `paginate(event: PageState | DataTablePageEvent): Promise<Page<PageProps>>` - Updates pagination state & fetches.
-   `filter(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>` - Resets to page 1 & fetches with current filters and sorting.
-   `reset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>` - Resets filters, sorting & pagination to initial values, then fetches.
-   `hardReset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>>` - Performs a fresh Inertia visit, clearing URL params.
-   `parseUrlParams(params: PaginatedFilteredSortedQueryParams): void` - Manually set state from URL params.

## Reference

- [Example](https://laravel-primevue-starter-kit-demo.laravel.cloud/examples/paginator/contacts)
- [Example - Source Code](https://github.com/connorabbas/laravel-primevue-starter-kit-demo/blob/master/resources/js/pages/examples/paginator/contacts/Index.vue)
- [Types](https://github.com/connorabbas/laravel-primevue-starter-kit/blob/master/resources/js/types/index.d.ts)
