
"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useState } from 'react';
import { useTranslations } from "next-intl";

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
    const t = useTranslations("adminApplicantsFilter");
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
                <Modal.Title>{t("title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <strong>{t("fields.company.label")}</strong>
                            <br />
                            <select name="" id="" className='form-control' 
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                            >
                                <option value="" disabled  hidden>{t("fields.company.placeholder")}</option>
                                <option value="">{t("options.none")}</option>
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
                                <strong>{t("fields.firstName.label")}</strong>
                                <br />
                                <input type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>

                            <div className="col">
                                <strong>{t("fields.lastName.label")}</strong>
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
                            <strong>{t("fields.gender.label")}</strong>
                            <br />
                            <select name="" id=""
                                className='form-control'
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                <option value="" disabled hidden>{t("fields.gender.placeholder")}</option>
                                <option value="">{t("options.none")}</option>
                                <option value="male">{t("fields.gender.options.male")}</option>
                                <option value="female">{t("fields.gender.options.female")}</option>
                            </select>
                        </div>

                        <div className="col">
                            <strong>{t("fields.visaStatus.label")}</strong>
                            <br />
                            <select name="" id=""
                                className='form-control'
                                value={selectedVisa}
                                onChange={(e) => setSelectedVisa(e.target.value)}
                            >
                                <option value="" disabled hidden>{t("fields.visaStatus.placeholder")}</option>
                                <option value="">{t("options.none")}</option>
                                <option value="APPLIED">{t("fields.visaStatus.options.applied")}</option>
                                <option value="PENDING">{t("fields.visaStatus.options.pending")}</option>
                                <option value="REVIEWING">{t("fields.visaStatus.options.underReview")}</option>
                                <option value="ISSUED">{t("fields.visaStatus.options.issued")}</option>
                                <option value="DENIED">{t("fields.visaStatus.options.denied")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <strong>{t("fields.startAge.label")}</strong>
                            <br />
                            <input
                                type="number"
                                value={startAge}
                                onChange={(e) => setStartAge(Number(e.target.value))}
                                className='form-control'
                                placeholder={t("fields.startAge.placeholder")}
                            />
                            
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
                    {t("buttons.close")}
                </Button>
                    <AddButton label={t("buttons.applyFilter")} onClick={handleApply} className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
        </>
    )
}