"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobSeekerProfile from "@/components/jobSeekerProfile/JobSeekerProfile";

const JobSeekerProfilePage = () => {
  return (
    <div>
      <Navbar />
      <JobSeekerProfile />
      <Footer />
    </div>
  );
};

export default JobSeekerProfilePage;
