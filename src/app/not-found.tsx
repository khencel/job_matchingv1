import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}