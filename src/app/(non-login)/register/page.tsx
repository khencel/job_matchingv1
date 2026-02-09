import { useTranslations } from "next-intl";

export default function Register() {
  const t = useTranslations("register");
  return <h1>{t("title")}</h1>;
}