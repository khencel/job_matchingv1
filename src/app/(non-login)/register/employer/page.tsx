"use client";

import { useTranslations } from "next-intl";

export default function EmployerRegistration (){
    const t = useTranslations("registrationEmployerPage");
    return (
        <>
            <h1>{t("title")}</h1>
        </>
    )
}