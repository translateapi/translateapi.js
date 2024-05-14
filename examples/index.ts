import { setupTranslateAPI, useTranslations } from "../src"

setupTranslateAPI({
  defaultLanguage: "en_US",
  defaultNamespace: "default",
})

const translate = await useTranslations()

const test = translate("test")
console.log(test)
