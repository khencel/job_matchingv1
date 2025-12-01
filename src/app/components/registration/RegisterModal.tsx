import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Modal } from "react-bootstrap";

import RegisterEmployerStep1 from "./employer/RegisterEmployerStep1";
import RegisterEmployerStep2 from "./employer/RegisterEmployerStep2";
import RegisterEmployerStep3 from "./employer/RegisterEmployerStep3";
import RegisterEmployerStep4 from "./employer/RegisterEmployerStep4";
import { ArrowLeft, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { goBack as goBackEmployer } from "@/redux/slices/register/employerSlice";
import { goBack as goBackSuperVisory } from "@/redux/slices/register/superVisorySlice";
import ProgressStepCount from "../ProgressStepCount";
import RegisterSuperVisoryStep1 from "./supervisory/RegisterSuperVisoryStep1";
import RegisterSupervisoryStep2 from "./supervisory/RegisterSupervisoryStep2";
import RegisterSuperVisoryStep3 from "./supervisory/RegisterSuperVisoryStep3";
import RegisterSuperVisoryStep4 from "./supervisory/RegisterSuperVisoryStep4";
import RegisterJobSeekerStep1 from "./jobSeeker/RegisterJobSeekerStep1";
import RegisterJobSeekerStep2 from "./jobSeeker/RegisterJobSeekerStep2";
import RegisterJobSeekerStep3 from "./jobSeeker/RegisterJobSeekerStep3";

interface RegistrationModalProps {
  show: boolean;
  onHide: () => void;
  formType: "employer" | "jobSeeker" | "superVisory";
}

export default function RegistrationModal({
  show,
  onHide,
  formType,
}: RegistrationModalProps) {
  const dispatch = useAppDispatch();

  const t = useTranslations("registrationModal");
  const renderTitle = () => {
    if (formType === "employer") return t("title.employer");
    if (formType === "jobSeeker") return t("title.jobSeeker");
    if (formType === "superVisory") return t("title.supervisory");
  };

  const currentStep = useAppSelector((state) => {
    if (formType === "employer") return state.registerEmployer.currentStep;
    if (formType === "superVisory")
      return state.registerSuperVisory.currentStep;
    return 1; // jobSeeker default
  });

  const handleFormRender = () => {
    if (formType === "employer") {
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
    }

    if (formType === "jobSeeker") {
      switch (currentStep) {
        case 1:
          return <RegisterJobSeekerStep1 />;
        case 2:
          return <RegisterJobSeekerStep2 />;
        case 3:
          return <RegisterJobSeekerStep3 />;
      }
    }

    if (formType === "superVisory") {
      switch (currentStep) {
        case 1:
          return <RegisterSuperVisoryStep1 />;
        case 2:
          return <RegisterSupervisoryStep2 />;
        case 3:
          return <RegisterSuperVisoryStep3 />;
        case 4:
          return <RegisterSuperVisoryStep4 closeModal={onHide} />;
      }
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
          <Button
            variant="muted"
            onClick={() => {
              if (formType === "employer") dispatch(goBackEmployer());
              if (formType === "superVisory") dispatch(goBackSuperVisory());
            }}
          >
            <ArrowLeft />
          </Button>
        )}
        <Button className="float-end" variant="muted" onClick={onHide}>
          <XIcon />
        </Button>
      </Modal.Header>

      <Modal.Title className="text-center fw-bold mb-3 mt-2">
        <h3 className="mb-3 fw-bold">{renderTitle()}</h3>
        <ProgressStepCount
          currentStep={currentStep}
          stepCount={formType === "jobSeeker" ? [1, 2, 3] : [1, 2, 3, 4]}
        />
      </Modal.Title>

      <Modal.Body className="border-0 px-5">{handleFormRender()}</Modal.Body>
    </Modal>
  );
}
