"use client";

import { useTranslations } from "next-intl";
import { GoDotFill } from "react-icons/go";
import { FaRegCircleCheck, FaUserGroup } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";

export default function RecentPostJob(){
    const t = useTranslations("employerOverviewRecentPostJob");
    return (
        <div className="">
            <div className="row">
                <div className="col">
                    <span className="float-start"><strong>{t("title")}</strong></span>
                    <span className="float-end">{t("viewAll")}</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead className="table-light thead_style_recent_jobs">
                            <tr>
                                <th>{t("table.jobs")}</th>
                                <th>{t("table.status")}</th>
                                <th>{t("table.applications")}</th>
                                <th>{t("table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>{t("samples.uiUxDesigner")}</strong>
                                        <br />
                                        <small>
                                            {t("jobType.fullTime")} <GoDotFill /> {t("daysAgo", { days: 27 })}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("applications", { count: 798 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>{t("samples.seniorUxDesigner")}</strong>
                                        <br />
                                        <small>
                                            {t("jobType.internship")} <GoDotFill /> {t("daysAgo", { days: 8 })}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("applications", { count: 307 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>{t("samples.technicalSupportSpecialist")}</strong>
                                        <br />
                                        <small>
                                            {t("jobType.partTime")} <GoDotFill /> {t("daysAgo", { days: 4 })}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("applications", { count: 109 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>{t("samples.juniorGraphicDesigner")}</strong>
                                        <br />
                                        <small>
                                            {t("jobType.fullTime")} <GoDotFill /> {t("daysAgo", { days: 24 })}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> {t("status.active")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("applications", { count: 200 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("viewApplications")}</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>{t("samples.frontEndDeveloper")}</strong>
                                        <br />
                                        <small>
                                            {t("jobType.fullTime")} <GoDotFill /> {t("dateText", { date: t("samples.frontEndDate") })}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    {/* <span className="status_text"><FaRegCircleCheck /> Active</span> */}
                                    <span className="status_text_expired"><FaRegTimesCircle /> {t("status.expired")}</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> {t("applications", { count: 70 })}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">{t("viewApplications")}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}