import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setField } from '@/redux/slices/employer/post_a_job/basicInfoSlice';
import { updateJobPost } from '@/redux/features/job_post/job_post_thunk';
import { listJobPost } from '@/redux/features/job_post/job_post_thunk';
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { popup } from '@/helper/pop_up';
import { showSuccessToast } from '@/app/(util)/toaster';
import MultiSelectDropdown from '@/components/MultipleSelect';
import TextEditor from '../../../employer/post_a_job/job-description/TextEditor';
import { useSearchParams } from "next/navigation";

import  { createJobPost }  from '../../../../../redux/features/job_post/job_post_thunk'
import { jobPostIndex } from '@/redux/slices/jobPost/jobPostThunk';


interface AddModalProps {
    handleShow: boolean;
    handleClose: () => void;
    currentPage: number;
}


export default function AddJobPost({handleShow, handleClose, currentPage}: AddModalProps){
    const basicInfo = useSelector((state: RootState) => state.basicInfo);
    const searchParams = useSearchParams();
    const companyID = searchParams.get("companyID");
    const t = useTranslations("employerJobListingEditModal");
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
        skill: [] as string[],
    });

    const employmentTypeOptions = [
        { value: "Full-Time", label: t("fields.employmentType.options.fullTime") },
        { value: "Part-Time", label: t("fields.employmentType.options.partTime") },
        { value: "Remote", label: t("fields.employmentType.options.remote") },
        { value: "Internship", label: t("fields.employmentType.options.internship") },
    ];

    const handleCreate = async () => {
        popup({
            title: t("modals.confirmUpdate.title"),
            text: t("modals.confirmUpdate.message"),
            icon: "warning",
            onConfirm: () => {
                createProcess();
                showSuccessToast(t("modals.success.title"), t("modals.success.message"));
                handleClose();
            },
        });
    
    }

    const createProcess = async () => {
        const payload = {
            title: formData.title,
            salary: Number(formData.salary) || 0,
            type_of_emp: formData.type_of_emp,
            category: formData.category,
            skill: formData.skill,
            job_desc: formData.job_desc,
            responsibility: formData.responsibilities,
            who_you_are: formData.who_you_are,
            nice_to_have: formData.nice_to_have,
            status: "idle" as const,
            benefits: [],
            region: basicInfo.region || "toyama",
            company: Number(companyID),
            company_name: basicInfo.company_name || "Prescribe Digital",
        };
        await dispatch(createJobPost(payload)).unwrap();
        await  dispatch(jobPostIndex({ companyID: Number(companyID), page: currentPage, pageSize: 10}));
    }

    return (
        <>
            <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={handleShow}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Job Post</Modal.Title>
            </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="emp-component-style mt-2">
                        <strong>{t("sections.basicInfo.title")}</strong>
                        <br />
                        <small>{t("sections.basicInfo.subtitle")}</small>
                        <hr />
                        <div className="row mt-5">
                            <div className="col">
                                <strong>
                                    {t("fields.jobTitle.label")} <span className="text-danger">*</span>
                                </strong>
                                <br />
                                <small>{t("fields.jobTitle.hint")}</small>
                            </div>
                            <div className="col">
                                <textarea
                                    name=""
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder={t("fields.jobTitle.placeholder")}
                                    className="form-control"
                                    id=""
                                ></textarea>
                                <small>{t("fields.jobTitle.minChars")}</small>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <strong>{t("fields.salary.label")}</strong>
                                <br />
                                <small>{t("fields.salary.hint")}</small>
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    className="form-control"
                                    placeholder={t("fields.salary.placeholder")}
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <strong>
                                    {t("fields.employmentType.label")} <span className="text-danger">*</span>
                                </strong>
                            </div>
                            <div className="col">
                                {employmentTypeOptions.map((type) => (
                                    <div key={type.value}>
                                        <input
                                            type="checkbox"
                                            checked={formData.type_of_emp.includes(type.value)}
                                            onChange={(e) => {
                                                const updated = e.target.checked
                                                    ? [...formData.type_of_emp, type.value]
                                                    : formData.type_of_emp.filter((t) => t !== type.value);

                                                setFormData({ ...formData, type_of_emp: updated });
                                                dispatch(setField({ type_of_emp: updated }));
                                            }}
                                        />

                                        {" "}
                                        {type.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <strong>{t("fields.categories.label")}</strong>
                                <br />
                                <small>{t("fields.categories.hint")}</small>
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

                        <hr />
                        <strong>{t("sections.details.title")}</strong>
                        <br />
                        <small>{t("sections.details.subtitle")}</small>
                        <hr />

                        <div className="row mt-5">
                            <div className="col">
                                <strong>
                                    {t("fields.jobDescription.label")} <span className="text-danger">*</span>
                                </strong>
                                <br />
                                <small>{t("fields.jobDescription.hint")}</small>
                            </div>
                            <div className="col">
                                <TextEditor
                                    value={formData.job_desc}
                                    onChange={(value) => setFormData({ ...formData, job_desc: value })}
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <strong>
                                    {t("fields.responsibility.label")} <span className="text-danger">*</span>
                                </strong>
                                <br />
                                <small>{t("fields.responsibility.hint")}</small>
                            </div>
                            <div className="col">
                                <TextEditor
                                    value={formData.responsibilities}
                                    onChange={(value) =>
                                        setFormData({ ...formData, responsibilities: value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <strong>
                                    {t("fields.whoYouAre.label")} <span className="text-danger">*</span>
                                </strong>
                                <br />
                                <small>{t("fields.whoYouAre.hint")}</small>
                            </div>
                            <div className="col">
                                <TextEditor
                                    value={formData.who_you_are}
                                    onChange={(value) => setFormData({ ...formData, who_you_are: value })}
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <strong>
                                    {t("fields.niceToHave.label")} <span className="text-danger">*</span>
                                </strong>
                                <br />
                                <small>{t("fields.niceToHave.hint")}</small>
                            </div>
                            <div className="col">
                                <TextEditor
                                    value={formData.nice_to_have}
                                    onChange={(value) => setFormData({ ...formData, nice_to_have: value })}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("actions.close")}
                    </Button>
                    <Button variant="primary"
                        onClick={handleCreate}
                    >
                        {t("actions.saveChanges")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}