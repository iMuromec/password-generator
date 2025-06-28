"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const locales = [
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "jv", name: "Javanese", flag: "🇮🇩" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Получаем путь без текущей локали
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    // Переходим на новую локаль
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const currentLocaleData = locales.find((l) => l.code === currentLocale);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2">
        <Globe className="w-4 h-4 text-white" />
        <select
          value={currentLocale}
          onChange={(e) => switchLanguage(e.target.value)}
          className="bg-transparent text-white text-sm border-none outline-none appearance-none cursor-pointer"
        >
          {locales.map((locale) => (
            <option
              key={locale.code}
              value={locale.code}
              className="bg-gray-800"
            >
              {locale.flag} {locale.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
