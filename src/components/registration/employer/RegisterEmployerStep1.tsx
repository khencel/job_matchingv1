"use client";

import {
  saveRegEmployerStep1,
  goNextStep,
} from "@/redux/slices/register/employer/employerSlice";
import Step1Register from "../Step1Register";
import { isEmailExistThunk } from "@/redux/slices/register/job-seeker/jobSeekerThunk";

export default function RegisterEmployerStep1() {
  return (
    <div>
      <Step1Register
        selector={(state) =>
          state.registerEmployer.registerEmployerData.accountInfo
        }
        saveAction={saveRegEmployerStep1}
        goNextStepAction={goNextStep}
        checkEmail={isEmailExistThunk}
      />
    </div>
  );
}
