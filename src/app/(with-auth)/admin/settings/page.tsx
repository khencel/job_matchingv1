import { useTranslations } from "next-intl";

export default function AdminSetting() {
  const t = useTranslations("adminSettings");
  return <h1>{t("title")}</h1>;
}