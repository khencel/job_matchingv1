"use client";

import { useState } from "react";
import ContactUsmodal from "./contactUsModal";
import { useTranslations } from "next-intl";

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
            <span className="contact-pill">{t("pill")}</span>
            <h2>{t("title")}</h2>
            <p className="contact-desc">
              {t("description")}
              <br />
            </p>

            <button className="contact-main-btn" onClick={handleShow}>
              {t("button")}
            </button>

            <p className="contact-note">{t("note")}</p>
          </div>
        </div>
      </section>
      <ContactUsmodal showModal={showModal} handleClose={handleClose} />
    </>
  );
}
