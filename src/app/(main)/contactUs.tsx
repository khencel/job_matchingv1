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
              Contact Us
            </span>
            <h2 data-i18n="contact_title">Contact</h2>
            <p className="contact-desc" data-i18n="contact_desc">
              If you have questions or need support, feel free to contact us.
              <br />
            </p>

            <button
              className="contact-main-btn"
              data-i18n="contact_btn"
              onClick={handleShow}
            >
              Go to contact form
            </button>

            <p className="contact-note" data-i18n="contact_note">
              *Click to move to the inquiry page.
            </p>
          </div>
        </div>
      </section>
      <ContactUsmodal showModal={showModal} handleClose={handleClose} />
    </>
  );
}
