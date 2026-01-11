import {
  goNextStep,
  saveRegJobSeekerStep1,
} from "@/redux/slices/register/job-seeker/jobseekerSlice";
import Step1Register from "../Step1Register";
import { isEmailExistThunk } from "@/redux/slices/register/job-seeker/jobSeekerThunk";

const RegisterJobSeekerStep1 = () => {
  return (
    <div>
      <Step1Register
        selector={(state) =>
          state.registerJobSeeker.registerJobSeekerData.accountInfo
        }
        saveAction={saveRegJobSeekerStep1}
        goNextStepAction={goNextStep}
        checkEmail={isEmailExistThunk}
      />
    </div>
  );
};

export default RegisterJobSeekerStep1;
