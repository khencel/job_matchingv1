"use client";

import { GoDotFill } from "react-icons/go";
import { FaRegCircleCheck, FaUserGroup } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function RecentPostJob(){
    const t = useTranslations("employerOverview");

    return (
        <div className="">
            <div className="row">
                <div className="col">
                    <span className="float-start"><strong>{t("recentPostJobs.title")}</strong></span>
                    <span className="float-end">{t("recentPostJobs.viewAll")}</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead className="table-light thead_style_recent_jobs">
                            <tr>
                                <th>{t("recentPostJobs.table.jobs")}</th>
                                <th>{t("recentPostJobs.table.status")}</th>
                                <th>{t("recentPostJobs.table.applications")}</th>
                                <th>{t("recentPostJobs.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>UI/UX Designer</strong>
                                        <br />
                                        <small>{t("recentPostJobs.jobTypes.fullTime")} <GoDotFill /> {t("recentPostJobs.time.daysAgo", { count: 27 })}</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("recentPostJobs.status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("recentPostJobs.applicationsCount", { count: 798 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("recentPostJobs.buttons.viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Senior UX Designer</strong>
                                        <br />
                                        <small>{t("recentPostJobs.jobTypes.internship")} <GoDotFill /> {t("recentPostJobs.time.daysAgo", { count: 8 })}</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("recentPostJobs.status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("recentPostJobs.applicationsCount", { count: 307 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("recentPostJobs.buttons.viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Technical Support Specialist</strong>
                                        <br />
                                        <small>{t("recentPostJobs.jobTypes.partTime")} <GoDotFill /> {t("recentPostJobs.time.daysAgo", { count: 4 })}</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("recentPostJobs.status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("recentPostJobs.applicationsCount", { count: 109 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("recentPostJobs.buttons.viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Junior Graphic Designer</strong>
                                        <br />
                                        <small>{t("recentPostJobs.jobTypes.fullTime")} <GoDotFill /> {t("recentPostJobs.time.daysAgo", { count: 24 })}</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("recentPostJobs.status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("recentPostJobs.applicationsCount", { count: 200 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("recentPostJobs.buttons.viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Fron End Developer</strong>
                                        <br />
                                        <small>{t("recentPostJobs.jobTypes.fullTime")} <GoDotFill /> {t("recentPostJobs.time.date", { date: "Dec 7, 2025" })}</small>
                                    </div>
                                </td>
                                <td>
                                    {/* <span className="status_text"><FaRegCircleCheck /> Active</span> */}
                                    <span className="status_text_expired"><FaRegTimesCircle /> {t("recentPostJobs.status.expired")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("recentPostJobs.applicationsCount", { count: 70 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("recentPostJobs.buttons.viewApplications")}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}