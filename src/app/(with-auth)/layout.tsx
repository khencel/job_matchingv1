import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../public/css/app.css";
import "../../../public/css/filter.css";

import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "../components/NavbarAuth";
import Footer from "@/components/Footer";
import Sidebar from "../components/sidebar";
import StoreProvider from "../StoreProvider";
import NextIntlProvider from "@/i18n/NextIntlProvider";
import { cookies } from "next/headers";

export const metadata = {
  title: "Next.js",
  description: "A job matching application built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as
    | "en"
    | "ja"
    | undefined;

  const locale: "en" | "ja" = cookieLocale === "ja" ? "ja" : "en";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StoreProvider>
          <NextIntlProvider locale={locale}>
            <BootstrapClient />
            <Navbar />

            <Sidebar>
              {children}
            </Sidebar>

            <Footer />
          </NextIntlProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
