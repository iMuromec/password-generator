import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/locales";

function getLocale(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocaleFromRequest(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

function getLocaleFromRequest(request: NextRequest) {
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    for (const locale of preferredLocales) {
      // Check exact match
      if (locales.includes(locale as any)) {
        return locale;
      }

      // Check partial match (e.g., 'en-US' -> 'en')
      const shortLocale = locale.split("-")[0];
      if (locales.includes(shortLocale as any)) {
        return shortLocale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  return getLocale(request);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|placeholder).*)",
  ],
};
