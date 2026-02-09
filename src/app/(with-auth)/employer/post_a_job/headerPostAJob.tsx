"use client";

import { useTranslations } from "next-intl";
import { BiArrowBack } from "react-icons/bi";
import { FaBriefcase, FaFileInvoice, FaGift} from "react-icons/fa6";

export default function HeaderPostAJob(){
    const t = useTranslations("employerPostJobHeader");
    return(
        <>
            <div className="emp-component-style">
                <div className="row">
                    <div className="col ">
                        <h5><strong><BiArrowBack /> {t("title")}</strong></h5>
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
                                    <div className="primary-text"><small>{t("step1")}</small></div>
                                    <div>
                                        <small>
                                            <strong>{t("step1Title")}</strong>
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
                                    <div className="primary-text"><small>{t("step2")}</small></div>
                                    <div>
                                        <small>
                                            <strong>{t("step2Title")}</strong>
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
                                    <div className="primary-text"><small>{t("step3")}</small></div>
                                    <div>
                                        <small>
                                            <strong>{t("step3Title")}</strong>
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