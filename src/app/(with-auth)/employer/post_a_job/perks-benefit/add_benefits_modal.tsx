"use client";

import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBenefit } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";


interface AddBenefitsModalProps {
  show: boolean;
  onHide: () => void;
}

export default function AddBenefitsModal({ show, onHide }: AddBenefitsModalProps) {
    const t = useTranslations("employerPostJobPerksBenefit");
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    const handleAddBenefit = () => {
        if(!title.trim() || !description.trim()) return;
        dispatch(
            addBenefit({
                id: uuidv4(),
                title,
                description
            })
        )

        setTitle("");
        setDescription("");
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>{t("addBenefitModal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control mb-2" placeholder={t("addBenefitModal.placeholders.title")} />
                    <textarea name="" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("addBenefitModal.placeholders.description")} className="form-control" id=""></textarea>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn-primary-custom rounded-3" onClick={handleAddBenefit}>
            {t("addBenefitModal.actions.save")}
            </Button>
        </Modal.Footer>
        </Modal>
    );
}