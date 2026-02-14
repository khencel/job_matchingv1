"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { FaFileAlt, FaDownload, FaBirthdayCake, FaMapMarkedAlt, FaLocationArrow, FaEnvelope, FaFacebook  } from "react-icons/fa";
import FormattedDate from '@/components/date_format';
import { FiLayers } from "react-icons/fi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useState } from 'react';
import ViewFile from './viewFile';
import { useTranslations } from "next-intl";

interface ViewApplicantProps {
    handleShow: boolean;
    handleClose: () => void;
    data: any;
}

export default function ViewApplicant({handleShow, handleClose, data}: ViewApplicantProps){
    const t = useTranslations("adminApplicants");
    
    const userdata = data?.user?.userDetails;
    const [viewFile, setViewFile] = useState(false)
    const [file, setFile] = useState<string | undefined>()

    const handleDownloadResume = (data: any) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL;
        const filePath = data?.user?.resume?.resume;

        if (!filePath) return alert(t("applicantDetails.fallbacks.noResume"));

        const fileUrl = `${baseUrl}${filePath}`;

        window.open(fileUrl, "_blank");
    };
    console.log(data);
    
    const handleViewFile = (file:any, type:string) => {
        if(type == "document"){
            setFile(process.env.NEXT_PUBLIC_API_CONTENT_URL+'media/'+file)
        }else{
            setFile(process.env.NEXT_PUBLIC_API_CONTENT_URL+file)
        }
        
        setViewFile(true)
    }
    
    return (
        <>
                <Modal 
                show={handleShow} 
                onHide={handleClose}
                size="xl"
            >
                <Modal.Header closeButton>
                <Modal.Title>{t("applicantDetails.title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-2 p-3">
                            <div className='applicant_avatar text-center' style={{backgroundImage:`url('${process.env.NEXT_PUBLIC_API_CONTENT_URL}${data?.user?.avatar || '/media/placeholder.jpg'}')`,width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%', margin: '0 auto'   }}>
                            
                            </div>
                        </div>
                        <div className="col-10 p-3">
                            <h5><strong className='text-capitalize'>{userdata?.firstName} {userdata?.lastName}</strong></h5>
                            <small>{t("applicantDetails.roleFallback")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            
                            <div className="row mt-5">
                                <div className="col">
                                    <strong>{t("applicantDetails.sections.biography")}</strong>
                                    <br />
                                    {t("applicantDetails.placeholders.biography")}
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col">
                                    <strong>{t("applicantDetails.sections.coverLetter")}</strong>
                                    <br />
                                    {t("applicantDetails.placeholders.coverLetter")}
                                </div>
                            </div>

                            <hr />
                            <strong><h4>{t("applicantDetails.sections.documents")}</h4></strong>
                            {
                                data?.user?.documents?.map((item:any, index:number) => {
                                    let name = item.documents.split('/')
                                    return (
                                        <div className="row mt-4" key={index}>
                                            <div className="col p-3 border rounded-3">
                                                <div className='row mt-3'>
                                                    <div className="col-2 text-center">
                                                        <FaFileAlt style={{fontSize:"50px"}} />
                                                    </div>
                                                    <div className="col-3">
                                                        <button onClick={() => handleViewFile(item.documents,'document')} className='btn btn-primary-custom'>
                                                            {t("applicantDetails.labels.view")}
                                                        </button>
                                                    </div>
                                                    <div className="col-6">
                                                        <small>
                                                            {name[2]}
                                                            <br />
                                                            <strong>
                                                                {t("applicantDetails.labels.pdf")}
                                                            </strong>
                                                        </small>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <hr />
                            <strong>
                                <h4>{t("applicantDetails.sections.resume")}</h4>
                            </strong>
                            <div className="row mt-4">
                                <div className="col p-3 border rounded-3">
                                    <div className='row mt-3'>
                                        <div className="col-2 text-center">
                                            <FaFileAlt style={{fontSize:"50px"}} />
                                        </div>
                                        <div className="col-3">
                                            <button onClick={() => handleViewFile(data?.user?.resume?.resume,'resume')} className='btn btn-primary-custom'>
                                                {t("applicantDetails.labels.view")}
                                            </button>
                                        </div>
                                        <div className="col-3">
                                            <small>
                                                {t("applicantDetails.labels.customResume")}
                                                <br />
                                                <strong>
                                                    {t("applicantDetails.labels.pdf")}
                                                </strong>
                                            </small>
                                        </div>
                                        <div className="col-3">
                                            <div className=' p-2 text-primary text-end' >
                                                {/* <FaDownload onClick={() => handleDownloadResume(data)} style={{fontSize:"30",cursor:'pointer'}} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 ">
                            <div className="row standar-div">
                                <div className="col-6">
                                    <div>
                                        <FaBirthdayCake className='text-primary' />
                                        <small>
                                            <br />
                                            {t("applicantDetails.labels.dateOfBirth")}
                                            <br />
                                            <strong><FormattedDate date={userdata?.birthdate} /></strong>
                                        </small>
                                    </div>

                                    <div className='mt-4'>
                                        <FaFileAlt  className='text-primary' />
                                        <small>
                                            <br />
                                            {t("applicantDetails.labels.visaStatus")}
                                            <br />
                                            <strong>{userdata?.visaStatus}</strong>
                                        </small>
                                    </div>

                                    <div className='mt-4'>
                                        <FiLayers  className='text-primary' />
                                        <small>
                                            <br />
                                            {t("applicantDetails.labels.japaneseLevel")}
                                            <br />
                                            <strong>{userdata?.japaneseLevel}</strong>
                                        </small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <FaMapMarkedAlt   className='text-primary' />
                                        <small>
                                            <br />
                                            {t("applicantDetails.labels.nationality")}
                                            <br />
                                            <strong>{userdata?.nationality}</strong>
                                        </small>
                                    </div>

                                    <div className='mt-4'>
                                        <BsGenderAmbiguous  className='text-primary' />
                                        <small>
                                            <br />
                                            {t("applicantDetails.labels.gender")}
                                            <br />
                                            <strong>{userdata?.gender}</strong>
                                        </small>
                                    </div>

                                    <div className='mt-4'>
                                        <GiGraduateCap  className='text-primary' />
                                        <small>
                                            <br />
                                            {t("applicantDetails.labels.vocationalMajor")}
                                            <br />
                                            <strong>{userdata?.highestEducation}</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            

                            <div className="row mt-4">
                                <div className="col p-3 border download-border-applicant rounded-3">
                                    {t("applicantDetails.sections.contactInformation")}
                                    <br />
                                    <div className='row mt-3'>
                                        <div className="col-2 text-center">
                                            <FaLocationArrow className='text-primary' style={{fontSize:"25px"}} />
                                        </div>
                                        <div className="col-9">
                                            <small>
                                                {t("applicantDetails.labels.location")}
                                                <br />
                                                <strong>
                                                    {userdata?.currentPlaceResidence}
                                                </strong>
                                            </small>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className="col-2 text-center">
                                            <BsFillTelephoneFill className='text-primary'   style={{fontSize:"25px"}} />
                                        </div>
                                        <div className="col-9">
                                            <small>
                                                {t("applicantDetails.labels.telephone")}
                                                <br />
                                                <strong>
                                                    {userdata?.contactNo}
                                                </strong>
                                            </small>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className="col-2 text-center">
                                            <FaEnvelope className='text-primary' style={{fontSize:"25px"}} />
                                        </div>
                                        <div className="col-9">
                                            <small>
                                                {t("applicantDetails.labels.emailAddress")}
                                                <br />
                                                <strong>
                                                    {data?.user?.email || t("applicantDetails.fallbacks.noEmail")}
                                                </strong>
                                            </small>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className="col-2 text-center">
                                            <FaFacebook className='text-primary'  style={{fontSize:"25px"}} />
                                        </div>
                                        <div className="col-9">
                                            <small>
                                                {t("applicantDetails.labels.facebook")}
                                                <br />
                                                <strong>
                                                    {userdata?.facebook || t("applicantDetails.fallbacks.noFacebook")}
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
                    {t("buttons.close")}
                </Button>
                
                </Modal.Footer>
            </Modal>
            <ViewFile handleShow={viewFile} handleClose={()=>setViewFile(false)}  file={file}/>
        </>
        
    )
}