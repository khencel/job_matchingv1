"use client";

import { useTranslations } from "next-intl";

export default function Filter(){
    const t = useTranslations("jobListFilter");

    return (
        <>
            <div className="p-3 border filter-cont">
                <div>
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <span className="primary-text fw-bold">{t("sections.jobType.title")}</span>
                        <span className="text-danger"><small>{t("sections.jobType.clearAll")}</small></span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("sections.jobType.options.fullTime")}</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>{t("sections.jobType.options.partTime")}</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>{t("sections.jobType.options.contractTemp")}</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>{t("sections.jobType.options.casualVacation")}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                        <span className="primary-text fw-bold">{t("sections.workSetup.title")}</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("sections.workSetup.options.onSite")}</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("sections.workSetup.options.hybrid")}</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("sections.workSetup.options.remote")}</span>
                    </div>
                </div>
            </div>
        </>
    )
}