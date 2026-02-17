"use client";
import { useTranslations } from "next-intl";

export default function QASection() {
  const t = useTranslations("qAndA");

  return (
    <section className="py-5 bg-light" id="q_and_a">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">{t("badge")}</span>
          <h2 className="fw-bold mb-3">
            {t("heading")}
          </h2>
          <p className="text-muted fs-5">
            {t("description")}
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
                    {t("questions.jobSeeker.forJobSeeker")}
                  </button>
                </h2>
                <div
                  id="qaOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    <ol>
                      <li>{t("questions.jobSeeker.question1")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer1")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question2")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer2")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question3")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer3")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question4")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer4")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question5")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer5")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question6")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer6")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question7")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer7")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question8")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer8")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question9")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer9")}</li>
                      </ul>

                      <li>{t("questions.jobSeeker.question10")}</li>
                      <ul>
                        <li>{t("questions.jobSeeker.answer10")}</li>
                      </ul>
                    </ol>
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
                    {t("questions.employer.forEmployer")}
                  </button>
                </h2>
                <div
                  id="qaTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    <ol>
                      <li>{t("questions.employer.question1")}</li>
                      <ul>
                        <li>{t("questions.employer.answer1")}</li>
                      </ul>

                      <li>{t("questions.employer.question2")}</li>
                      <ul>
                        <li>{t("questions.employer.answer2")}</li>
                      </ul>

                      <li>{t("questions.employer.question3")}</li>
                      <ul>
                        <li>{t("questions.employer.answer3")}</li>
                      </ul>

                      <li>{t("questions.employer.question4")}</li>
                      <ul>
                        <li>{t("questions.employer.answer4")}</li>
                      </ul>

                      <li>{t("questions.employer.question5")}</li>
                      <ul>
                        <li>{t("questions.employer.answer5")}</li>
                      </ul>

                      <li>{t("questions.employer.question6")}</li>
                      <ul>
                        <li>{t("questions.employer.answer6")}</li>
                      </ul>

                      <li>{t("questions.employer.question7")}</li>
                      <ul>
                        <li>{t("questions.employer.answer7")}</li>
                      </ul>

                      <li>{t("questions.employer.question8")}</li>
                      <ul>
                        <li>{t("questions.employer.answer8")}</li>
                      </ul>

                      <li>{t("questions.employer.question9")}</li>
                      <ul>
                        <li>{t("questions.employer.answer9")}</li>
                      </ul>
                    </ol>
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
                    {t("questions.supervisory.forSupervisory")}
                  </button>
                </h2>
                <div
                  id="qaThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    <ol>
                      <li>{t("questions.supervisory.question1")}</li>
                      <ul>
                        <li>{t("questions.supervisory.answer1")}</li>
                      </ul>

                      <li>{t("questions.supervisory.question2")}</li>
                      <ul>
                        <li>{t("questions.supervisory.answer2")}</li>
                      </ul>

                      <li>{t("questions.supervisory.question3")}</li>
                      <ul>
                        <li>{t("questions.supervisory.answer3")}</li>
                      </ul>

                      <li>{t("questions.supervisory.question4")}</li>
                      <ul>
                        <li>{t("questions.supervisory.answer4")}</li>
                      </ul>

                      <li>{t("questions.supervisory.question5")}</li>
                      <ul>
                        <li>{t("questions.supervisory.answer5")}</li>
                      </ul>
                    </ol>
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
