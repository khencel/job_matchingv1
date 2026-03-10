import { useTranslations } from "next-intl";

export default function PerksBenefits({ data }: { data: any }) {
  const t = useTranslations("employerProfileHeader");
  return (
    <>
      <div className="py-5">
        <div className="container">

          {/* Header */}
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: 4,
                  height: 26,
                  background: "linear-gradient(180deg, #6366f1, #3b82f6)",
                  borderRadius: 4,
                  marginRight: 10,
                }}
              />
              <h3 className="mb-0 fw-bold">{t("perkBenefits")}</h3>
            </div>
            <small className="text-muted">
              {t("perkText")}
            </small>
          </div>

          {/* Perks Grid */}
          <div className="row g-4">
            {data?.map((item: any, index: number) => {
              return (
                <div className="col-12 col-md-6 col-lg-3" key={index}>
                  <div
                    className="h-100 p-4 rounded-4 border shadow-sm"
                    style={{
                      backgroundColor: "#ffffff",
                      transition: "all 0.25s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div className="fw-semibold mb-2 text-dark">
                      {item.name}
                    </div>
                    <div
                      className="small text-secondary"
                      style={{ fontSize: "14px", lineHeight: "1.6" }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
