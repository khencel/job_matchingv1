"use client";

import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import JobPost from "../../components/JobPost";
import ServiceContent from "../../components/ServiceContent";
import About from "../../components/About";
import Navbar from "@/components/Navbar";
import JobSearchFiler from "@/components/JobSearchFilter";
import Registration from "../../components/registration/Registration";
import "animate.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { showAllJobs } from "@/redux/slices/employer/post_a_job/jobListingThunk";



export default function HomePage() {

  const {items} = useSelector((state:RootState) => state.jobListing)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showAllJobs());
  }, []);

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
      <JobPost data={items} />
      <hr className="mt-5 w-75 mx-auto" />
      <About />
      <Footer />
    </div>
  );
}
