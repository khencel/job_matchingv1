import { useState } from "react";
import { addSkill, removeSkill } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store";


export default function AddSkill(){
    const [input, setInput] = useState<string>("")
    const dispatch = useDispatch();

    const basicInfo = useSelector((state: RootState) => state.basicInfo);

    const handleAddSkill = () => {
        const value = input.trim();
        if(value){
            dispatch(addSkill(value));
            setInput("");
        }
    }
    return (
    <>
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
    </>
    )
}