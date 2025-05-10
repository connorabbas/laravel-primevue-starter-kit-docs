# Theming

This starter kit provides a collection of custom theme presets to choose from, built using the powerful **PrimeVue V4** theming system. It leverages styled mode and custom design token values to create flexible and cohesive UI designs.

## Provided Theme Presets

The theme presets are located in the `/resources/js/theme` directory. Each preset offers a distinct visual style:

### Bootstrap

Emulates the look and feel of [Bootstrap](https://getbootstrap.com/).

### Breeze

Captures the aesthetic of [Laravel Breeze](https://github.com/laravel/breeze). (R.I.P. :pray:)

### Enterprise

Provides a clean, no-nonsense corporate design.

### Noir

A minimal & clean monochromatic style that serves as the default theme.

### Warm

A boxy design with a warmer color pallette.

## Theme Selector

The appearance settings page (`/settings/appearance` route) provides a theme selector to showcase the available preset options.

![theme-selector](/images/theme-selector-ss.png)

The theme selector is more of a demo of the available preset theme options, rather than a useful application feature. More often than not, you'll want to use just one preset as the default theme for your site. To remove the theme selector and use a default preset for the entire application, reference the following:

::: code-group

```js [resources/js/app.js]
import { useColorMode } from '@vueuse/core';
import themePreset from '@/theme/noir-preset'; // [!code ++]
import { useThemePreset } from '@/composables/useThemePreset'; // [!code --]

// Site light/dark mode
const colorMode = useColorMode({ emitAuto: true });

// Site theme preset // [!code --]
const { getCurrentPreset } = useThemePreset(); // [!code --]
const themePreset = getCurrentPreset(); // [!code --]
```

```vue [pages/settings/Appearance.vue]
<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';
import SelectColorModeButton from '@/components/SelectColorModeButton.vue';
import ThemePresetSelector from '@/components/ThemePresetSelector.vue'; // [!code --]
</script>

<template>
    <AppLayout>
        <InertiaHead title="Appearance Settings" />

        <SettingsLayout>
            <Card
                pt:body:class="max-w-2xl space-y-3"
                pt:caption:class="space-y-1"
            >
                <template #title>
                    Appearance settings
                </template>
                <template #subtitle>
                    Update your account's appearance settings
                </template>
                <template #content>
                    <div class="space-y-6"> // [!code --]
                        <div class="flex flex-col gap-2"> // [!code --]
                            <label for="color-mode-selector">Color Mode</label> // [!code --]
                            <SelectColorModeButton id="color-mode-selector" /> // [!code --]
                        </div> // [!code --]
                        <div class="flex flex-col gap-2"> // [!code --]
                            <label for="theme-preset-selector">Theme</label> // [!code --]
                            <ThemePresetSelector id="theme-preset-selector" /> // [!code --]
                        </div> // [!code --]
                    </div> // [!code --]
                    <SelectColorModeButton /> // [!code ++]
                </template>
            </Card>
        </SettingsLayout>
    </AppLayout>
</template>
```

:::

## Customizing Your Own Theme

Creating your own theme preset is simple. You can:

-   Swap the [primary](https://primevue.org/theming/styled/#primary) values with a different set of [colors](https://primevue.org/theming/styled/#colors).
-   Adjust the `colorScheme` [surface](https://primevue.org/theming/styled/#surface) values (e.g., slate, gray, neutral).
-   Change the extended [preset theme](https://primevue.org/theming/styled/#presets).

For detailed guidance on customization, please refer to the [PrimeVue Styled Mode Docs](https://primevue.org/theming/styled/).

## PrimeVue v4 w/ Tailwind CSS

To clarify, Tailwind is **not** used for any component styling in this starter kit; instead, we use PrimeVue's styled mode with a custom theme preset implementation for component styling. Tailwind is applied solely for layout purposes **around** PrimeVue components and for minimal styling when needed.
