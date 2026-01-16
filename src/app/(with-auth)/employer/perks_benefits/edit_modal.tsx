import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { popup } from '@/helper/pop_up';
import { useAppDispatch } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { setField, resetForm } from '@/redux/slices/perks_benefits/perksBenefitsSlice';
import { PerksBenefitsItem } from '@/redux/slices/perks_benefits/perksBenefitsSlice';
import { FaSave } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { updatePerksBenefits } from '@/redux/slices/perks_benefits/perksBenefitsThunk';
import { showSuccessToast } from '@/app/(util)/toaster';


interface EditModalProps {
    showModalEdit: boolean;
    closeModalEdit: () => void;
    data: PerksBenefitsItem;
}

interface UpdatePerksPayload {
  id: number;
  name: string;
  description: string;
}


export default function EditModal({showModalEdit, closeModalEdit, data}: EditModalProps){
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<UpdatePerksPayload>({
        id: data?.id ?? 0,
        name: data?.name ?? "",
        description: data?.description ?? "",
    });


    useEffect(() => {
        if (data && showModalEdit) {
            setForm({
            id: data.id,
            name: data.name,
            description: data.description,
            });
        }
    }, [data, showModalEdit]);



    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleUpdate = () => {
        popup({
            title: "Update Perks & Benefits?",
            text: "Are you sure?",
            confirmText: "Yes",
            icon: "warning",
            onConfirm: () => {
                showSuccessToast('Update Item','Perks & Benefits updated successfully')
                dispatch(updatePerksBenefits(form));
                closeModalEdit();
            },
        });
    };

    

    return (
        <>
            <Modal show={showModalEdit} onHide={closeModalEdit}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Perks & Benefits</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <input 
                                className="form-control" 
                                placeholder="Name" 
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <textarea 
                                className="form-control" 
                                placeholder="Description" 
                                rows={5}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModalEdit}>
                    Close
                </Button>
                    <AddButton label="Save" className='btn btn-primary-custom rounded-3' onClick={handleUpdate} icon={<FaSave />} /> 
                </Modal.Footer>
            </Modal>
        </>
    )
}