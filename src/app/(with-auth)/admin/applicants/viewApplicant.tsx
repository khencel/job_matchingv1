import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { FaFileAlt, FaDownload  } from "react-icons/fa";

interface ViewApplicantProps {
    handleShow: boolean;
    handleClose: () => void;
    data: any;
}

export default function ViewApplicant({handleShow, handleClose, data}: ViewApplicantProps){
    
    const userdata = data?.user?.userDetails;
    
    return (
        <Modal 
            show={handleShow} 
            onHide={handleClose}
            size="xl"
        >
            <Modal.Header closeButton>
            <Modal.Title>Applicant Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-2 p-3">
                        <div className='applicant_avatar text-center' style={{backgroundImage:`url('http://127.0.0.1:8000${userdata?.avatar}')`,width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%', margin: '0 auto'   }}>
                           
                        </div>
                    </div>
                    <div className="col-10 p-3">
                        <h5><strong className='text-capitalize'>{userdata?.first_name} {userdata?.last_name}</strong></h5>
                        <small>Software Engineer</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        
                        <div className="row mt-5">
                            <div className="col">
                                <strong>BIOGRAPHY</strong>
                                <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore cum velit excepturi modi impedit nam distinctio voluptates totam at quidem, nulla temporibus aperiam, exercitationem obcaecati labore molestiae corporis tempora? Nam!
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col">
                                <strong>Cover Letter</strong>
                                <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore cum velit excepturi modi impedit nam distinctio voluptates totam at quidem, nulla temporibus aperiam, exercitationem obcaecati labore molestiae corporis tempora? Nam!
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 ">
                        <div className="row standar-div">
                            <div className="col-6">
                                <div>
                                    logo
                                    <small>
                                        <br />
                                        DATE OF BIRTH
                                        <br />
                                        <strong>November 11, 1990</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    logo
                                    <small>
                                        <br />
                                        VISA STATUS
                                        <br />
                                        <strong>November 11, 1990</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    logo
                                    <small>
                                        <br />
                                        JAPANESE LANGUAGE LEVEL
                                        <br />
                                        <strong>November 11, 1990</strong>
                                    </small>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    logo
                                    <small>
                                        <br />
                                        NATIONALITY
                                        <br />
                                        <strong>November 11, 1990</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    logo
                                    <small>
                                        <br />
                                        GENDER
                                        <br />
                                        <strong>November 11, 1990</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    logo
                                    <small>
                                        <br />
                                        VOCATIONAL MAJOR
                                        <br />
                                        <strong>November 11, 1990</strong>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col p-3 border download-border-applicant rounded-3">
                                Download My Resume
                                <br />
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaFileAlt style={{fontSize:"50px"}} />
                                    </div>
                                    <div className="col-6">
                                        <small>
                                            Esther Howard
                                            <br />
                                            <strong>
                                                PDF
                                            </strong>
                                        </small>
                                    </div>
                                    <div className="col-3">
                                        <div className=' p-2 text-primary text-end' style={{cursor:'pointer'}}>
                                            <FaDownload style={{fontSize:"30"}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col p-3 border download-border-applicant rounded-3">
                                Contact Information
                                <br />
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaFileAlt style={{fontSize:"50px"}} />
                                    </div>
                                    <div className="col-9">
                                        <small>
                                            Location
                                            <br />
                                            <strong>
                                                Calibuyo, Tanza Cavite
                                            </strong>
                                        </small>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaFileAlt style={{fontSize:"50px"}} />
                                    </div>
                                    <div className="col-9">
                                        <small>
                                            Location
                                            <br />
                                            <strong>
                                                Calibuyo, Tanza Cavite
                                            </strong>
                                        </small>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaFileAlt style={{fontSize:"50px"}} />
                                    </div>
                                    <div className="col-9">
                                        <small>
                                            Location
                                            <br />
                                            <strong>
                                                Calibuyo, Tanza Cavite
                                            </strong>
                                        </small>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaFileAlt style={{fontSize:"50px"}} />
                                    </div>
                                    <div className="col-9">
                                        <small>
                                            Location
                                            <br />
                                            <strong>
                                                Calibuyo, Tanza Cavite
                                            </strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
               
            </Modal.Footer>
        </Modal>
    )
}