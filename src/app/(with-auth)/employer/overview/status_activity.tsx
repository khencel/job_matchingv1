"use client";

import { useTranslations } from "next-intl";

export default function StatusActivity(){
    const t = useTranslations("employerOverview");

    return (
        <div className="row">
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.totalUsers")}</strong></span>
                    <br />
                    <br />
                    <h3>1,240</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.activeJobs")}</strong></span>
                    <br />
                    <br />
                    <h3>8</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.interviews")}</strong></span>
                    <br />
                    <br />
                    <h3>14</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.companies")}</strong></span>
                    <br />
                    <br />
                    <h3>6</h3>
                </div>
            </div>
        </div>
    )
}