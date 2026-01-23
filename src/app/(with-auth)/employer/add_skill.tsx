import { useState } from "react";

interface AddSkillProps {
    skills: string[];
    onAddSkill: (skill: string) => void;
    onRemoveSkill: (skill: string) => void;
}

export default function AddSkill({ skills, onAddSkill, onRemoveSkill }: AddSkillProps){
    const [input, setInput] = useState("");

    const handleAddSkill = () => {
        const value = input.trim();
        if(value){
            onAddSkill(value);
            setInput("");
        }
    }

    return (
        <>
            <input type="text" className="form-control" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter skill" />
            <button className="btn-light border-0 p-0 mt-2" onClick={handleAddSkill}>
                <span className="primary-text"><strong>+ Add Skills</strong></span>
            </button>
            <div className="mt-2">
                {skills.map((skill, index) => (
                    <span key={index} className="badge primary-bg me-2">
                        {skill}
                        <span className="badge clickable bg-danger p-2 ms-1" onClick={() => onRemoveSkill(skill)}>X</span>
                    </span>
                ))}
            </div>
        </>
    )
}
