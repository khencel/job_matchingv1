"use client";

// Centralized provider for next-intl
// Loads message catalogs based on the current locale and exposes translations to the app.
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import en from "./messages/en.json";
import ja from "./messages/ja.json";

export type SupportedLocale = "en" | "ja";

// Map locales to loaded messages (extend when adding new locales)
// Use AbstractIntlMessages to allow nested message objects
const MESSAGES: Record<SupportedLocale, AbstractIntlMessages> = {
  en,
  ja,
};

export default function NextIntlProvider({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: SupportedLocale;
}) {
  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={MESSAGES[locale]}
      timeZone="Asia/Tokyo"
    >
      {children}
    </NextIntlClientProvider>
  );
}
