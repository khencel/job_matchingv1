"use client";

import { useTranslations } from "next-intl";
import { setField } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import Header from "../headerPostAJob"
import TextEditor from "./TextEditor";
import type {RootState} from '@/redux/store'
import { useSelector, useDispatch } from "react-redux"
import { setInitialData } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { useRouter } from "next/navigation";

export default function JobDescription(){

    const t = useTranslations("employerPostJobDescription");

    const basicInfo = useSelector((state: RootState) => state.basicInfo);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleNextDescription = () => {
        dispatch(setInitialData(basicInfo));
        router.push("/employer/post_a_job/perks-benefit");
    }
    return(
        <>
            <Header/>
            <div className="emp-component-style mt-2">
                <strong>{t("details")}</strong>
                <br />
                <small>{t("detailsNote")}</small>
                <hr />

                <div className="row mt-5">
                    <div className="col">
                        <strong>{t("jobDescription")} <span className="text-danger">*</span></strong>
                        <br />
                        <small>{t("jobDescriptionNote")}</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.job_desc || ""} onChange={(value) => dispatch(setField({ job_desc: value }))} />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>{t("responsibility")} <span className="text-danger">*</span></strong>
                        <br />
                        <small>{t("responsibilityNote")}</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.responsibility || ""} onChange={(value) => dispatch(setField({ responsibility: value }))} />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>{t("requirements")} <span className="text-danger">*</span></strong>
                        <br />
                        <small>{t("requirementsNote")}</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.who_you_are || ""} onChange={(value) => dispatch(setField({ who_you_are: value }))} />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>{t("niceToHave")} <span className="text-danger">*</span></strong>
                        <br />
                        <small>{t("niceToHaveNote")}</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.nice_to_have || ""} onChange={(value) => dispatch(setField({ nice_to_have: value }))} />
                    </div>
                </div>

                <div className="row justify-content-end mt-5 mb-3">
                    <div className="col-md-3 text-end">
                            <button onClick={handleNextDescription} className="btn btn-primary-custom rounded-3">{t("next")}</button>
                    </div>
                </div>
            </div>
        </>
    );
}