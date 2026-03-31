"use client";
import { regionList, listCategory } from "./listGroupData";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { setFilterField } from "@/redux/slices/filterJobPost/filterJobPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import { filterJobPostV1 } from "@/redux/slices/filterJobPost/filterJobPostThunk";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function JobSearchFiler() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations("jobSearchFilter");
  const i = useTranslations("list");

  const categoryList = listCategory(i);
  const prefectureList = regionList(i);

  const { category, region } = useSelector(
    (state: RootState) => state.jobSearchFilterSlice,
  );

  const handleApplyFilter = () => {
    const payload = {
      category,
      region,
    };
    dispatch(filterJobPostV1(payload));
    router.push("/find-jobs");
  };
  return (
    <>
      <div className="job-search-filter d-flex justify-content-center p-1">
        <div className="container rounded">
          <div className="row g-2 p-1">
            <div className="col-md-5">
              <div className="field">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
                    stroke="#0f172a"
                    strokeWidth={"1.8"}
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.5 9.5h15v9.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9.5z"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.5 12.5h15"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity=".45"
                  />
                </svg>

                <select
                  name="ssw_field"
                  aria-label={t("aria.category")}
                  id="sswField"
                  value={category}
                  onChange={(e) =>
                    dispatch(setFilterField({ category: e.target.value }))
                  }
                >
                  <option value="">{t("placeholders.category")}</option>
                  {categoryList.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-md-5">
              <div className="field">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                  />
                </svg>

                <select
                  name="prefecture"
                  value={region}
                  onChange={(e) =>
                    dispatch(setFilterField({ region: e.target.value }))
                  }
                  aria-label={t("aria.prefecture")}
                  id="prefecture"
                >
                  <option value="">{t("placeholders.prefecture")}</option>
                  {prefectureList.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-md-2 filter-search">
              <button
                onClick={handleApplyFilter}
                className="btn btn-primary-custom w-100 h-100 border rounded-4"
              >
                {t("buttons.search")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
