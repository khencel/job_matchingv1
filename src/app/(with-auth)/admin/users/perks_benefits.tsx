

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




interface PerksBenefitsProps {
    handleShow: boolean;
    handleClose: () => void;
    userID?: string;
}


export default function PerksBenefits({handleShow, handleClose, userID}: PerksBenefitsProps){
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
            title: "Delete Perks & Benefits",
            text: "Are you sure you want to delete this Perks & Benefits?",
            icon: "warning",
            onConfirm: async () => {
                try {
                    await dispatch(deletePerksBenefits(id)).unwrap();
                    await dispatch(indexPerksBenefitsByUserID(Number(userID)));
                    showSuccessToast("Delete Perks & Benefits","Perks & Benefits deleted successfully");
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
                <Modal.Title>Perks & Benefits</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12 justify-content-end d-flex mb-3">
                            <button className="btn btn-primary-custom rounded-3 " onClick={handleAddPerks}>Add Perks & Benefits</button>
                        </div>
                        <div className="col-12 mt-2">
                            <table className='table table-hover'>
                                <thead>
                                    <tr>   
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Action</th>
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
                                                        <button className="btn btn-sm btn-primary me-1" onClick={() => handleEdit(item)}>Edit</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => (handleDelete(item.id))}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className='text-center' colSpan={7}>No perks & benefits found.</td>
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
                    Cancel
                </Button>
                    <AddButton label="Create" className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
            <AddModal handleShow={addPerksModal} handleClose={() =>setAddPerksModal(false)} userID={userID} />
            <EditModalPerks handleShow={editPerksModal} handleClose={() => setEditPerksModal(false)} data={selectedPerks} userID={userID} />
        </>
    )
}