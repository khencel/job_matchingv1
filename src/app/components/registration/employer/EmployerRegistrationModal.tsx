import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Modal } from "react-bootstrap";

import RegisterEmployerStep1 from "./forms/RegisterEmployer-Step1";
import RegisterEmployerStep2 from "./forms/RegisterEmployer-Step2";
import RegisterEmployerStep3 from "./forms/RegisterEmployer-Step3";
import RegisterEmployerStep4 from "./forms/RegisterEmployer-Step4";
import { ArrowLeft, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { goBack } from "@/redux/slices/register/employerSlice";
import ProgressStepCount from "../../ProgressStepCount";

interface EmployerRegistrationModalProps {
  show: boolean;
  onHide: () => void;
}

export default function EmployerRegistrationModal({
  show,
  onHide,
}: EmployerRegistrationModalProps) {
  const dispatch = useAppDispatch();
  // i18n: translations for Employer registration UI
  const t = useTranslations("employerRegistrationModal");
  const currentStep = useAppSelector(
    (state) => state.registerEmployer.currentStep
  );

  const renderRegisterForms = () => {
    switch (currentStep) {
      case 1:
        return <RegisterEmployerStep1 />;
      case 2:
        return <RegisterEmployerStep2 />;
      case 3:
        return <RegisterEmployerStep3 />;
      case 4:
        return <RegisterEmployerStep4 closeModal={onHide} />;
    }
  };

  return (
    <Modal
      {...{ show, onHide }}
      backdrop="static"
      keyboard={false}
      size="md"
      className=""
    >
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
        <Button className="float-end" variant="muted" onClick={onHide}>
          <XIcon />
        </Button>
      </Modal.Header>

      <Modal.Title className="text-center fw-bold mb-3 mt-2">
        <h3 className="mb-3 fw-bold">{t("title")}</h3>
        <ProgressStepCount currentStep={currentStep} stepCount={[1, 2, 3, 4]} />
      </Modal.Title>

      <Modal.Body className="border-0 px-5">{renderRegisterForms()}</Modal.Body>
    </Modal>
  );
}
