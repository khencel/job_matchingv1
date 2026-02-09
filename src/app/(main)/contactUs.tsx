import { useTranslations } from "next-intl";
import { useState } from "react";
import ContactUsmodal from "./contactUsModal";

export default function ContactUs() {
  const t = useTranslations("contactUs");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <section className="contact-cta" id="contact_us">
        <div className="container">
          <div className="contact-center">
            <span className="contact-pill" data-i18n="contact_pill">
              {t("pill")}
            </span>
            <h2 data-i18n="contact_title">{t("title")}</h2>
            <p className="contact-desc" data-i18n="contact_desc">
              {t("description")}
            </p>

            <button
              className="contact-main-btn"
              data-i18n="contact_btn"
              onClick={handleShow}
            >
              {t("button")}
            </button>

            <p className="contact-note" data-i18n="contact_note">
              {t("note")}
            </p>
          </div>
        </div>
      </section>
      <ContactUsmodal showModal={showModal} handleClose={handleClose} />
    </>
  );
}
