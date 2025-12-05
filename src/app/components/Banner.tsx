"use client";
import { useTranslations } from "next-intl";

export default function Banner() {
  const t = useTranslations("banner");
  return (
    <>
      <div className="row m-0 justify-content-center align-items-center banner">
        <div className="col-md-8">
          <div className="row">
            <div className="col position-relative">
                <div className=" position-absolute banner-left-content">
                  <h1 className="banner-title">{t("title")}</h1>
                    <div className="w-50">
                      <p>{t("subtitle")}</p>
                    </div>
                    <div>
                      <button className="btn btn-primary-custom rounded-5 w-50">
                        {t("buttons.findJob")}
                      </button>
                    </div>
                </div>
                
            </div>
            <div className="col">
              <img src="/banner/img2.png" className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
