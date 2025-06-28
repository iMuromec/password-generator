import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getDictionary } from "./dictionaries";
import { locales, localeConfig, type Locale } from "@/lib/locales";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta?.title || `${dict.title}`,
    description: dict.meta?.description || "Secure password generator",
    keywords: dict.meta?.keywords || "password generator",
    alternates: {
      canonical: `/${lang}`,
    },
    openGraph: {
      title: dict.meta?.title || `${dict.title}`,
      description: dict.meta?.description || "Secure password generator",
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta?.title || `${dict.title}`,
      description: dict.meta?.description || "Secure password generator",
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const direction =
    localeConfig[lang as keyof typeof localeConfig]?.dir || "ltr";

  return (
    <html lang={lang} dir={direction}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
