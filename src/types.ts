export type SetupTranslateAPIConfig = {
  readToken: string
  defaultLanguage: string
  defaultNamespace: string
}

export type TranslateAPIConfig = {
  language: string
} & SetupTranslateAPIConfig

export type Translation = {
  [translationKey: string]: string
}

export type TranslateOptions =
  | {
      fallback?: string
      [variable: string]: string | undefined
    }
  | undefined

export type TranslateFunction = (
  translationKey: string,
  options?: TranslateOptions
) => string
