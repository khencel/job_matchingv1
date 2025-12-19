import {
  goNextStep,
  saveRegJobSeekerStep1,
} from "@/redux/slices/register/jobSeekerSlice";
import Step1Register from "../Step1Register";

const RegisterJobSeekerStep1 = () => {
  return (
    <div>
      <Step1Register
        selector={(state) =>
          state.registerJobSeeker.registerJobSeekerData.accountInfo
        }
        saveAction={saveRegJobSeekerStep1}
        goNextStepAction={goNextStep}
      />
    </div>
  );
};

export default RegisterJobSeekerStep1;
