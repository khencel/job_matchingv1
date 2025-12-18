"use client";

import {
  saveRegEmployerStep1,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import Step1Register from "../Step1Register";

export default function RegisterEmployerStep1() {
  return (
    <div>
      <Step1Register
        selector={(state) =>
          state.registerEmployer.registerEmployerData.accountInfo
        }
        saveAction={saveRegEmployerStep1}
        goNextStepAction={goNextStep}
      />
    </div>
  );
}
