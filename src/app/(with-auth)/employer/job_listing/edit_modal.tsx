"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MultiSelectDropdown from '@/components/MultipleSelect';
import TextEditor from '../post_a_job/job-description/TextEditor';
import AddSkill from '../add_skill';
import { useAppDispatch } from '@/redux/hooks';
import { setField } from '@/redux/slices/employer/post_a_job/basicInfoSlice';
import { updateJobPost } from '@/redux/features/job_post/job_post_thunk';
import { listJobPost } from '@/redux/features/job_post/job_post_thunk';
import type { RootState } from "@/redux/store";
import { useSelector } from 'react-redux';
import { popup } from '@/helper/pop_up';
import { showSuccessToast } from '@/app/(util)/toaster';

interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    currentPage: number;
    data: any;
}


export default function Editmodal({handleShow, handleClose, data, currentPage}: EditModalProps){
    const t = useTranslations("employerJobListingEditModal");

    const basicInfo = useSelector((state: RootState) => state.basicInfo);


    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        id: null as number | null,
        title: "",
        salary: "",
        type_of_emp: [] as string[],
        category: [] as { value: string; label: string }[],
        job_desc: "",
        responsibilities: "",
        who_you_are: "",
        nice_to_have: "",
        skill: [] as string[]
    })

    const handleUpdate = async () => {
        popup({
            title: t("confirm.title"),
            text: t("confirm.text"),
            icon: 'warning',
            onConfirm: () => {
                updatePostJob()
            }
        })
    };

    const updatePostJob = async () => {
        if (!formData.id) return;
        const skillFromRedux = basicInfo.skill;
        await dispatch(updateJobPost({
            id: formData.id,
            title: formData.title,
            salary: Number(formData.salary),
            type_of_emp: formData.type_of_emp,
            category: formData.category,
            job_desc: formData.job_desc,
            responsibility: formData.responsibilities,
            who_you_are: formData.who_you_are,
            nice_to_have: formData.nice_to_have,
            skill: formData.skill
        })).unwrap();

        const updatedList: any = await dispatch(listJobPost({
            userId: Number(data.user_id),
            page: currentPage,
            pageSize: 10
        })).unwrap();

        const updatedJob = updatedList.results.find((job: any) => job.id === formData.id);

        if (updatedJob) {
            setFormData({
                id: updatedJob.id,
                title: updatedJob.title || "",
                salary: updatedJob.salary || "",
                type_of_emp: updatedJob.type_of_emp || [],
                category: updatedJob.category || [],
                job_desc: updatedJob.job_desc || "",
                responsibilities: updatedJob.responsibility || "",
                who_you_are: updatedJob.who_you_are || "",
                nice_to_have: updatedJob.nice_to_have || "",
                skill: skillFromRedux || []
            });
        }
        showSuccessToast(t("toast.title"), t("toast.success"))
        handleClose();
    };



    useEffect(() => {
        if(data){
            setFormData({
                id: data.id,
                title: data.title || "",
                salary: data.salary || "",
                type_of_emp: data.type_of_emp || [],
                category: data.category || [],
                job_desc: data.job_desc || "",
                responsibilities: data.responsibility || "",
                who_you_are: data.who_you_are || "",
                nice_to_have: data.nice_to_have || "",
                skill: data.skill || []
            })

            dispatch(setField({
                type_of_emp: data.type_of_emp || [],
                skill: data.skill || [],
            }))
        }
    }, [data])
    
    return (
        <Modal size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <div className="emp-component-style mt-2">
                    <strong>{t("basicInfo")}</strong>
                    <br />
                    <small>{t("basicInfoNote")}</small>
                    <hr />
                    <div className="row mt-5">
                        <div className="col">
                            <strong>{t("jobTitle")} <span className="text-danger">*</span></strong>
                            <br />
                            <small>{t("jobTitleNote")}</small>
                        </div>
                        <div className="col">
                            <textarea name="" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value})} placeholder={t("jobTitlePlaceholder")} className="form-control" id=""></textarea>
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
                            <input type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value})} className="form-control" placeholder={t("salaryPlaceholder")} />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <strong>{t("employmentType")} <span className="text-danger">*</span></strong>
                        </div>
                        <div className="col">
                            {[
                                { value: "Full-Time", label: t("employmentTypes.fullTime") },
                                { value: "Part-Time", label: t("employmentTypes.partTime") },
                                { value: "Remote", label: t("employmentTypes.remote") },
                                { value: "Internship", label: t("employmentTypes.internship") },
                            ].map(({ value, label }) => (
                                <div key={value}>
                                    <input
                                        type="checkbox"
                                        checked={formData.type_of_emp.includes(value)}
                                        onChange={(e) => {
                                            const updated = e.target.checked
                                            ? [...formData.type_of_emp, value]
                                            : formData.type_of_emp.filter(t => t !== value);

                                            setFormData({ ...formData, type_of_emp: updated });
                                            dispatch(setField({ type_of_emp: updated }));
                                        }}
                                        />

                                    {" "}{label}
                                </div>
                            ))}
                           
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
                                value={formData.category}
                                onChange={(value: { value: string; label: string }[]) =>
                                    setFormData({ ...formData, category: value })
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
                            
                            <AddSkill
                                skills={formData.skill}
                                onAddSkill={(newSkill) => setFormData({...formData, skill: [...formData.skill, newSkill]})}
                                onRemoveSkill={(skillToRemove) => setFormData({...formData, skill: formData.skill.filter(s => s !== skillToRemove)})}
                            />

                        </div>
                    </div> */}
                    <hr />
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
                                <TextEditor value={formData.job_desc} onChange={(value) => setFormData({ ...formData, job_desc: value})} />
                            </div>
                        </div>
        
                        <div className="row mt-2">
                            <div className="col">
                                <strong>{t("responsibility")} <span className="text-danger">*</span></strong>
                                <br />
                                <small>{t("responsibilityNote")}</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.responsibilities} onChange={(value) => setFormData({ ...formData, responsibilities: value})}  />
                            </div>
                        </div>
        
                        <div className="row mt-2">
                            <div className="col">
                                <strong>{t("whoYouAre")} <span className="text-danger">*</span></strong>
                                <br />
                                <small>{t("whoYouAreNote")}</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.who_you_are} onChange={(value) => setFormData({ ...formData, who_you_are: value})}  />
                            </div>
                        </div>
        
                        <div className="row mt-2">
                            <div className="col">
                                <strong>{t("niceToHave")} <span className="text-danger">*</span></strong>
                                <br />
                                <small>{t("niceToHaveNote")}</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.nice_to_have} onChange={(value) => setFormData({ ...formData, nice_to_have: value})} />
                            </div>
                        </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("close")}
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    {t("saveChanges")}
                </Button>
            </Modal.Footer>
        </Modal>
    );

}