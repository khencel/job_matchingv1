"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegSuperVisoryStep3,
  goNextStep,
} from "@/redux/slices/register/super-visory/superVisorySlice";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import ContactPersonForm from "@/components/registration/supervisory/ContactPersonForm";
import { RegisterSuperVisoryStep3Data } from "@/types/super-visory";

export default function RegisterSuperVisoryStep3() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerSupervisoryStep3");
  const contactPersonInfo = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.contactPersonInfo
  );

  const handleSubmit = (data: RegisterSuperVisoryStep3Data) => {
    dispatch(saveRegSuperVisoryStep3(data));
    Swal.fire({
      icon: "success",
      title: t("messages.success"),
      text: t("messages.contactPersonSaved"),
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(goNextStep(4));
  };

  return (
    <ContactPersonForm
      initialValues={contactPersonInfo}
      onSubmit={handleSubmit}
    />
  );
}
