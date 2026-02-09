"use client";

import { useTranslations } from "next-intl";
import Header from "../headerPostAJob"
import type {RootState} from '@/redux/store'
import { useSelector, useDispatch } from "react-redux"  
import { createJobPost } from "@/redux/features/job_post/job_post_thunk";
import type { AppDispatch } from '@/redux/store';
import { FaPlus, FaXmark } from "react-icons/fa6";
import AddBenefitsModal from "./add_benefits_modal";
import { useEffect, useState } from "react";
import { removeBenefit, setInitialData, resetForm } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { popup } from "@/helper/pop_up";
import { useRouter } from "next/navigation";
import { title } from "process";


export default function PerksBenefitPage() {
  const t = useTranslations("employerPostJobPerksBenefit");
  const basicInfo = useSelector((state: RootState) => state.basicInfo);
  const benefits = useSelector((state:RootState) => state.basicInfo.benefits)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const [jobData, setJobData] = useState<any>(null)

  const handleConfirm = () => {
      dispatch(setInitialData(basicInfo))
      popup({
        title: t("confirm.title"),
        text: t("confirm.text"),
        confirmText: t("confirm.confirmText"),
        icon:"warning",
        onConfirm: () => {
          handleSubmit()
        }
      })
  }

  const handleSubmit = () => {
    const initialData = localStorage.getItem("initialData");
    const parsedData = initialData ? JSON.parse(initialData) : basicInfo;
    
    router.push("/employer/job_listing");
    dispatch(createJobPost(parsedData)).unwrap();
    dispatch(resetForm());
  }

  const data = jobData ? JSON.parse(jobData) : null;
  console.log(data);
  

  useEffect(() => {
      const initialData = localStorage.getItem('initialData');
      setJobData(initialData)
      console.log('LocalStorage initialData:', initialData);
      
  },[])

  return (
    <>
      <Header />

      <div className="emp-component-style mt-2">  
          <strong>{t("basicInfo")}</strong>
          <br />
          <small>{t("basicInfoNote")}</small>
          <hr />
          <div className="row mt-5">
              <div className="col-md-3">
              <strong>{t("infoDetails")}</strong>

              </div>
              <div className="col">
                  <div className="row">
                    <div className="col-3">
                      <strong>{t("labels.title")}</strong>
                    </div>
                    <div className="col-9">
                      {data?.title}
                    </div>

                    <div className="col-3">
                      <strong>{t("labels.salary")}</strong>
                    </div>
                    <div className="col-9">
                      {data?.salary}
                    </div>

                    <div className="col-3">
                      <strong>{t("labels.jobType")}</strong>
                    </div>
                    <div className="col-9">
                      {
                        data?.type_of_emp?.map((item:string, index:number) => {
                            return (
                              <span key={index}>
                                  {item}{index < data.type_of_emp.length - 1 ? ', ' : ''}
                              </span>
                            )
                        })
                      }
                    </div>

                    <div className="col-3 mt-5">
                      <strong>{t("labels.jobDescription")}</strong>
                    </div>
                    <div className="col-9 mt-5">
                      <p dangerouslySetInnerHTML={{
                                __html: data?.job_desc
                            }} 
                        />
                    </div>
                    <hr />
                    <div className="col-3">
                      <strong>{t("labels.responsibilities")}</strong>
                    </div>
                    <div className="col-9">
                      <p dangerouslySetInnerHTML={{
                                __html: data?.responsibility
                            }} 
                        />
                    </div>
                    <hr />
                    <div className="col-3">
                      <strong>{t("labels.requirements")}</strong>
                    </div>
                    <div className="col-9">
                      <p dangerouslySetInnerHTML={{
                                __html: data?.who_you_are
                            }} 
                        />
                    </div>


                    <hr />
                    <div className="col-3">
                      <strong>{t("labels.niceToHave")}</strong>
                    </div>
                    <div className="col-9">
                      <p dangerouslySetInnerHTML={{
                                __html: data?.nice_to_have
                            }} 
                        />
                    </div>
                  </div>

                  
              </div>
          </div>

          <div className="row justify-content-end mt-5 mb-3">
                <div className="col-md-3 text-end">
                        <button 
                            className="btn btn-primary-custom rounded-3"
                            onClick={handleConfirm}
                        >
                          {t("confirmButton")}
                        </button>
                </div>
            </div>
      </div>
    </>
  );
}