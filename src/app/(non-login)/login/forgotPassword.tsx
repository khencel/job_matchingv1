import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useTranslations } from "next-intl";
import { useAppDispatch } from '@/redux/hooks';
import { forgotPassword } from '@/redux/slices/auth/genericAuthThunk';
import { useState } from 'react';



interface ForgotPasswordModal{
    handleShow: boolean;
    handleClose: () => void;
}

export default function ForgotPassword({handleClose, handleShow}: ForgotPasswordModal){
    const t = useTranslations("forgotPassword");
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");

    const payload = {
        "email":email,
        "context":{
            "title":t('emailFormat.title'),
            "hello":t('emailFormat.hello'),
            "subtext":t('emailFormat.subtext'),
            "subtext1":t('emailFormat.subtext1'),
            "subtext2":t('emailFormat.subtext2'),
            "regards":t('emailFormat.regards'),
            "suppoert":t('emailFormat.support'),
            "resetButton":t('emailFormat.resetButton')
        }
    }

    const handleSubmit = () => {
        dispatch(forgotPassword(payload))
    }

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{t('modal.header')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row m-0">
                        <div className="col">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control rounded-5' placeholder={t('modal.placeholder')} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('modal.cancel')}
                </Button>
                    <AddButton className='btn btn-primary-custom rounded-3' onClick={handleSubmit} label={t('modal.button')} icon={null} /> 
                </Modal.Footer>
            </Modal>
        </>
    )
}