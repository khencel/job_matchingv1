"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

const UnauthorizedPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home or login page after a few seconds
    const timer = setTimeout(() => {
      router.push("/"); // Change this to your desired redirect path
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className=" vh-100">
      <Card className="text-center p-5 text-white rounded m-5 bg-dark bg-gradient">
        <Image
          src="/logo.png"
          alt="Logo"
          width={400}
          height={100}
          className="mx-auto"
        ></Image>
        <h1 className="display-4 text-white">Unauthorized Access</h1>
        <p className="lead text-white">
          You do not have permission to view this page.
        </p>
        <p>Redirecting you to the home page...</p>
        <Spinner
          animation="border"
          role="status"
          className="mt-3 mx-auto"
        ></Spinner>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
