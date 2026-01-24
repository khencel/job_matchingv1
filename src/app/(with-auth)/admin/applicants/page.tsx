"use client";

import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAppDispatch } from "@/redux/hooks";
import { fetchApplicants } from "@/redux/slices/applicants/applicantThunk";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setPageSize, setPage } from "@/redux/slices/applicants/applicantSlice";
import FormattedDate from "@/components/date_format";
import { useState } from "react";
import ViewEmployer from "./viewEmployer";
import ViewApplicant from "./viewApplicant";
import { popup } from "@/helper/pop_up";
import { updateStatus } from "@/redux/slices/applicants/applicantThunk";
import { showSuccessToast } from "@/app/(util)/toaster";

export default function AdminApplicants() {
    const dispatch = useAppDispatch();
    const {items, status, error, next, previous, currentPage, pageSize, count}= useSelector((state: RootState) => state.applicants);
    const [showEmployer, setShowEmployer] = useState(false);
    const [showApplicant, setShowApplicant] = useState(false);

    const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSize(Number(e.target.value)));
        };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };

    const totalPages = Math.ceil(count / pageSize);


    const handleViewEmployer = (data: any) => {
        setShowEmployer(true);
        setSelectedEmployer(data);
    }
    
    const handleViewApplicant = (data: any) => {
        setShowApplicant(true);
        setSelectedApplicant(data);
    }

    const handleChangeStatus = (id:number,status: string) => {
        const payload = {
            id,
            status
        }
        popup({
            title: "Are you sure?",
            text: "Change status for this applicant?",
            confirmText: "Yes",
            icon: "warning",
            onConfirm: () => {
                dispatch(updateStatus(payload))
                .unwrap()
                .then(() => {
                    dispatch(fetchApplicants({ page: currentPage, pageSize }));
                    showSuccessToast('Change status','Status has been change')
                })
                .catch((err) => {
                    console.error("Failed to update status:", err);
                })
            },
        });
    }

    
    console.log(items);
    
    useEffect(() => {
        dispatch(fetchApplicants({page: currentPage, pageSize}));
    }, [dispatch]);
    return (
        <>
            <div className="row standar-div">
                <div className="col">
                    <h5><strong><BiArrowBack /> Applicants Listing</strong></h5>
                </div>
                <div className="col text-end">
                    <span>November - December 2025 <FaCalendarCheck className="text-primary" /></span>
                </div>
            </div>

            <div className="row standar-div mt-2">
                <div className="col">
                    <strong>Users List ({count} total)</strong>
                </div>
                {/* <div className="col-2 text-end">
                    <FaSearch className="text-primary" /> Search Users
                </div> */}
                <div className="col-2 text-end">
                    <FaSliders className="text-primary" /> Filter
                </div>
            </div>

            <div className="row standar-div">
                    <div className="col">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-start p-2">Full Name</th>
                                    <th className="text-start p-2">Hiring Stage</th>
                                    <th className="text-start p-2">Joined</th>
                                    <th className="text-start p-2">Job Role</th>
                                    <th className="text-start p-2">Employer</th>
                                    <th className="text-start p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-start p-2 text-capitalize">{item.user.userDetails.firstName} {item.user.userDetails.lastName}</td>
                                                <td className="text-start p-2"><span className={`badge bg-default border border-dark ${item?.status == 'approved'?'bg-success':'bg-danger'}`}>{item.status || 'pending'}</span></td>
                                                <td className="text-start p-2"><FormattedDate date={item.created_at} /></td>
                                                <td className="text-start p-2">{item.job_post.jobPostDetails?.title}</td>
                                                <td className="text-start p-2">{item.job_post.employerDetails.userDetails_emp.company_information.name}</td>
                                                <td className="text-start p-2">
                                                    <div className="dropdown">
                                                        <button
                                                        className="btn btn-sm btn-light"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        >
                                                        <HiDotsHorizontal />
                                                        </button>

                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => handleViewEmployer(item)}>View Employer</button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => handleViewApplicant(item)}>View Applicant</button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item text-success" onClick={() => handleChangeStatus(item.id,"approved")}>Approved</button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item text-danger" onClick={() => handleChangeStatus(item.id, "rejected")}>Reject</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            </div>


            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">
                    <label className="me-2">Items per page:</label>
                    <select 
                        className="form-select form-select-sm" 
                        style={{ width: 'auto' }}
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="ms-3 text-muted">
                        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, count)} of {count}
                    </span>
                </div>

                <nav>
                    <ul className="pagination mb-0">
                        <li className={`page-item ${!previous ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!previous}
                            >
                                Previous
                            </button>
                        </li>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <li 
                                key={index + 1} 
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        
                        <li className={`page-item ${!next ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!next}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ViewEmployer 
                showModalEdit={showEmployer} 
                closeModalEdit={() => setShowEmployer(false)} 
                data={selectedEmployer} 
            />

            <ViewApplicant 
                handleShow={showApplicant} 
                handleClose={() => setShowApplicant(false)} 
                data={selectedApplicant} 
            />  
        </>
    );
}