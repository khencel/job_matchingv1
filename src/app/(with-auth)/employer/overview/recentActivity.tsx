"use client";

import { useTranslations } from "next-intl";

export default function RecentActivity(){
    const t = useTranslations("employerOverviewRecentActivity");
    return (
        <div className="border p-2">
            <h4>{t("title")}</h4>
            <div className="row">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("items.item1")}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("items.item2")}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("items.item3")}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("items.item4")}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <button className="btn btn-primary-custom w-100">{t("viewAll")}</button>
                </div>
            </div>
        </div>
    )
}