import { config } from "./config"
import { formatNamespace } from "./utils"
import type {
  SetupTranslateAPIConfig,
  TranslateFunction,
  TranslateOptions,
  Translation,
} from "./types"
const locales = import(`../public/locales.json`)

const translations: { [namespace: string]: Translation } = {}

export type { TranslateFunction, Translation }

export function setupTranslateAPI(setupConfig: SetupTranslateAPIConfig) {
  config.readToken = setupConfig.readToken
  config.defaultLanguage = setupConfig.defaultLanguage
  config.language = setupConfig.defaultLanguage
  config.defaultNamespace = setupConfig.defaultNamespace
}

export async function setLanguage(language: string) {
  if (!Object.keys(locales).includes(language)) {
    throw new Error(`Language ${language} is not supported`)
  }

  config.language = language
  await fetchTranslations()
}

export async function useTranslations(
  namespace?: string
): Promise<TranslateFunction> {
  const formattedNamespace = formatNamespace(
    namespace ?? config.defaultNamespace
  )

  await fetchTranslations(formattedNamespace)

  return function translate(translationKey: string, options: TranslateOptions) {
    const translationKeyOrDefault =
      translations[formattedNamespace][translationKey] ??
      options?.fallback ??
      translationKey

    let translation = translationKeyOrDefault

    // Replace placeholders with values from options and log warnings for unused options
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (key === "fallback" || value === undefined) continue
        const placeholder = new RegExp(`{${key}}`, "g")
        if (!translationKeyOrDefault.includes(`{${key}}`)) {
          console.warn(
            `[TranslateAPI]: The option '${key}' was provided but not used in the translation for '${translationKey}'.`
          )
        }
        translation = translation.replace(placeholder, value)
      }
    }

    // Check for placeholders that are not provided in options
    const placeholders = translation.match(/{[^}]+}/g) || []
    for (const placeholder of placeholders) {
      const key = placeholder.slice(1, -1) // Remove the curly braces
      if (!options || !(key in options)) {
        console.warn(
          `[TranslateAPI]: The placeholder '${placeholder}' was not provided in the options for '${translationKey}'.`
        )
      }
    }

    return translation
  }
}

async function fetchTranslations(namespace?: string) {
  const formattedNamespace =
    namespace ?? formatNamespace(config.defaultNamespace)
  const url = `https://translateapi-${config.readToken}.b-cdn.net/${formattedNamespace}/${config.language}.json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `[TranslateAPI]: No Translations for Language ${config.language} found. Visit app.translateapi.com to create them.`
    )
  }

  const json: any = await response.json()
  translations[formattedNamespace] = Object.assign({}, ...json)
}
