import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../public/css/login/app.css";
import "../../public/css/app.css";
import "../../public/css/global.css";
import BootstrapClient from "@/components/BootstrapClient";
import NextIntlProvider from "@/i18n/NextIntlProvider";
import { cookies } from "next/headers";
import StoreProvider from "./StoreProvider";
import AuthLoader from "@/components/auth/AuthLoader";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

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
            <BootstrapClient />
            <AuthLoader>
              {/* <Navbar/> */}
              {children}
              <ToastContainer
                  position="top-right"
                  autoClose={3000}
              />
              {/* <Footer /> */}
            </AuthLoader>
          </NextIntlProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
