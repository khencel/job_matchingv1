"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MultiSelectDropdown from "@/components/MultipleSelect";

import TextEditor from "../../../employer/post_a_job/job-description/TextEditor";

import { useAppDispatch } from "@/redux/hooks";
import { setField } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { updateJobPost } from "@/redux/features/job_post/job_post_thunk";
import { listJobPost } from "@/redux/features/job_post/job_post_thunk";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import { useTranslations } from "next-intl";
import { jobPostIndex } from "@/redux/slices/jobPost/jobPostThunk";
import { useSearchParams } from "next/navigation";

interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    currentPage: number;
    data: any;
}

export default function Editmodal({ handleShow, handleClose, data, currentPage }: EditModalProps) {
    const t = useTranslations("employerJobListingEditModal");
    const basicInfo = useSelector((state: RootState) => state.basicInfo);
    const searchParams = useSearchParams();
    const companyID = searchParams.get("companyID");

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

    const handleUpdate = async () => {
        popup({
            title: t("modals.confirmUpdate.title"),
            text: t("modals.confirmUpdate.message"),
            icon: "warning",
            onConfirm: () => {
                updatePostJob();
            },
        });
    };

    const updatePostJob = async () => {
        if (!formData.id) return;
        const skillFromRedux = basicInfo.skill;
        await dispatch(
            updateJobPost({
                id: formData.id,
                title: formData.title,
                salary: Number(formData.salary),
                type_of_emp: formData.type_of_emp,
                category: formData.category,
                job_desc: formData.job_desc,
                responsibility: formData.responsibilities,
                who_you_are: formData.who_you_are,
                nice_to_have: formData.nice_to_have,
                skill: formData.skill,
            }),
        ).unwrap();

       

        await  dispatch(jobPostIndex({ companyID: Number(companyID), page: currentPage, pageSize: 10}));


     
        showSuccessToast(t("modals.success.title"), t("modals.success.message"));
        handleClose();
    };

    useEffect(() => {
        if (data) {
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
                skill: data.skill || [],
            });

            dispatch(
                setField({
                    type_of_emp: data.type_of_emp || [],
                    skill: data.skill || [],
                }),
            );
        }
    }, [data, dispatch]);

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={handleShow}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{t("title")}</Modal.Title>
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
                <Button variant="primary" onClick={handleUpdate}>
                    {t("actions.saveChanges")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
