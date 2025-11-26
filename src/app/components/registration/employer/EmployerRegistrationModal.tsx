import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Modal } from "react-bootstrap";

import RegisterEmployerStep1 from "./forms/RegisterEmployer-Step1";
import RegisterEmployerStep2 from "./forms/RegisterEmployer-Step2";
import RegisterEmployerStep3 from "./forms/RegisterEmployer-Step3";
import RegisterEmployerStep4 from "./forms/RegisterEmployer-Step4";
import { ArrowLeft, XIcon } from "lucide-react";
import { goBack } from "@/redux/slices/registerEmployerSlice";
import ProgressStepCount from "../../ProgressStepCount";

interface EmployerRegistrationModalProps {
  show: boolean;
  onHide: () => void;
}

export default function EmployerRegistrationModal(
  props: EmployerRegistrationModalProps
) {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.registerEmployer.currentStep
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <RegisterEmployerStep1 />;
      case 2:
        return <RegisterEmployerStep2 />;
      case 3:
        return <RegisterEmployerStep3 />;
      case 4:
        return <RegisterEmployerStep4 closeModal={props.onHide} />;
    }
  };

  return (
    <Modal {...props} backdrop="static" keyboard={false} size="md">
      <Modal.Header
        className={`d-flex align-items-center border-0 ${
          currentStep !== 1 ? "justify-content-between" : "justify-content-end"
        } `}
        closeButton={false}
      >
        {currentStep !== 1 && (
          <Button variant="muted" onClick={() => dispatch(goBack())}>
            <ArrowLeft />
          </Button>
        )}
        <Button className="float-end" variant="muted" onClick={props.onHide}>
          <XIcon />
        </Button>
      </Modal.Header>

      <Modal.Title className="text-center fw-bold mb-3 mt-2">
        <h3 className="mb-3 fw-bold">Employer Registration</h3>
        <ProgressStepCount currentStep={currentStep} stepCount={[1, 2, 3, 4]} />
      </Modal.Title>

      <Modal.Body className="border-0 px-5">{renderStepContent()}</Modal.Body>
    </Modal>
  );
}
