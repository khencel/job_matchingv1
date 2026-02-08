import { useTranslations } from "next-intl";

export default function EmployerRegistration() {
  const t = useTranslations("registerEmployerPage");
  return <h1>{t("title")}</h1>;
}