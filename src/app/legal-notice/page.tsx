import Navbar from "@/components/navbar/Navbar";
import Footer from "../../components/Footer";
import { useTranslations } from "next-intl";

export default function LegalNotice() {
    const t = useTranslations("legalNotice");

    return (
        <div
            className="legal-notice-container"
            style={{
                padding: "2rem",
                maxWidth: "800px",
                margin: "0 auto",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                {t("title")}
            </h1>
            <section>
                <strong>
                    <h3>{t("intro.title")}</h3>
                </strong>
                <p>{t("intro.body")}</p>
            </section>

            <section>
                <strong>{t("companyProfile.title")}</strong>
                <br />
                {t("companyProfile.companyName")}
                <br />
                {t("companyProfile.serviceName")}
                <br />
                {t("companyProfile.address")}
                <br />
                {t("companyProfile.representative")}
                <br />
                {t("companyProfile.business")}
            </section>

            <br />
            <strong>{t("nature.title")}</strong>
            <section style={{ marginBottom: "1.5rem" }}>
                <ol>
                    <li>{t("nature.items.provides.title")}</li>
                    <p>{t("nature.items.provides.body")}</p>
                    <li>{t("nature.items.notParty.title")}</li>
                    <p>{t("nature.items.notParty.body")}</p>
                    <li>{t("nature.items.fees.title")}</li>
                    <p>{t.rich("nature.items.fees.body", { br: () => <br /> })}</p>
                    <li>{t("nature.items.limitation.title")}</li>
                    <ul>
                        <li>{t("nature.items.limitation.points.item1")}</li>
                        <li>{t("nature.items.limitation.points.item2")}</li>
                        <li>{t("nature.items.limitation.points.item3")}</li>
                    </ul>
                </ol>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <strong>{t("compliance.title")}</strong>
                <br />
                <br />
                {t("compliance.lead")}
                <ul>
                    <li>{t("compliance.items.item1")}</li>
                    <li>{t("compliance.items.item2")}</li>
                    <li>{t("compliance.items.item3")}</li>
                    <li>{t("compliance.items.item4")}</li>
                    <li>{t("compliance.items.item5")}</li>
                </ul>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <strong>{t("personalInfo.title")}</strong>
                <br />
                <br />
                <ol>
                    <li>{t("personalInfo.sections.data.title")}</li>
                    <ul>
                        <li>{t("personalInfo.sections.data.items.item1")}</li>
                        <li>{t("personalInfo.sections.data.items.item2")}</li>
                        <li>{t("personalInfo.sections.data.items.item3")}</li>
                        <li>{t("personalInfo.sections.data.items.item4")}</li>
                    </ul>
                    <li>{t("personalInfo.sections.purposes.title")}</li>
                    <ul>
                        <li>{t("personalInfo.sections.purposes.items.item1")}</li>
                        <li>{t("personalInfo.sections.purposes.items.item2")}</li>
                        <li>{t("personalInfo.sections.purposes.items.item3")}</li>
                        <li>{t("personalInfo.sections.purposes.items.item4")}</li>
                    </ul>
                    <li>{t("personalInfo.sections.sharing.title")}</li>
                    <p>{t("personalInfo.sections.sharing.body")}</p>
                    <li>{t("personalInfo.sections.retention.title")}</li>
                    <p>{t("personalInfo.sections.retention.body")}</p>
                    <li>{t("personalInfo.sections.requests.title")}</li>
                    <p>{t("personalInfo.sections.requests.body")}</p>
                </ol>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <strong>{t("security.title")}</strong>
                <br />
                <br />
                {t("security.lead")}
                <ul>
                    <li>{t("security.items.item1")}</li>
                    <li>{t("security.items.item2")}</li>
                    <li>{t("security.items.item3")}</li>
                    <li>{t("security.items.item4")}</li>
                </ul>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <strong>{t("cookies.title")}</strong>
                <br />
                <br />
                <p>{t("cookies.body")}</p>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <strong>{t("disclaimer.title")}</strong>
                <br />
                <br />
                <ol>
                    <li>{t("disclaimer.items.warranty.title")}</li>
                    <p>{t("disclaimer.items.warranty.body")}</p>
                    <li>{t("disclaimer.items.damages.title")}</li>
                    <p>{t("disclaimer.items.damages.body")}</p>
                    <li>{t("disclaimer.items.suspension.title")}</li>
                    <p>{t("disclaimer.items.suspension.body")}</p>
                </ol>
            </section>
        </div>
    );
}
