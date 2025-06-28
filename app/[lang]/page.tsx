import PasswordGenerator from "../../components/password-generator";
import { getDictionary } from "./dictionaries";
import { type Locale } from "@/lib/locales";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta?.title,
    description: dict.meta?.description,
    keywords: dict.meta?.keywords,
    alternates: {
      canonical: `/${lang}`,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Password Generator",
  description:
    "Online tool for creating secure passwords with customizable parameters",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Password length customization",
    "Character type selection",
    "Password strength checking",
    "Quick copying",
    "Readable passwords",
  ],
  author: {
    "@type": "Organization",
    name: "Password Generator",
  },
};

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PasswordGenerator dict={dict} currentLocale={lang} />
    </>
  );
}
