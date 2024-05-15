# The official TranslateAPI JavaScript SDK

![NPM Version](https://img.shields.io/npm/v/%40translateapi%2Ftranslateapi.js?style=flat&label=%20&color=%230070FF)
![NPM Downloads](https://img.shields.io/npm/d18m/%40translateapi%2Ftranslateapi.js)

## Information

This is the official JavaScript SDK for [TranslateAPI](https://translateapi.com), helping you to integrate all of your Translations into your JavaScript application.

( ! ) **This is an early version of TranslateAPI and there may be major changes in the future**

## Installation

### Install the package

```bash
# bun
bun install @translateapi/translateapi.js
```

```bash
# pnpm
pnpm install @translateapi/translateapi.js
```

```bash
# npm
npm install @translateapi/translateapi.js
```

## Usage
### Setup TranslateAPI

In case you didn't create a TranslateAPI account yet, please do so as it is a requirement for this package to work.

Retrieve your company's Read Token from the [Company Settings](https://app.translateapi.com/company-settings) in the TranslateAPI app.

Initialize TranslateAPI in the entry-point of your web project:
```ts
import { setupTranslateAPI } from '@translateapi/translateapi.js'

setupTranslateAPI({
  readToken: "YOUR-READ-TOKEN",
  defaultLanguage: "en-US",
  defaultNamespace: "default"
})
```

### Start Translating

To get started translating your project, you should define a translate function coming from the `useTranslations()` function:

```html
<script lang="ts">
  import { type TranslateFunction, useTranslations } from '@translateapi/translateapi.js'

  let translate: TranslateFunction

  onMount(async () => {
    translate = await useTranslations()
  })
</script>

{#if translate}
<p>
  { translate('your-translation-key') }
</p>
{/if}
```

The example above is using **Svelte**, but this package can be used with **any Frontend Framework of your choice**. You simply need to keep in mind that the `useTranslations()` function has to be awaited and therefor the `translate()`function is not available immediately.

### Namespaces
In order to define what namespace you want to use for the area of your application that you are working on, you can define the namespace `useTranslations()` function like this:

```ts
translate = await useTranslations({
  namespace: 'your-namespace'
})
```

### Change the language
To set the language that TranslateAPI should use and display to your user, the `defaultLanguage` property in the `setupTranslateAPI()` function is used to define the default Language.

When adding a dropdown to let the user change the language, you can use the `setLanguage()` function, like this:

```ts
import { setLanguage } from '@translateapi/translateapi.js'

function changeToGerman() {
  setLanguage('de_DE')
}
```
Please keep in mind that only changing the language is currently not automatically updating your Translations and you need to do so manually, such as using a key in most common Frontend Frameworks.

## Notes

This package can be used either in the Browser or any Node environment. Exposing the Read Token is not a security issue as long as your translations should be publicly available.

The functionalities of this package are very simple and not feature-rich, because of the universal use-case. Framework specific packages are planned in the near Future to provide the most comfortable and easy to use developer experience.

## Planned features & improvements
- Automatically update Translations when changing the Language
- Drop-in customizable Language Selector
- Save & Retreive language selection in local storage
- Cache translations in local storage instead of the browser's cache
- & more...