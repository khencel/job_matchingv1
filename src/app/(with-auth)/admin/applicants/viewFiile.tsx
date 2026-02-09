import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ViewFileModalProps {
    handleShow: boolean;
    handleClose: () => void;
    file?: string
}

export default function ViewFileModal({handleShow, handleClose, file}: ViewFileModalProps){
    return (
        <>
            <Modal size='xl' show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                   <iframe style={{width:"100%", height:"700px"}} src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/${file}#zoom=100`}></iframe>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}