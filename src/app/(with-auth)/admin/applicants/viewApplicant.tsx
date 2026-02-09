import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { FaFileAlt, FaDownload, FaBirthdayCake, FaMapMarkedAlt, FaLocationArrow, FaEnvelope, FaFacebook  } from "react-icons/fa";
import FormattedDate from '@/components/date_format';
import { FiLayers } from "react-icons/fi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useTranslations } from 'next-intl';

interface ViewApplicantProps {
    handleShow: boolean;
    handleClose: () => void;
    data: any;
}

export default function ViewApplicant({handleShow, handleClose, data}: ViewApplicantProps){
    const t = useTranslations("adminApplicantsViewApplicant");
    const userdata = data?.user?.userDetails;

    const handleDownloadResume = (data: any) => {
        const baseUrl = "http://127.0.0.1:8000";
        const filePath = data?.user?.resume?.resume;

        if (!filePath) return alert(t("noResumeAlert"));

        const fileUrl = `${baseUrl}${filePath}`;

        window.open(fileUrl, "_blank");
    };
    
    return (
        <Modal 
            show={handleShow} 
            onHide={handleClose}
            size="xl"
        >
            <Modal.Header closeButton>
            <Modal.Title>{t("title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-2 p-3">
                        <div className='applicant_avatar text-center' style={{backgroundImage:`url('http://127.0.0.1:8000${data?.user?.avatar || '/media/avatar/avatardefault.png'}')`,width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%', margin: '0 auto'   }}>
                           
                        </div>
                    </div>
                    <div className="col-10 p-3">
                        <h5><strong className='text-capitalize'>{userdata?.firstName} {userdata?.lastName}</strong></h5>
                        <small>{t("roleSample")}</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        
                        <div className="row mt-5">
                            <div className="col">
                                <strong>{t("biography")}</strong>
                                <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore cum velit excepturi modi impedit nam distinctio voluptates totam at quidem, nulla temporibus aperiam, exercitationem obcaecati labore molestiae corporis tempora? Nam!
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col">
                                <strong>{t("coverLetter")}</strong>
                                <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore cum velit excepturi modi impedit nam distinctio voluptates totam at quidem, nulla temporibus aperiam, exercitationem obcaecati labore molestiae corporis tempora? Nam!
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
                                        {t("dateOfBirth")}
                                        <br />
                                        <strong><FormattedDate date={userdata?.birthdate} /></strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    <FaFileAlt  className='text-primary' />
                                    <small>
                                        <br />
                                        {t("visaStatus")}
                                        <br />
                                        <strong>{userdata?.visaStatus}</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    <FiLayers  className='text-primary' />
                                    <small>
                                        <br />
                                        {t("japaneseLevel")}
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
                                        {t("nationality")}
                                        <br />
                                        <strong>{userdata?.nationality}</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    <BsGenderAmbiguous  className='text-primary' />
                                    <small>
                                        <br />
                                        {t("gender")}
                                        <br />
                                        <strong>{userdata?.gender}</strong>
                                    </small>
                                </div>

                                <div className='mt-4'>
                                    <GiGraduateCap  className='text-primary' />
                                    <small>
                                        <br />
                                        {t("major")}
                                        <br />
                                        <strong>{userdata?.highestEducation}</strong>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col p-3 border download-border-applicant rounded-3">
                                {t("downloadResume")}
                                <br />
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaFileAlt style={{fontSize:"50px"}} />
                                    </div>
                                    <div className="col-6">
                                        <small>
                                            {t("resumeName")}
                                            <br />
                                            <strong>
                                                {t("resumeType")}
                                            </strong>
                                        </small>
                                    </div>
                                    <div className="col-3">
                                        <div className=' p-2 text-primary text-end' >
                                            <FaDownload onClick={() => handleDownloadResume(data)} style={{fontSize:"30",cursor:'pointer'}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col p-3 border download-border-applicant rounded-3">
                                {t("contactInfo")}
                                <br />
                                <div className='row mt-3'>
                                    <div className="col-2 text-center">
                                        <FaLocationArrow className='text-primary' style={{fontSize:"25px"}} />
                                    </div>
                                    <div className="col-9">
                                        <small>
                                            {t("location")}
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
                                            {t("telephone")}
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
                                            {t("email")}
                                            <br />
                                            <strong>
                                                {data?.user?.email || t("noEmail")}
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
                                            {t("facebook")}
                                            <br />
                                            <strong>
                                                {userdata?.facebook || t("noFacebook")}
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
                {t("close")}
            </Button>
               
            </Modal.Footer>
        </Modal>
    )
}