"use client";

import { useTranslations } from "next-intl";

export default function Filter(){
    const t = useTranslations("jobListFilter");
    return (
        <>
            <div className="p-3 border filter-cont">
                <div>
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <span className="primary-text fw-bold">{t("jobType")}</span>
                        <span className="text-danger"><small>{t("clearAll")}</small></span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("types.fullTime")}</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>{t("types.partTime")}</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>{t("types.contractTemp")}</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>{t("types.casualVacation")}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                        <span className="primary-text fw-bold">{t("workSetup")}</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("setups.onSite")}</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("setups.hybrid")}</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>{t("setups.remote")}</span>
                    </div>
                </div>
            </div>
        </>
    )
}