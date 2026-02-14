"use client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { contactUsEmailSend } from '@/redux/features/contactUsThunk';
import { useAppDispatch } from '@/redux/hooks';
import { useTranslations } from 'next-intl';

interface ContactUsModalPropd{
    showModal: boolean;
    handleClose: () => void;
}


export default function ContactUsmodal({showModal, handleClose}: ContactUsModalPropd) {
    const t = useTranslations("contactUsModal");
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        company: '',
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
        });
    
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!form.company.trim()) errors.company = t("validation.companyNameRequired");
        if (!form.name.trim()) errors.name = t("validation.nameRequired");
        if (!form.email.trim()) {
            errors.email = t("validation.emailRequired");
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = t("validation.invalidEmail");
        }
        if (!form.phone.trim()) errors.phone = t("validation.phoneRequired");
        if (!form.message.trim()) errors.message = t("validation.messageRequired");

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleClear = () => {
        setForm({
            company: '',
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
        setFormErrors({});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Invalid Form", formErrors);
            return;
        }

        setIsLoading(true);

        dispatch(contactUsEmailSend(form))
            .unwrap()
            .then((response) => {
                console.log(response);
                handleClear();   // move here
                handleClose();   // move here
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <>
            <style>
                {
                    `
                      
                        .card-contact{
                            background:#fff;
                            border:1px solid rgba(2,8,23,.08);
                            border-radius:22px;
                            box-shadow:0 14px 34px rgba(2, 8, 23, .10);
                            padding:26px;
                        }
                        .h1-contact{
                            margin:0 0 8px;
                            font-size:26px;
                            font-weight:1000;
                            letter-spacing:-.3px;
                        }
                        .desc-contact{
                            margin:0 0 22px;
                            color:#64748b;
                            line-height:1.8;
                            font-size:14px;
                        }

                        /* Form */
                        .form-grid-contact{
                            display:grid;
                            grid-template-columns:1fr 1fr;
                            gap:14px;
                        }
                        .field-contact{
                            display:flex;
                            flex-direction:column;
                            gap:8px;
                        }
                        label{
                            font-size:13px;
                            font-weight:900;
                        }
                        .req{color:#ef4444; margin-left:4px; font-weight:1000}
                        input, textarea{
                            width:100%;
                            border:1px solid #e5e7eb;
                            border-radius:12px;
                            padding:12px;
                            font:inherit;
                            outline:none;
                            background:#fff;
                        }
                        .textarea-contact{
                            min-height:160px;
                            resize:vertical;
                            line-height:1.7;
                        }
                        .full{grid-column:1 / -1}

                        .actions{
                            display:flex;
                            justify-content:flex-end;
                            gap:10px;
                            margin-top:18px;
                        }
                        .btn-contact{
                            height:44px;
                            padding:0 18px;
                            border-radius:12px;
                            border:1px solid rgba(47,120,255,.22);
                            font-weight:1000;
                            cursor:pointer;
                            background:#fff;
                            color:#0b4fd8;
                        }
                        .btn-contact.primary{
                            color:#fff;
                            background:linear-gradient(180deg, #2f78ff, #1f66ff);
                            box-shadow:0 16px 28px rgba(47,120,255,.18);
                        }

                      

                        @media (max-width: 720px){
                        .form-grid-contact{grid-template-columns:1fr}
                        }
                    `
                }
            </style>
            {isLoading && (
                <div className="loading-overlay">
                <div className="spinner-custom">{t("processing")}</div>
                </div>
            )}
            <Modal size='lg' show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="card-contact">
                        <span className='h1-contact'>{t("title")}</span>
                        <p className="desc-contact">
                            {t("description")}<br/>
                            {t("descriptionSubtext")}
                        </p>

                    
                        <form onSubmit={handleSubmit}>
                        <div className="form-grid-contact">
                            <div className="field-contact">
                                <label>{t("labels.companyName")}</label>
                                <input  name="company" value={form.company} onChange={handleChange} placeholder={t("placeholders.companyName")} />
                                {formErrors.company && (
                                    <span style={{ color: "red", fontSize: "12px" }}>{formErrors.company}</span>
                                )}
                            </div>
                            

                            <div className="field-contact">
                                <label>{t("labels.name")}</label>
                                <input  name="name" value={form.name} onChange={handleChange} placeholder={t("placeholders.name")} />
                                {formErrors.name && (
                                    <span style={{ color: "red", fontSize: "12px" }}>{formErrors.name}</span>
                                )}
                            </div>

                            <div className="field-contact">
                                <label>{t("labels.email")}</label>
                                <input  type="email" value={form.email} onChange={handleChange} name="email" placeholder={t("placeholders.email")} />
                                {formErrors.email && (
                                    <span style={{ color: "red", fontSize: "12px" }}>{formErrors.email}</span>
                                )}
                            </div>

                            <div className="field-contact">
                                <label>{t("labels.phone")}</label>
                                <input  name="phone" value={form.phone} onChange={handleChange} placeholder={t("placeholders.phone")} />
                                {formErrors.phone && (
                                    <span style={{ color: "red", fontSize: "12px" }}>{formErrors.phone}</span>
                                )}
                            </div>

                            <div className="field-contact full">
                                <label>{t("labels.subject")}</label>
                                <input name="subject" value={form.subject} onChange={handleChange} placeholder={t("placeholders.subject")} />
                                {formErrors.subject && (
                                    <span style={{ color: "red", fontSize: "12px" }}>{formErrors.subject}</span>
                                )}
                            </div>

                            <div className="field-contact full">
                                <label>{t("labels.message")}</label>
                                <textarea className='textarea-contact' name="message" value={form.message} onChange={handleChange} placeholder={t("placeholders.message")}></textarea>
                                {formErrors.message && (
                                    <span style={{ color: "red", fontSize: "12px" }}>{formErrors.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="actions">
                            <button type="button" className="btn" onClick={handleClear}>{t("buttons.clear")}</button>
                            <button type="submit" className="btn-contact primary">{t("buttons.send")}</button>
                        </div>
                        </form>
                    </section>
                </Modal.Body>
            </Modal>
        </>
    )
}


