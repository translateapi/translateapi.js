export type TranslateAPIConfig = {
  defaultLanguage: string;
  defaultNamespace: string;
};

export type Translation = {
  [translationKey: string]: string;
};
