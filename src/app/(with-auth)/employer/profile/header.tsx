"use client";

import FormattedDate from "@/components/date_format";
import EditModalProfile from "./editModal";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Header({data}:{data:any}){
    const t = useTranslations("employerProfileHeader");

    const [showModal, setShowModal] = useState(false);
    
    const handleEditModal = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const companyInfo = data.userDetails_emp?.company_information || {};

    console.log(companyInfo.company_industry);
    
    return(
        <>
            <div className="" style={{
                                        backgroundImage: `linear-gradient(rgba(162, 162, 162, 0.4), rgba(255, 255, 255, 0.85)), url(${data.banner})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}>
                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <img src={data.avatar || 'http://127.0.0.1:8000/media/avatar/default_logo.png'} style={{width:'150px'}} alt="" />
                            </div>
                            <div className="col-9">
                                <div className="">
                                    <strong className="text-white"><h2>{t("title")}</h2></strong>
                                    <br />
                                    <span className="text-primary">{companyInfo.name}</span>
                                    <br />
                                    <span className="text-primary">{data.email}</span>
                                    <br />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <small className="text-style">{t("founded")}</small>
                                        <br />
                                        <strong className="info-style"><FormattedDate date={companyInfo.founded}/></strong>
                                    </div>
                                    <div className="col">
                                        <small className="text-style">{t("employees")}</small>
                                        <br />
                                        <strong className="info-style">{companyInfo.no_of_emp}</strong>
                                    </div>
                                    <div className="col">
                                        <small className="text-style">{t("location")}</small>
                                        <br />
                                        <strong className="info-style">{companyInfo.region}</strong>
                                    </div>
                                    <div className="col">
                                        <small className="text-style">{t("industry")}</small>
                                        <br />
                                        <strong className="info-style">{companyInfo.company_industry.join(', ')}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-center">
                        <button className="btn btn-primary-custom rounded-3" onClick={handleEditModal}>{t("editProfile")}</button>
                    </div>
                </div>
            </div>
            <EditModalProfile handleShow={showModal} handleClose={handleClose} companyProfile={data} />
        </>
    )
}