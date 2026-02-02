"use client";

import { useTranslations } from "next-intl";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import JobPost from "../../components/JobPost";
import ServiceContent from "../../components/ServiceContent";
import About from "../../components/About";
import Navbar from "@/components/navbar/Navbar";
import JobSearchFiler from "@/components/JobSearchFilter";
import Registration from "../../components/registration/Registration";
import "animate.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import JobSupportFeatures from "./jobSupportFeatures";
import QASection from "./qAndA";
import ContactUs from "./contactUs";


export default function HomePage() {
  const t = useTranslations("mainPage");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    
    const cookie = Cookies.get("access");
    if (cookie) {
      setHasAccess(true);
    }

   
    (async () => {
      const { WOW } = await import("wowjs");
      new WOW({ live: false }).init();
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <JobSearchFiler/>
      <Banner />
      <hr className="mt-5 w-75 mx-auto" />

      
      {!hasAccess && <Registration />}

      <ServiceContent />
      <hr className="mt-5 w-75 mx-auto" />
      <JobPost />
      <hr className="mt-5 w-75 mx-auto" />
      <About />
      <JobSupportFeatures />
      <QASection />
      <ContactUs />
      <hr className="mt-5 w-75 mx-auto" />
      <Footer />
    </div>
  );
}
