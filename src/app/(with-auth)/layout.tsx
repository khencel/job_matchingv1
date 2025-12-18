
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from '../components/BootstrapClient';
import Navbar from "../components/NavbarAuth";
import "../../../public/css/app.css";
import StoreProvider from "../StoreProvider";
import NextIntlProvider from "@/i18n/NextIntlProvider";
import { cookies } from "next/headers";
import "../../../public/css/app.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../public/css/filter.css"
import Footer from "../components/Footer";

export const metadata = {
  title: 'Next.js',
  description: 'A job matching application built with Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
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
          <Navbar/>
          {children}
          <Footer/>
          </NextIntlProvider>
        </StoreProvider>
        
      </body>
    </html>
  )
}