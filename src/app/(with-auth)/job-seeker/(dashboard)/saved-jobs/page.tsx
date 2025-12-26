"use client"
import SavedJobs from "@/components/jobSeekerDashboard/SavedJobs";
import { Tab } from "react-bootstrap";

const SavedJobsPage = () => {
  return (
    <div>
      <Tab.Pane eventKey="saved-jobs">
        <SavedJobs />
      </Tab.Pane>
    </div>
  );
};

export default SavedJobsPage;
