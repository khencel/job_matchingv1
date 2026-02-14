"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "../../components/Footer";
import { useTranslations } from "next-intl";

export default function LegalNotice() {
    const t = useTranslations("legalNotice");
    return (
        <>
            <Navbar />
            <div>
                <div className="legal-notice-container shadow rounded-5 mt-3 mb-3" style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
                    <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{t("heading")}</h3>
                    <section>
                        <strong><h3>{t("subheading")}</h3></strong>
                        <p>{t("intro")}</p>
                    </section>

                    <section>
                        <strong>{t("companyProfile.title")}</strong>
                        <br />
                        {t("companyProfile.companyNameLabel")} {t("companyProfile.companyNameValue")}
                        <br />
                        {t("companyProfile.serviceNameLabel")} {t("companyProfile.serviceNameValue")}
                        <br />
                        {t("companyProfile.addressLabel")} {t("companyProfile.addressValue")}
                        <br />
                        {t("companyProfile.representativeLabel")} {t("companyProfile.representativeValue")}
                        <br />
                        {t("companyProfile.businessLabel")} {t("companyProfile.businessValue")}
                    </section>



                    <br />
                    <strong>{t("serviceNature.title")}</strong>
                    <section style={{ marginBottom: "1.5rem" }}>
                        <ol>
                            <li>{t("serviceNature.items.whatWeProvide.title")}</li>
                            <p>{t("serviceNature.items.whatWeProvide.description")}</p>
                            <li>{t("serviceNature.items.notPartyToContracts.title")}</li>
                            <p>{t("serviceNature.items.notPartyToContracts.description")}</p>
                            <li>{t("serviceNature.items.placementFees.title")}</li>
                            <p>{t("serviceNature.items.placementFees.description")}</p>
                            <p>{t("serviceNature.items.placementFees.note")}</p>
                            <li>{t("serviceNature.items.limitationOfLiability.title")}</li>
                            <ul>
                                <li>{t("serviceNature.items.limitationOfLiability.bullets.0")}</li>
                                <li>{t("serviceNature.items.limitationOfLiability.bullets.1")}</li>
                                <li>{t("serviceNature.items.limitationOfLiability.bullets.2")}</li>
                            </ul>
                        </ol>
                    
                    </section>


                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>{t("compliance.title")}</strong>
                        <br />
                        <br />
                        {t("compliance.intro")}
                        <ul>
                            <li>{t("compliance.bullets.0")}</li>
                            <li>{t("compliance.bullets.1")}</li>
                            <li>{t("compliance.bullets.2")}</li>
                            <li>{t("compliance.bullets.3")}</li>
                            <li>{t("compliance.bullets.4")}</li>
                        </ul>
                        
                    </section>


                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>{t("personalInfo.title")}</strong>
                        <br />
                        <br />
                        <ol>
                            <li>{t("personalInfo.dataWeCollect.title")}</li>
                            <ul>
                                <li>{t("personalInfo.dataWeCollect.bullets.0")}</li>
                                <li>{t("personalInfo.dataWeCollect.bullets.1")}</li>
                                <li>{t("personalInfo.dataWeCollect.bullets.2")}</li>
                                <li>{t("personalInfo.dataWeCollect.bullets.3")}</li>
                            </ul>
                            <li>{t("personalInfo.purposesOfUse.title")}</li>
                            <ul>
                                <li>{t("personalInfo.purposesOfUse.bullets.0")}</li>
                                <li>{t("personalInfo.purposesOfUse.bullets.1")}</li>
                                <li>{t("personalInfo.purposesOfUse.bullets.2")}</li>
                                <li>{t("personalInfo.purposesOfUse.bullets.3")}</li>
                            </ul>
                            <li>{t("personalInfo.sharing.title")}</li>
                            <p>{t("personalInfo.sharing.description")}</p>
                            <li>{t("personalInfo.retention.title")}</li>
                            <p>{t("personalInfo.retention.description")}</p>
                            <li>{t("personalInfo.requests.title")}</li>
                            <p>{t("personalInfo.requests.description")}</p>
                        </ol>
                        
                    </section>


                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>{t("security.title")}</strong>
                        <br />
                        <br />
                        {t("security.intro")}
                        <ul>
                            <li>{t("security.bullets.0")}</li>
                            <li>{t("security.bullets.1")}</li>
                            <li>{t("security.bullets.2")}</li>
                            <li>{t("security.bullets.3")}</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>{t("cookies.title")}</strong>
                        <br />
                        <br />
                        <p>{t("cookies.description")}</p>
                    </section>

                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>{t("disclaimer.title")}</strong>
                        <br />
                        <br />
                        <ol>
                            <li>{t("disclaimer.items.noWarranty.title")}</li>
                            <p>{t("disclaimer.items.noWarranty.description")}</p>
                            <li>{t("disclaimer.items.disputesDamages.title")}</li>
                            <p>{t("disclaimer.items.disputesDamages.description")}</p>
                            <li>{t("disclaimer.items.serviceSuspension.title")}</li>
                            <p>{t("disclaimer.items.serviceSuspension.description")}</p>
                        </ol>
                    </section>

                    
                </div>
            </div>
                
            <Footer />
        
        </>
        
    );
}
