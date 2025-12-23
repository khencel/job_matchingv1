"use client"
import AppliedJobs from "@/components/jobSeekerDashboard/AppliedJobs";
import { Tab } from "react-bootstrap";

export default function AppliedJobsPage() {
  return (
      <Tab.Pane eventKey="applied-jobs">
        <AppliedJobs />
      </Tab.Pane>
  );
}
