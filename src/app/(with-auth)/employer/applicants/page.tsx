import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { AddButton } from "@/components/Button";
import { FaPlus } from "react-icons/fa6";

export default function Applicants(){
    return (
            <>
                <div className="row standar-div">
                    <div className="col">
                        <h5><strong><BiArrowBack /> Applicants</strong></h5>
                    </div>
                </div>
    
                <div className="row standar-div mt-2">
                    <div className="col">
                        <h4 className="text-primary text-center"><span><strong>Total Applicants: 100</strong></span></h4>
                    </div>
                </div>
    
                <div className="row standar-div">
                    <div className="col">
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Hiring Stage</th>
                                            <th>Applied Date</th>
                                            <th>Job Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                                                            </div>
                                                        </div>
                                                        <div className="col-10 pt-1">
                                                            <span className="text-primary">Khenneth Alaiza</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge border border-dark text-black p-2 rounded-4">Shortlisted</span>
                                                </td>
                                                <td><span className="text-primary">December 12, 2025</span></td>
                                                <td><span className="text-primary">Cloud Engineer</span></td>
                                                <td>
                                                    <button className="btn btn-primary-custom rounded-3">See Application</button>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </>
                    </div>
                </div>
                <div className="row standar-div mt-2">
                    <div className="col">
                        {/* Pagination Controls */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex align-items-center">
                                    <label className="me-2">Items per page:</label>
                                    <select 
                                        className="form-select form-select-sm" 
                                        style={{ width: 'auto' }}
                                        
                                       
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="ms-3 text-muted">
                                        Showing 1 to 0 of 0
                                    </span>
                                </div>

                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className="">
                                            <button 
                                                className="page-link" 
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        
                                       
                                            <li 
                                               
                                                className=""
                                            >
                                                <button 
                                                    className="page-link" 
                                                >
                                                   1
                                                </button>
                                            </li>
                                       
                                        
                                        <li >
                                            <button 
                                                className="page-link" 
                                        
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                    </div>
                </div>
                
            </>
        );
}