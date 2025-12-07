"use client";

import Banner from "./Banner";
import Footer from "./Footer";
import JobPost from "./JobPost";
import Registration from "./Registration";
import ServiceContent from "./ServiceContent";
import About from "./About";
import Navbar from "./Navbar";
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
