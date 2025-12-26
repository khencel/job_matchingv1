"use client";

import Header from "../headerPostAJob"
import type {RootState} from '@/redux/store'
import { useSelector, useDispatch } from "react-redux"  
import { createJobPost } from "@/redux/features/job_post/job_post_thunk";
import type { AppDispatch } from '@/redux/store';

export default function PerksBenefitPage() {
  const basicInfo = useSelector((state: RootState) => state.basicInfo);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    const initialData = localStorage.getItem("initialData");

    const parsedData = initialData ? JSON.parse(initialData) : basicInfo;
    
    dispatch(createJobPost(parsedData));

    console.log("Submitting perks and benefits with initial data:", initialData);
  }

  return (
    <>
      <Header />

      <div className="emp-component-style mt-2">  
          <strong>Perks and Benefits</strong>
          <br />
          <small>List out your top perks and benefits.</small>
          <hr />
          <div className="row mt-5">
              <div className="col-md-3">
                  <strong>Job Title <span className="text-danger">*</span></strong>
                  <br />
                  <small>Job title must be describe one position.</small>
              </div>
              <div className="col">
                  <textarea name="" placeholder="e.g Software Engineer" className="form-control" id=""></textarea>
                  <small>At least 80 characters</small>
              </div>
          </div>
          <div className="row justify-content-end mt-5 mb-3">
                <div className="col-md-3 text-end">
                        <button 
                            className="btn btn-primary-custom rounded-3"
                            onClick={handleSubmit}
                        >
                            Next
                        </button>
                </div>
            </div>
      </div>
    </>
  );
}