import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "../../components/NavbarAuth";
import Footer from "@/components/Footer";


import Sidebar from "../admin/sidebar";
import StoreProvider from "../../StoreProvider";
import NextIntlProvider from "@/i18n/NextIntlProvider";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import "../../../../public/css/employer/style.css"


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
    <>
      <StoreProvider>
        <NextIntlProvider locale={locale}>
          <BootstrapClient />
          <Navbar />

          <Sidebar>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
          </Sidebar>

          <Footer />
        </NextIntlProvider>
      </StoreProvider>
    </>
  );
}
