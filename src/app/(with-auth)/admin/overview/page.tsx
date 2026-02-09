import { useTranslations } from "next-intl";

export default function AdminOverviewPage() {
  const t = useTranslations("adminOverview");
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}