
"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { popup } from '@/helper/pop_up';
import { useAppDispatch } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { setField, resetForm } from '@/redux/slices/perks_benefits/perksBenefitsSlice';
import { addPerksBenefits } from '@/redux/slices/perks_benefits/perksBenefitsThunk';
import { useTranslations } from 'next-intl';



interface AddModalProps {
    handleShow: boolean;
    handleClose: () => void;
    userID?: string;
}

export default function AddModal({handleShow, handleClose, userID}: AddModalProps){
    const t = useTranslations("employerPerksBenefits");
    const dispatch = useAppDispatch();
    const stateInfo = useSelector((state: RootState) => state.perksAndBenefitsSlice)

    const handleSave = () => {

        popup({
            title: t("modals.add.title"),
            text: t("modals.add.message"),
            confirmText: t("modals.add.confirmText"),
            icon:"warning",
            onConfirm: async ()  => {
                    if(userID){
                        const payload = {
                            ...stateInfo,
                            user: userID
                        }

                        await dispatch(addPerksBenefits(payload))
                    }else{
                        await dispatch(addPerksBenefits(stateInfo))
                    }

                    dispatch(resetForm())
                    handleClose();
                }
        })
    }

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{t("modals.add.header")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <input 
                                className="form-control" 
                                placeholder={t("modals.fields.name")}
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
                                placeholder={t("modals.fields.description")}
                                rows={5}
                                value={stateInfo.description || ""}
                                onChange={(value) => dispatch(setField({description: value.target.value}))}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("modals.actions.close")}
                </Button>
                    <AddButton onClick={handleSave} label={t("modals.actions.save")} className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
        </>
    )
}