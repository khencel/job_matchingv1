import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';


interface ViewFileProps {
    handleShow: boolean;
    handleClose: () => void;
    file?: string;
}


export default function ViewFile({ handleClose, handleShow, file }: ViewFileProps) {
    return (
        <Modal size='xl' show={handleShow} onHide={handleClose}>
            <Modal.Body>
                <iframe src={`${file}#zoom=100`} style={{width:"100%",height:"500px"}}></iframe>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                
            </Modal.Footer>
        </Modal>
    )
}