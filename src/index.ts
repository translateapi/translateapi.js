import { config } from "./config";
import { formatNamespace } from "./utils";
import type { TranslateAPIConfig, Translation } from "./types";

const translations: { [namespace: string]: Translation } = {};

export function setupTranslateAPI(setupConfig: TranslateAPIConfig) {
  config.defaultLanguage = setupConfig.defaultLanguage;
  config.defaultNamespace = setupConfig.defaultNamespace;
}

export async function useTranslations(namespace?: string) {
  const formattedNamespace = formatNamespace(
    namespace ?? config.defaultNamespace,
  );

  console.time("fetch");
  const response = await fetch(
    `https://1-horizon-isnice.b-cdn.net/${formattedNamespace}/${config.defaultLanguage}.json`,
  );
  translations[formattedNamespace] = await response
    .json()
    .then((data: any) => data[0]);
  console.timeEnd("fetch");

  return function translate(translationKey: string, fallback?: string) {
    return (
      translations[formattedNamespace][translationKey] ??
      fallback ??
      translationKey
    );
  };
}
