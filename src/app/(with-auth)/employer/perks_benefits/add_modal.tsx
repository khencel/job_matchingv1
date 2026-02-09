
"use client";

import { useTranslations } from "next-intl";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { popup } from '@/helper/pop_up';
import { useAppDispatch } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { setField, resetForm } from '@/redux/slices/perks_benefits/perksBenefitsSlice';
import { addPerksBenefits } from '@/redux/slices/perks_benefits/perksBenefitsThunk';



interface AddModalProps {
    handleShow: boolean;
    handleClose: () => void;
}

export default function AddModal({handleShow, handleClose}: AddModalProps){
    const t = useTranslations("employerPerksAddModal");
    const dispatch = useAppDispatch();
    const stateInfo = useSelector((state: RootState) => state.perksAndBenefitsSlice)

    const handleSave = () => {
        popup({
            title: t("confirm.title"),
            text: t("confirm.text"),
            confirmText: t("confirm.confirmText"),
            icon:"warning",
            onConfirm: () => {
                    dispatch(addPerksBenefits(stateInfo))
                    dispatch(resetForm())
                    handleClose();
                }
        })
    }

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{t("title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <input 
                                className="form-control" 
                                placeholder={t("namePlaceholder")} 
                                type="text"
                                value={stateInfo.name || ""}
                                onChange={(value) => dispatch(setField({name: value.target.value}))}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <textarea 
                                className="form-control" 
                                placeholder={t("descriptionPlaceholder")} 
                                rows={5}
                                value={stateInfo.description || ""}
                                onChange={(value) => dispatch(setField({description: value.target.value}))}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("close")}
                </Button>
                    <AddButton onClick={handleSave} label={t("save")} className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
        </>
    )
}