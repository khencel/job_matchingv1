"use client";
import { useTranslations } from "next-intl";

export default function QASection() {
  const t = useTranslations("qAndA");
  
  // Convert object to array for mapping
  const questionsObject = t.raw("questions") as Record<string, { question: string; answer: string }>;
  const questions = Object.values(questionsObject);

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
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="accordion-item border-0 mb-3 shadow-sm rounded-3"
                >
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button${
                        index !== 0 ? " collapsed" : ""
                      } rounded-3`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#qa${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`qa${index}`}
                    className={`accordion-collapse collapse${
                      index === 0 ? " show" : ""
                    }`}
                    data-bs-parent="#qaAccordion"
                  >
                    <div className="accordion-body text-muted">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
