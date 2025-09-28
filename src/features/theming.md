# Theming

This starter kit provides a collection of custom theme presets to choose from, built using the powerful **PrimeVue V4** theming system. It leverages styled mode and custom design token values to create flexible and cohesive UI designs.

## Provided Theme Presets

The theme presets are located in the `resources/js/theme` directory. Each preset offers a distinct visual style:

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

## Change the Theme Preset

Changing the site theme can be accomplished by simply updating the preset module used within `resources/js/app.ts`:

```js
import { useSiteColorMode } from '@/composables/useSiteColorMode';
import themePreset from '@/theme/noir-preset'; // [!code --]
import themePreset from '@/theme/bootstrap-preset'; // your desired preset // [!code ++]
```

## Customizing Your Own Theme

Creating your own theme preset is simple. You can:

-   Swap the [primary](https://primevue.org/theming/styled/#primary) values with a different set of [colors](https://primevue.org/theming/styled/#colors).
-   Adjust the `colorScheme` [surface](https://primevue.org/theming/styled/#surface) values (e.g., slate, gray, neutral).
-   Change the extended [preset theme](https://primevue.org/theming/styled/#presets).

For detailed guidance on customization, please refer to the [PrimeVue Styled Mode Docs](https://primevue.org/theming/styled/).

## Demo - Theme Selector

The [demo application](https://demo.laravel-primevue-starter-kit.com) appearance settings page (`/settings/appearance` route) provides a theme selector to showcase the provided preset options.

![theme-selector](/images/theme-selector-ss.png)

## PrimeVue v4 w/ Tailwind CSS

To clarify, Tailwind is **not** used for any component styling in this starter kit; instead, we use PrimeVue's styled mode with a custom theme preset implementation for component styling. Tailwind is applied solely for layout purposes **around** PrimeVue components and for minimal styling when needed.
