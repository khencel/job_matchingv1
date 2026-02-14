"use client";

import { BiArrowBack } from "react-icons/bi";
import { FaBriefcase, FaFileInvoice, FaGift} from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function HeaderPostAJob(){
    const t = useTranslations("employerPostJobHeader");
    return(
        <>
            <div className="emp-component-style">
                <div className="row">
                    <div className="col ">
                        <h5><strong><BiArrowBack /> {t("heading")}</strong></h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <div className="row">
                                <div className="col-4">
                                    <div className="emp-icon-style d-flex justify-content-center align-items-center h-100">
                                        <FaBriefcase />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="primary-text"><small>{t("steps.step1.indicator")}</small></div>
                                    <div>
                                        <small>
                                            <strong>{t("steps.step1.title")}</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <div className="row">
                                <div className="col-4">
                                    <div className="emp-icon-style d-flex justify-content-center align-items-center h-100">
                                        <FaFileInvoice />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="primary-text"><small>{t("steps.step2.indicator")}</small></div>
                                    <div>
                                        <small>
                                            <strong>{t("steps.step2.title")}</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <div className="row">
                                <div className="col-4">
                                    <div className="emp-icon-style d-flex justify-content-center align-items-center h-100">
                                        <FaGift />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="primary-text"><small>{t("steps.step3.indicator")}</small></div>
                                    <div>
                                        <small>
                                            <strong>{t("steps.step3.title")}</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}