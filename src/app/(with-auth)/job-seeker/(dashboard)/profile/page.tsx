"use client";
import EditJobSeeker from "@/components/jobSeekerDashboard/ProfileJobSeeker";
import { Tab } from "react-bootstrap";

const JobSeekerProfilePage = () => {
  return (
      <Tab.Pane eventKey="job-seeker-profile">
        <EditJobSeeker />
      </Tab.Pane>
  );
};

export default JobSeekerProfilePage;
