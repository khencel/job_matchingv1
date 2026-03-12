"use client";
import StatusActivity from "./status_activity"
import Chart from "./chart"
import RecentActivity from "./recentActivity"
import RecentPostJob from "./recentPostJob"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { totalNoUser } from "@/redux/slices/auth/genericAuthThunk";



export default function Overview(){
    const t = useTranslations("employerOverview");
    const dispatch = useAppDispatch();
    
    const [ stat , setStat ] = useState({
        total_users: 0,
        total_job_post: 0,
        total_applicant: 0,
        total_company: 0,
        chart_report: {
            current_year_data: [],
            previous_year_data: []
        }
    });

    console.log(stat);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const year = new Date().getFullYear();
            const result = await dispatch(totalNoUser(year));
            setStat(result.payload);
        }

        fetchData();
        
    },[dispatch])

    return(
        <>
            <strong>{t("greeting")}</strong>
            <br />
            <small>{t("subtitle")}</small>
            <br />
            <StatusActivity 
                setData={stat}
            />
               
            <div className="row">
                <div className="col border p-3 rounded-3">
                    <Chart chart_report={stat.chart_report} />
                </div>
                {/* <div className="col-md-4">
                    <RecentActivity />
                </div> */}
            </div>
            <div className="row mt-3">
                <div className="col">
                    {/* <RecentPostJob /> */}
                </div>
            </div>
        </>
    )
}