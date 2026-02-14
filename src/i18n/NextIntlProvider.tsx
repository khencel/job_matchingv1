"use client";

// Centralized provider for next-intl
// Loads message catalogs based on the current locale and exposes translations to the app.
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import en from "./messages/en";
import ja from "./messages/ja";

export type SupportedLocale = "en" | "ja";

// Map locales to loaded messages (extend when adding new locales)
// Allow string arrays for list-style values inside message catalogs.
type AppIntlMessages = {
  [key: string]: string | AppIntlMessages | string[] | object[];
};

const MESSAGES: Record<SupportedLocale, AppIntlMessages> = {
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
      messages={MESSAGES[locale] as AbstractIntlMessages}
      timeZone="Asia/Tokyo"
    >
      {children}
    </NextIntlClientProvider>
  );
}
