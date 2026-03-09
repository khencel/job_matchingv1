import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';


interface AddModalProps {
    handleShow: boolean;
    handleClose: () => void;
}

export default function CompanyAdd({ handleShow, handleClose }: AddModalProps) {
    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <h1>test</h1>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                    <AddButton  label="Create" className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
        </>
    );
}