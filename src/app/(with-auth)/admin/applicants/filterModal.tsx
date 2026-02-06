
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useState } from 'react';

interface FilterModalProps {
    handleShow: boolean;
    handleClose: () => void;
    companyList:[];
    onApplyFilter:(filterData: 
                    {
                        company?: string,
                        gender?: string,
                        visa?:string,
                        firstName?:string,
                        lastName?:string,
                        startAge?: number
                    }
    ) => void
}

export default function FilterModal({handleShow, handleClose, companyList, onApplyFilter}: FilterModalProps){
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedVisa, setSelectedVisa] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [startAge, setStartAge] = useState<number>(0);

    const handleApply = () => {
        onApplyFilter({ 
                        company: selectedCompany, 
                        gender: selectedGender, 
                        visa: selectedVisa,
                        firstName: firstName,
                        lastName:lastName,
                        startAge:startAge
                    });
        handleClose();
    }
    
    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Perks & Benefits</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <strong>Company:</strong>
                            <br />
                            <select name="" id="" className='form-control' 
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                            >
                                <option value="" disabled  hidden>Select Company</option>
                                <option value="">None</option>
                                {
                                    companyList.map((item:any,index:number) => {
                                        return (
                                            <option value={item.userDetails_emp.company_information.name} key={index}>{item.userDetails_emp.company_information.name}</option>
                                        )
                                    })
                                }
                                
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                            <div className="col">
                                <strong>First Name:</strong>
                                <br />
                                <input type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>

                            <div className="col">
                                <strong>Last Name:</strong>
                                <br />
                                <input type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <strong>Gender:</strong>
                            <br />
                            <select name="" id=""
                                className='form-control'
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                <option value="" disabled hidden>Select Gender</option>
                                <option value="">None</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col">
                            <strong>Visa Status:</strong>
                            <br />
                            <select name="" id=""
                                className='form-control'
                                value={selectedVisa}
                                onChange={(e) => setSelectedVisa(e.target.value)}
                            >
                                <option value="" disabled hidden>Select Status</option>
                                <option value="">None</option>
                                <option value="APPLIED">Applied</option>
                                <option value="PENDING">Pending</option>
                                <option value="REVIEWING">Under Review</option>
                                <option value="ISSUED">Issued</option>
                                <option value="DENIED">Denied</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <strong>Start age above:</strong>
                            <br />
                            <input type="number" value={startAge} onChange={(e) => setStartAge(Number(e.target.value))} className='form-control' placeholder='Ex. 18/20/30' />
                            
                        </div>

                        {/* <div className="col">
                            <strong>Visa Status:</strong>
                            <br />
                            <select name="" id=""
                                className='form-control'
                                value={selectedVisa}
                                onChange={(e) => setSelectedVisa(e.target.value)}
                            >
                                <option value="" disabled hidden>Select Status</option>
                                <option value="">None</option>
                                <option value="APPLIED">Applied</option>
                                <option value="PENDING">Pending</option>
                                <option value="REVIEWING">Under Review</option>
                                <option value="ISSUED">Issued</option>
                                <option value="DENIED">Denied</option>
                            </select>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    <AddButton label="Apply Filter" onClick={handleApply} className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
        </>
    )
}