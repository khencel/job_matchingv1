import ReduxProvider from "./ReduxProvider";   
import { ToastContainer } from "react-toastify"; 

export const metadata = {
  title: "Next.js Job Matching",
  description: "A job matching application built with Next.js",
};

export default async function NonLoginRootLayout({
  children,
}: {
  children: React.ReactNode;
}){
    return (
        <html lang="en">
          <head>
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body>
            <ReduxProvider>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                />
            </ReduxProvider>    
          </body>
        </html>
    )
}