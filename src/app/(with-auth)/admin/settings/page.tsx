import { useTranslations } from "next-intl";

export default function AdminSetting(){
    const t = useTranslations("sidebar");
    return (
        <>
            <h1>{t("settings")}</h1>
        </>
    )
}