import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "../components/BootstrapClient";
import Navbar from "../components/Navbar";
import StoreProvider from "../StoreProvider";
import "../../../public/css/app.css"
import NextIntlProvider from "@/i18n/NextIntlProvider";
import { cookies } from "next/headers";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata = {
  title: "Next.js",
  description: "A job matching application built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine locale from cookie (NEXT_LOCALE) with fallback to 'en'
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as
    | "en"
    | "ja"
    | undefined;
  const locale: "en" | "ja" = cookieLocale === "ja" ? "ja" : "en";
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StoreProvider>
          <NextIntlProvider locale={locale}>
            {/* Bootstrap JS client features */}
            <BootstrapClient />
            {/* Global navigation */}
            <Navbar />
            {children}
          </NextIntlProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
