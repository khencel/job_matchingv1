"use client";

import { useTranslations } from "next-intl";
import StatusActivity from "./status_activity"
import Chart from "./chart"
import RecentActivity from "./recentActivity"
import RecentPostJob from "./recentPostJob"


export default function Overview(){
    const t = useTranslations("employerOverview");
    return(
        <>
            <strong>{t("greeting")}</strong>
            <br />
            <small>{t("subtitle")}</small>
            <br />
            <StatusActivity />
               
            <div className="row">
                <div className="col-md-8 border p-3 rounded-3">
                    <Chart />
                </div>
                <div className="col-md-4">
                    <RecentActivity />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <RecentPostJob />
                </div>
            </div>
        </>
    )
}