"use client";

import { useTranslations } from "next-intl";

export default function Team(){
    const t = useTranslations("employerProfileTeam");
    return(
        <>
            <div className="py-4">
                <div className="row">
                    <div className="col">
                        <div>
                            <h3 className="float-start"><strong>{t("title")}</strong></h3>
                            <span className="float-end text-primary"><strong>{t("seeAll", { count: 47 })}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 p-2">
                        <div className="border text-center">
                            <div >
                                <img src="/img/service/animated_guy.png" style={{width:'120px'}} alt="" />
                            </div>
                            <div>
                                {t("memberName")}
                                <br />
                                <span className="text-style" style={{fontSize:'12px'}}>{t("role")}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-2 p-2">
                        <div className="border text-center">
                            <div >
                                <img src="/img/service/animated_guy.png" style={{width:'120px'}} alt="" />
                            </div>
                            <div>
                                {t("memberName")}
                                <br />
                                <span className="text-style" style={{fontSize:'12px'}}>{t("role")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-2">
                        <div className="border text-center">
                            <div >
                                <img src="/img/service/animated_guy.png" style={{width:'120px'}} alt="" />
                            </div>
                            <div>
                                {t("memberName")}
                                <br />
                                <span className="text-style" style={{fontSize:'12px'}}>{t("role")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-2">
                        <div className="border text-center">
                            <div >
                                <img src="/img/service/animated_guy.png" style={{width:'120px'}} alt="" />
                            </div>
                            <div>
                                {t("memberName")}
                                <br />
                                <span className="text-style" style={{fontSize:'12px'}}>{t("role")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-2">
                        <div className="border text-center">
                            <div >
                                <img src="/img/service/animated_guy.png" style={{width:'120px'}} alt="" />
                            </div>
                            <div>
                                {t("memberName")}
                                <br />
                                <span className="text-style" style={{fontSize:'12px'}}>{t("role")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-2">
                        <div className="border text-center">
                            <div >
                                <img src="/img/service/animated_guy.png" style={{width:'120px'}} alt="" />
                            </div>
                            <div>
                                {t("memberName")}
                                <br />
                                <span className="text-style" style={{fontSize:'12px'}}>{t("role")}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </>
    )
}