import { config } from "./config"
import { formatNamespace } from "./utils"
import type {
  SetupTranslateAPIConfig,
  TranslateFunction,
  Translation,
} from "./types"
const locales = await import(`../public/locales.json`)

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

  return function translate(translationKey: string, fallback?: string) {
    return (
      translations[formattedNamespace][translationKey] ??
      fallback ??
      translationKey
    )
  }
}

async function fetchTranslations(namespace?: string) {
  const formattedNamespace =
    namespace ?? formatNamespace(config.defaultNamespace)

  const response = await fetch(
    `https://translateapi-${config.readToken}.b-cdn.net/${formattedNamespace}/${config.language}.json`
  )

  if (!response.ok) {
    throw new Error(
      `No Translations for Language ${config.language} found. Visit app.translateapi.com to create them.`
    )
  }

  const json: any = await response.json()
  translations[formattedNamespace] = Object.assign({}, ...json)
}
