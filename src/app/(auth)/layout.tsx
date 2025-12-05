
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../public/css/login/app.css"
import "../../../public/css/app.css"

export const metadata = {
  title: 'Next.js',
  description: 'A job matching application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}