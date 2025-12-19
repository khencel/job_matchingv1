import BasicInfo from "@/components/jobSeekerDashboard/resumeBuilder/BasicInfo";
import Education from "@/components/jobSeekerDashboard/resumeBuilder/Education";
import LanguageLevel from "@/components/jobSeekerDashboard/resumeBuilder/LanguageLevel";
import Skills from "@/components/jobSeekerDashboard/resumeBuilder/Skills";
import WorkExp from "@/components/jobSeekerDashboard/resumeBuilder/WorkExp";

const page = () => {
  return (
    <div>
      <BasicInfo />
      <Education />
      <LanguageLevel />
      <WorkExp />
      <Skills />
    </div>
  );
};

export default page;
