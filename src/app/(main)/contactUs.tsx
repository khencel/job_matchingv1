export default function ContactUs() {
  return (
      <>
          <section className="contact-cta" id="contact">
            <div className="container">
              <div className="contact-center">
                <span className="contact-pill" data-i18n="contact_pill">Contact Us</span>
                <h2 data-i18n="contact_title">Contact</h2>
                <p className="contact-desc" data-i18n="contact_desc">
                  If you have questions or need support, feel free to contact us.<br/>
                </p>

                <button className="contact-main-btn" data-i18n="contact_btn">Go to contact form</button>

                <p className="contact-note" data-i18n="contact_note">*Click to move to the inquiry page.</p>
              </div>
            </div>
          </section>
      </>
  );
}
