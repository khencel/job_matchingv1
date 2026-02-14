"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useTranslations } from "next-intl";


interface ViewFileProps {
    handleShow: boolean;
    handleClose: () => void;
    file?: string;
}


export default function ViewFile({ handleClose, handleShow, file }: ViewFileProps) {
    const t = useTranslations("adminApplicants");
    return (
        <Modal size='xl' show={handleShow} onHide={handleClose}>
            <Modal.Body>
                <iframe src={`${file}#zoom=100`} style={{width:"100%",height:"500px"}}></iframe>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("buttons.close")}
                </Button>
                
            </Modal.Footer>
        </Modal>
    )
}