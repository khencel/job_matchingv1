"use client";

import { useTranslations } from "next-intl";


interface Props {
    setData: {
        total_users?: number;
        total_job_post?: number;
        total_applicant?: number;
        total_company?: number;
    }
}


export default function StatusActivity({setData}:Props){
    const t = useTranslations("employerOverview");
    console.log(setData);
    
    return (
        <div className="row">
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.totalUsers")}</strong></span>
                    <br />
                    <br />
                    <h3>{setData?.total_users?.toLocaleString() ?? 0}</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.activeJobs")}</strong></span>
                    <br />
                    <br />
                    <h3>{setData?.total_job_post?.toLocaleString() ?? 0}</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.interviews")}</strong></span>
                    <br />
                    <br />
                    <h3>{setData?.total_applicant?.toLocaleString() ?? 0}</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>{t("statusActivity.companies")}</strong></span>
                    <br />
                    <br />
                    <h3>{setData?.total_company?.toLocaleString() ?? 0}</h3>
                </div>
            </div>
        </div>
    )
}