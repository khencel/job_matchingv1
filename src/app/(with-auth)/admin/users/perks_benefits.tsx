

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { popup } from '@/helper/pop_up';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { indexPerksBenefitsByUserID } from '@/redux/slices/perks_benefits/perksBenefitsThunk';
import AddModal from '../../employer/perks_benefits/add_modal';
import { useState } from 'react';
import { showSuccessToast } from '@/app/(util)/toaster';
import { deletePerksBenefits } from '@/redux/slices/perks_benefits/perksBenefitsThunk';
import EditModalPerks from './edit_modal_perks';
import { useTranslations } from 'next-intl';





interface PerksBenefitsProps {
    handleShow: boolean;
    handleClose: () => void;
    userID?: string;
}


export default function PerksBenefits({handleShow, handleClose, userID}: PerksBenefitsProps){
    const t = useTranslations("employerPerksBenefits");
    const {items, status, error} = useAppSelector((state) => state.perksAndBenefitsSlice);
    const dispatch = useAppDispatch();

    const [addPerksModal, setAddPerksModal] = useState(false);
    const [editPerksModal, setEditPerksModal] = useState(false);
    const [selectedPerks, setSelectedPerks] = useState<string | null>(null);
    

    const handleAddPerks = () => {
        setAddPerksModal(true);
    }

    const handleDelete = (id: number) => {
        popup({
            title: t("modals.delete.title"),
            text: t("modals.delete.message"),
            icon: "warning",
            confirmText: t("modals.delete.confirmText"),
            onConfirm: async () => {
                try {
                    await dispatch(deletePerksBenefits(id)).unwrap();
                    await dispatch(indexPerksBenefitsByUserID(Number(userID)));
                    showSuccessToast(t("toasts.deleteTitle"),t("toasts.deleteMessage"));
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

    const handleEdit = (data: any) => {
        setSelectedPerks(data);
        setEditPerksModal(true);
    }



    useEffect(() => {
        if (handleShow && userID) {
            dispatch(indexPerksBenefitsByUserID(Number(userID)));
        }
    }, [dispatch,userID, handleShow]);

    return (
        <>
            <Modal size='xl' show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{t("title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12 justify-content-end d-flex mb-3">
                            <button className="btn btn-primary-custom rounded-3 " onClick={handleAddPerks}>{t("addButton")}</button>
                        </div>
                        <div className="col-12 mt-2">
                            <table className='table table-hover'>
                                <thead>
                                    <tr>   
                                        <th>#</th>
                                        <th>{t("table.name")}</th>
                                        <th>{t("table.description")}</th>
                                        <th>{t("table.createdAt")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items && items.length > 0 ? (
                                            items.map((item: any, index: number) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td style={{width:"12%"}} >
                                                        <button className="btn btn-sm btn-primary me-1" onClick={() => handleEdit(item)}>{t("buttons.edit")}</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => (handleDelete(item.id))}>{t("buttons.delete")}</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className='text-center' colSpan={7}>{t("states.empty")}</td>
                                            </tr>
                                        )
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("cancel")}
                </Button>
                    <AddButton label={t("create")} className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
            <AddModal handleShow={addPerksModal} handleClose={() =>setAddPerksModal(false)} userID={userID} />
            <EditModalPerks handleShow={editPerksModal} handleClose={() => setEditPerksModal(false)} data={selectedPerks} userID={userID} />
        </>
    )
}