import { setupTranslateAPI, useTranslations } from "../src"

setupTranslateAPI({
  readToken: "42814879",
  defaultLanguage: "en_US",
  defaultNamespace: "default",
})

const translate = await useTranslations()

const test = translate("test")
console.log(test)
