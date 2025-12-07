"use client";

import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import JobPost from "../../components/JobPost";
import Registration from "../../components/Registration";
import ServiceContent from "../../components/ServiceContent";
import About from "../../components/About";
import Navbar from "@/components/Navbar";
import JobSearchFiler from "@/components/JobSearchFilter";

import "animate.css";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    (async () => {
      const { WOW } = await import("wowjs");
      new WOW({ live: false }).init();
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <JobSearchFiler />
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
