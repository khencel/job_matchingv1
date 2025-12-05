"use client";

import Banner from "./components/Banner";
import Footer from "./components/Footer";
import JobPost from "./components/JobPost";
import Registration from "./components/Registration";
import ServiceContent from "./components/ServiceContent";
import About from "./components/About";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import "animate.css";

export default function HomePage() {
  useEffect(() => {
    (async () => {
      const WOW = (await import("wowjs")).default;
      new WOW.WOW({ live: false }).init();
    })();
  }, []);

  return (
    <div>
      <Banner />
      <hr className="mt-5 w-75 mx-auto" />
      <Registration />
      <ServiceContent />
      <hr className="mt-5 w-75 mx-auto" />
      <JobPost />
      <hr className="mt-5 w-75 mx-auto" />
      <About />
      <Footer />
    </div>
  );
}
