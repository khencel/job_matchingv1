"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AddButton } from "@/components/Button";
import { popup } from "@/helper/pop_up";
import { useAppDispatch } from "@/redux/hooks";
import { updatePerksBenefitsByUserID } from "@/redux/slices/perks_benefits/perksBenefitsThunk";
import { useTranslations } from "next-intl";
import { indexPerksBenefitsByUserID } from "@/redux/slices/perks_benefits/perksBenefitsThunk";

interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    data?: any;
    userID?: string;
}

export default function EditModalPerks({ handleShow, handleClose, data, userID}: EditModalProps) {
    const t = useTranslations("employerPerksBenefits");
    const dispatch = useAppDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (data && handleShow) {
            setName(data.name || "");
            setDescription(data.description || "");
        }
    }, [data, handleShow]);

    const handleUpdate = () => {
        popup({
            title: t("modals.edit.title"),
            text: t("modals.edit.message"),
            confirmText: t("modals.edit.confirmText"),
            icon: "warning",
            onConfirm: async () => {
                try {
                    await dispatch(
                        updatePerksBenefitsByUserID({
                            id: data.id,
                            name,
                            description,
                        })
                        
                    ).unwrap(); 
                    dispatch(indexPerksBenefitsByUserID(Number(userID)));
                    handleClose();
                } catch (error) {
                    console.error(error);
                }
            },
        });
    };

    return (
        <Modal show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("modals.edit.header")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <input
                            className="form-control"
                            placeholder={t("modals.fields.name")}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <textarea
                            className="form-control"
                            placeholder={t("modals.fields.description")}
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("modals.actions.close")}
                </Button>
                <AddButton
                    label={t("modals.actions.save")}
                    onClick={handleUpdate}
                    className="btn btn-primary-custom rounded-3"
                    icon={null}
                />
            </Modal.Footer>
        </Modal>
    );
}