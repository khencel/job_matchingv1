import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { changePassword } from '@/redux/slices/applicants/userThunk';
import { popup } from '@/helper/pop_up';
import { showSuccessToast } from '../(util)/toaster';

interface ChangePasswordProps {
    handleShow: boolean;
    handleClose: () => void;
}

export default function ChangePassword({
    handleShow,
    handleClose,
}: ChangePasswordProps) {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        error: "",
    });

    const resetForm = () => {
        setForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            error: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    const handleSubmit = async () => {
        const { currentPassword, newPassword, confirmPassword } = form;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setForm({ ...form, error: "All fields are required" });
            return;
        }

        if (newPassword !== confirmPassword) {
            setForm({ ...form, error: "New password does not match" });
            return;
        }

        setForm({ ...form, error: "" });
    
        try {

            popup({
                title:"Change Password",
                text:"Are you sure, you want to change your password?",
                icon:"warning",
                onConfirm: async () => { 
                    const res = await dispatch(
                        changePassword({
                            current_password:currentPassword,
                            new_password:newPassword
                        })
                    ).unwrap()
                    if(res.value === false){
                        setForm({ ...form, error: res.message });
                        return
                    }
                    showSuccessToast("Change Password","Password has been change!")
                    resetForm()
                    handleClose();
                },
            })
            
            
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <Modal show={handleShow} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {form.error && (
                    <div className="alert alert-danger py-2">
                        {form.error}
                    </div>
                )}

                <div className="mb-3">
                    <input
                        name="currentPassword"
                        type="password"
                        className="form-control"
                        placeholder="Current Password"
                        value={form.currentPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        name="newPassword"
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <input
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm New Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <AddButton
                    label="Change Password"
                    className="btn btn-primary-custom rounded-3"
                    icon={null}
                    onClick={handleSubmit}
                />
            </Modal.Footer>
        </Modal>
    );
}
