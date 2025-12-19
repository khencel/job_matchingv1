"use client"
import Header from "../headerPostAJob"
import MultiSelectDropdown from "@/components/MultipleSelect"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type {RootState} from '@/redux/store'
import { addSkill, removeSkill } from "@/redux/slices/employer/post_a_job/skillsSlice"




export default function PostAJob(){
    const [mounted, setMounted] = useState(false);
    const [input, setInput] = useState<string>("")

    const skills = useSelector((state: RootState) => state.skills.skills);
    const dispatch = useDispatch();

    const handleAddSkill = () => {
        const value = input.trim();
        if(value){
            dispatch(addSkill(value));
            setInput("");
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return(
        <>  <Header/>
            <div className="emp-component-style mt-2">
                <strong>Basic Information</strong>
                <br />
                <small>This Information will be displayed publicly.</small>
                <hr />
                <div className="row mt-5">
                    <div className="col">
                        <strong>Job Title <span className="text-danger">*</span></strong>
                        <br />
                        <small>Job title must be describe one position.</small>
                    </div>
                    <div className="col">
                        <textarea name="" placeholder="e.g Software Engineer" className="form-control" id=""></textarea>
                        <small>At least 80 characters</small>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Salary</strong>
                        <br />
                        <small>Please specify the estimated salary range for the role.</small>
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" placeholder="Estimate salary" />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Type of Employment</strong>
                    </div>
                    <div className="col">
                        <input type="checkbox" /> Full-Time
                        <br />
                        <input type="checkbox" /> Part-Time
                        <br />
                        <input type="checkbox" /> Remote
                        <br />
                        <input type="checkbox" /> Internship
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Categories</strong>
                        <br />
                        <small>You can select multiple job categories</small>
                    </div>
                    <div className="col">
                        <MultiSelectDropdown />
                    </div>
                </div>

                <div className="row mt-2">
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
                            {skills.map((skill, index) => (
                                <span key={index} className="badge primary-bg me-2">
                                    {skill}
                                    <span className="badge clickable bg-danger p-2 ms-1" onClick={() =>dispatch(removeSkill(skill))}>X</span>
                                </span>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="row justify-content-end mt-5 mb-3">
                    <div className="col-md-3 text-end">
                            <button className="btn btn-primary-custom rounded-3">Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}