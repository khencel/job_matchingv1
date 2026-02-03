import { BiArrowBack } from "react-icons/bi";
import { FaBriefcase, FaFileInvoice, FaGift} from "react-icons/fa6";

export default function HeaderPostAJob(){
    return(
        <>
            <div className="emp-component-style">
                <div className="row">
                    <div className="col ">
                        <h5><strong><BiArrowBack /> Post a Job</strong></h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <div className="row">
                                <div className="col-4">
                                    <div className="emp-icon-style d-flex justify-content-center align-items-center h-100">
                                        <FaBriefcase />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="primary-text"><small>Step 1 of 3</small></div>
                                    <div>
                                        <small>
                                            <strong>Job Information</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <div className="row">
                                <div className="col-4">
                                    <div className="emp-icon-style d-flex justify-content-center align-items-center h-100">
                                        <FaFileInvoice />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="primary-text"><small>Step 2 of 3</small></div>
                                    <div>
                                        <small>
                                            <strong>Job Description</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <div className="row">
                                <div className="col-4">
                                    <div className="emp-icon-style d-flex justify-content-center align-items-center h-100">
                                        <FaGift />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="primary-text"><small>Step 3 of 3</small></div>
                                    <div>
                                        <small>
                                            <strong>Information</strong>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}