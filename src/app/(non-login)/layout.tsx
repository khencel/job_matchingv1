import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Next.js Job Matching",
  description: "A job matching application built with Next.js",
};

export default async function NonLoginRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
