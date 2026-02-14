"use client";

import { useTranslations } from "next-intl";

export default function RecentActivity(){
    const t = useTranslations("employerOverview");

    return (
        <div className="border p-2">
            <h4>{t("recentActivity.title")}</h4>
            <div className="row">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("recentActivity.items.applied", { name: "Khenneth", role: "Web Developer" })}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("recentActivity.items.hired", { name: "Russel", role: "UI designer" })}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("recentActivity.items.applied", { name: "McAndrew", role: "Web Developer" })}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>{t("recentActivity.items.applied", { name: "McAndrew", role: "Full Stack Developer" })}</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <button className="btn btn-primary-custom w-100">{t("recentActivity.viewAll")}</button>
                </div>
            </div>
        </div>
    )
}