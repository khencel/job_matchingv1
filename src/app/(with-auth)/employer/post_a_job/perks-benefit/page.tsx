"use client";

import Header from "../headerPostAJob"
import type {RootState} from '@/redux/store'
import { useSelector, useDispatch } from "react-redux"  
import { createJobPost } from "@/redux/features/job_post/job_post_thunk";
import type { AppDispatch } from '@/redux/store';
import { FaPlus, FaXmark } from "react-icons/fa6";
import AddBenefitsModal from "./add_benefits_modal";
import { useState } from "react";
import { removeBenefit } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { setInitialData } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { popup } from "@/helper/pop_up";

export default function PerksBenefitPage() {
  const basicInfo = useSelector((state: RootState) => state.basicInfo);
  const benefits = useSelector((state:RootState) => state.basicInfo.benefits)
  const dispatch = useDispatch<AppDispatch>();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const handleConfirm = () => {
      dispatch(setInitialData(basicInfo))
      popup({
        title: "Create job post?",
        text: "Job post successfully created",
        confirmText: 'yes, create',
        icon:"warning",
        onConfirm: () => {
          handleSubmit()
        }
      })
  }

  const handleSubmit = () => {
    const initialData = localStorage.getItem("initialData");
    const parsedData = initialData ? JSON.parse(initialData) : basicInfo;
    dispatch(createJobPost(parsedData));
  }

  return (
    <>
      <Header />

      <div className="emp-component-style mt-2">  
          <strong>Basic Information</strong>
          <br />
          <small>List out your top perks and benefits.</small>
          <hr />
          <div className="row mt-5">
              <div className="col-md-3">
                  <strong>Perks and Benefits <span className="text-danger">*</span></strong>

              </div>
              <div className="col">
                  <button className="btn btn-default-custom mb-2" onClick={openModal}><FaPlus /> Add Benefit</button>
                      
                  
                  <div>
                      <div className="row">
                        {benefits.map((benefit) => (
                          <div className="col-md-4" key={benefit.id}>
                            <div className="bg-white p-3 rounded-3 mb-2">
                              <div className="w-100">
                                <span className="primary-text">
                                  <strong>{benefit.title}</strong>
                                </span>
                                <span
                                  className="ms-2 float-end cursor-pointer"
                                  onClick={() => dispatch(removeBenefit(benefit.id))}
                                >
                                  <FaXmark />
                                </span>
                              </div>
                              <hr />
                              <div>{benefit.description}</div>
                            </div>
                          </div>
                        ))}

                        <AddBenefitsModal
                          show={showModal}
                          onHide={() => setShowModal(false)}
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
                            Confirm
                        </button>
                </div>
            </div>
      </div>
    </>
  );
}