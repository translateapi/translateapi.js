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
