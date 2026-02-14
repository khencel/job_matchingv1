"use client";

import Spinner from 'react-bootstrap/Spinner';
import { useTranslations } from "next-intl";

function SpinnerComponent() {
  const t = useTranslations("spinner");
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{t("loading")}</span>
    </Spinner>
  );
}

export default SpinnerComponent;