"use client";

import { setField } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import Header from "../headerPostAJob"
import TextEditor from "./TextEditor";
import type {RootState} from '@/redux/store'
import { useSelector, useDispatch } from "react-redux"
import { setInitialData } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { useRouter } from "next/navigation";

export default function JobDescription(){

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
                <strong>Details</strong>
                <br />
                <small>Add the description of the job, responsibilities. who you are and nice-to-have</small>
                <hr />

                <div className="row mt-5">
                    <div className="col">
                        <strong>Job Description <span className="text-danger">*</span></strong>
                        <br />
                        <small>Job description must be describe one position.</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.job_desc || ""} onChange={(value) => dispatch(setField({ job_desc: value }))} />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Responsibility <span className="text-danger">*</span></strong>
                        <br />
                        <small>Outline the core responsibilities of the position.</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.responsibility || ""} onChange={(value) => dispatch(setField({ responsibility: value }))} />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Requirements: <span className="text-danger">*</span></strong>
                        <br />
                        <small>Add your preferred candidates qualifications.</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.who_you_are || ""} onChange={(value) => dispatch(setField({ who_you_are: value }))} />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Nice-To-Have <span className="text-danger">*</span></strong>
                        <br />
                        <small>Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply.</small>
                    </div>
                    <div className="col">
                        <TextEditor value={basicInfo.nice_to_have || ""} onChange={(value) => dispatch(setField({ nice_to_have: value }))} />
                    </div>
                </div>

                <div className="row justify-content-end mt-5 mb-3">
                    <div className="col-md-3 text-end">
                            <button onClick={handleNextDescription} className="btn btn-primary-custom rounded-3">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}