import { isEmailExistThunk } from "@/redux/slices/register/super-visory/superVisoryThunk";
import {
  saveRegSuperVisoryStep1,
  goNextStep,
} from "../../../redux/slices/register/super-visory/superVisorySlice";
import Step1Register from "../Step1Register";

const RegisterSuperVisoryStep1 = () => {
  return (
    <div>
      <Step1Register
        selector={(state) =>
          state.registerSuperVisory.registerSuperVisoryData.accountInfo
        }
        saveAction={saveRegSuperVisoryStep1}
        goNextStepAction={goNextStep}
        checkEmail={isEmailExistThunk}
      />
    </div>
  );
};

export default RegisterSuperVisoryStep1;
