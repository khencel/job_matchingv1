import { useTranslations } from "next-intl";

export default function QASection() {
  const t = useTranslations("qAndA");
  return (
    <section className="py-5 bg-light" id="q_and_a">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">{t("badge")}</span>
          <h2 className="fw-bold mb-3">
            {t("title")}
          </h2>
          <p className="text-muted fs-5">
            {t("subtitle")}
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="accordion" id="qaAccordion">
              
              {/* Question 1 */}
              <div className="accordion-item border-0 mb-3 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaOne"
                  >
                    {t("items.q1.question")}
                  </button>
                </h2>
                <div
                  id="qaOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    {t("items.q1.answer")}
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="accordion-item border-0 mb-3 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaTwo"
                  >
                    {t("items.q2.question")}
                  </button>
                </h2>
                <div
                  id="qaTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    {t("items.q2.answer")}
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="accordion-item border-0 mb-3 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaThree"
                  >
                    {t("items.q3.question")}
                  </button>
                </h2>
                <div
                  id="qaThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    {t("items.q3.answer")}
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="accordion-item border-0 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaFour"
                  >
                    {t("items.q4.question")}
                  </button>
                </h2>
                <div
                  id="qaFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    {t("items.q4.answer")}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
