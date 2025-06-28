import "server-only";
import { Locale } from "@/lib/locales";

const dictionaries = {
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  hi: () => import("@/dictionaries/hi.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  bn: () => import("@/dictionaries/bn.json").then((module) => module.default),
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
  ja: () => import("@/dictionaries/ja.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  ko: () => import("@/dictionaries/ko.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  jv: () => import("@/dictionaries/jv.json").then((module) => module.default),
  it: () => import("@/dictionaries/it.json").then((module) => module.default),
  tr: () => import("@/dictionaries/tr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!(locale in dictionaries)) {
    return dictionaries.ru(); // fallback to Russian
  }
  return dictionaries[locale]();
};
