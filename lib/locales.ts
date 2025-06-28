export const locales = [
  "zh",
  "ar",
  "hi",
  "en",
  "es",
  "bn",
  "pt",
  "ru",
  "ja",
  "de",
  "ko",
  "fr",
  "jv",
  "it",
  "tr",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeConfig = {
  zh: { name: "中文", flag: "🇨🇳", dir: "ltr" },
  ar: { name: "العربية", flag: "🇸🇦", dir: "rtl" },
  hi: { name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  en: { name: "English", flag: "🇺🇸", dir: "ltr" },
  es: { name: "Español", flag: "🇪🇸", dir: "ltr" },
  bn: { name: "বাংলা", flag: "🇧🇩", dir: "ltr" },
  pt: { name: "Português", flag: "🇧🇷", dir: "ltr" },
  ru: { name: "Русский", flag: "🇷🇺", dir: "ltr" },
  ja: { name: "日本語", flag: "🇯🇵", dir: "ltr" },
  de: { name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  ko: { name: "한국어", flag: "🇰🇷", dir: "ltr" },
  fr: { name: "Français", flag: "🇫🇷", dir: "ltr" },
  jv: { name: "Javanese", flag: "🇮🇩", dir: "ltr" },
  it: { name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  tr: { name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
} as const;
