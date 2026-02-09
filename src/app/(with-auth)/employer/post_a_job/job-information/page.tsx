"use client";
import { useTranslations } from "next-intl";
import Header from "../headerPostAJob";
import MultiSelectDropdown from "@/components/MultipleSelect";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  setField,
  addSkill,
  removeSkill,
  setInitialData,
} from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { showErrorToast } from "@/app/(util)/toaster";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { regionList } from "@/components/listGroupData";

export default function PostAJob() {
  const t = useTranslations("employerPostJobInformation");
  const tListGroup = useTranslations("listGroupData");
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const dispatch = useDispatch();

  const basicInfo = useSelector((state: RootState) => state.basicInfo);

  const handleAddSkill = () => {
    const value = input.trim();
    if (value) {
      dispatch(addSkill(value));
      setInput("");
    }
  };

  const handleNext = () => {
    const title = basicInfo.title.trim();
    const employmentTypes = basicInfo.type_of_emp;
    if (!title) {
      showErrorToast(
        t("errors.titleRequiredTitle"),
        t("errors.titleRequiredText"),
      );
      return;
    }
    if (employmentTypes.length === 0) {
      showErrorToast(
        t("errors.employmentRequiredTitle"),
        t("errors.employmentRequiredText"),
      );
      return;
    }

    router.push("/employer/post_a_job/job-description");
    console.log(dispatch(setInitialData(basicInfo)));
  };

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updatedTypes = [...basicInfo.type_of_emp];
    if (e.target.checked) {
      updatedTypes.push(value);
    } else {
      updatedTypes = updatedTypes.filter((type) => type !== value);
    }
    dispatch(setField({ type_of_emp: updatedTypes }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {" "}
      <Header />
      <div className="emp-component-style mt-2">
        <strong>{t("basicInfo")}</strong>
        <br />
        <small>{t("basicInfoNote")}</small>
        <hr />
        <div className="row mt-5">
          <div className="col">
            <strong>
              {t("jobTitle")} <span className="text-danger">*</span>
            </strong>
            <br />
            <small>{t("jobTitleNote")}</small>
          </div>
          <div className="col">
            <textarea
              name=""
              value={basicInfo.title}
              onChange={(e) => dispatch(setField({ title: e.target.value }))}
              placeholder={t("jobTitlePlaceholder")}
              className="form-control"
              id=""
            ></textarea>
            <small>{t("minCharacters")}</small>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <strong>{t("salary")}</strong>
            <br />
            <small>{t("salaryNote")}</small>
          </div>
          <div className="col">
            <input
              type="number"
              value={basicInfo.salary ?? ""}
              onChange={(e) =>
                dispatch(setField({ salary: e.target.valueAsNumber }))
              }
              className="form-control"
              placeholder={t("salaryPlaceholder")}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <strong>
              {t("employmentType")} <span className="text-danger">*</span>
            </strong>
          </div>
          <div className="col">
            <input
              type="checkbox"
              value="Full-Time"
              checked={basicInfo.type_of_emp.includes("Full-Time")}
              onChange={handleCheckBox}
            />{" "}
            {t("employmentTypes.fullTime")}
            <br />
            <input
              type="checkbox"
              value={"Part-Time"}
              checked={basicInfo.type_of_emp.includes("Part-Time")}
              onChange={handleCheckBox}
            />{" "}
            {t("employmentTypes.partTime")}
            <br />
            <input
              type="checkbox"
              value={"Remote"}
              checked={basicInfo.type_of_emp.includes("Remote")}
              onChange={handleCheckBox}
            />{" "}
            {t("employmentTypes.remote")}
            <br />
            <input
              type="checkbox"
              value={"Internship"}
              checked={basicInfo.type_of_emp.includes("Internship")}
              onChange={handleCheckBox}
            />{" "}
            {t("employmentTypes.internship")}
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <strong>
              {t("prefecture")} <span className="text-danger">*</span>
            </strong>
          </div>
          <div className="col">
            <select
              name=""
              value={basicInfo.region || ""}
              onChange={(e) => dispatch(setField({ region: e.target.value }))}
              className="form-control"
              id=""
            >
              <option disabled hidden value="">
                {t("prefectureSelect")}
              </option>
              {regionList.map((item: any, index: number) => {
                return (
                  <option key={item.value} value={item.value}>
                    {tListGroup(`prefecture.${item.value}`)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <strong>{t("categories")}</strong>
            <br />
            <small>{t("categoriesNote")}</small>
          </div>
          <div className="col">
            <MultiSelectDropdown
              value={basicInfo.category}
              onChange={(selectedOptions: any) =>
                dispatch(setField({ category: selectedOptions }))
              }
            />
          </div>
        </div>

        {/* <div className="row mt-2">
                    <div className="col">
                        <strong>Required Skills</strong>
                        <br />
                        <small>Add required skills for the job</small>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter skill" />
                        <button 
                            className="btn-light border-0 p-0 mt-2"
                            onClick={handleAddSkill}>
                            <span className="primary-text"><strong>+ Add Skills</strong></span>
                        </button>
                        <div className="mt-2">
                            {basicInfo.skill.map((skill, index) => (
                                <span key={index} className="badge primary-bg me-2">
                                    {skill}
                                    <span className="badge clickable bg-danger p-2 ms-1" onClick={() =>dispatch(removeSkill(skill))}>X</span>
                                </span>
                            ))}
                        </div>

                    </div>
                </div> */}

        <div className="row justify-content-end mt-5 mb-3">
          <div className="col-md-3 text-end">
            <button
              className="btn btn-primary-custom rounded-3"
              onClick={handleNext}
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
