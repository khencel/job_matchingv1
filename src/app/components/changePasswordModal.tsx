"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { changePassword } from '@/redux/slices/applicants/userThunk';
import { popup } from '@/helper/pop_up';
import { showSuccessToast } from '../(util)/toaster';
import { useTranslations } from "next-intl";

interface ChangePasswordProps {
    handleShow: boolean;
    handleClose: () => void;
}

export default function ChangePassword({
    handleShow,
    handleClose,
}: ChangePasswordProps) {
    const t = useTranslations("changePasswordModal");
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
            setForm({ ...form, error: t("validation.allFieldsRequired") });
            return;
        }

        if (newPassword !== confirmPassword) {
            setForm({ ...form, error: t("validation.passwordMismatch") });
            return;
        }

        setForm({ ...form, error: "" });
    
        try {

            popup({
                title: t("modal.title"),
                text: t("modal.confirmMessage"),
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
                    showSuccessToast(t("modal.successTitle"), t("modal.successMessage"))
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
                <Modal.Title>{t("modal.title")}</Modal.Title>
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
                        placeholder={t("fields.currentPassword")}
                        value={form.currentPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        name="newPassword"
                        type="password"
                        className="form-control"
                        placeholder={t("fields.newPassword")}
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <input
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder={t("fields.confirmNewPassword")}
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("buttons.cancel")}
                </Button>
                <AddButton
                    label={t("buttons.changePassword")}
                    className="btn btn-primary-custom rounded-3"
                    icon={null}
                    onClick={handleSubmit}
                />
            </Modal.Footer>
        </Modal>
    );
}
