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

export default function AdminApplicants() {
    const dispatch = useAppDispatch();
    const {items, status, error, next, previous, currentPage, pageSize, count}= useSelector((state: RootState) => state.applicants);

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSize(Number(e.target.value)));
        };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };

    const totalPages = Math.ceil(count / pageSize);

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
                <div className="col-2 text-end">
                    <FaSearch className="text-primary" /> Search Users
                </div>
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
                                    <th className="text-start p-2">Role</th>
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
                                                <td className="text-start p-2">john.doe@example.com</td>
                                                <td className="text-start p-2">Job Seeker</td>
                                                <td className="text-start p-2">Active</td>
                                                <td className="text-start p-2">2024-01-15</td>
                                                <td className="text-start p-2"><HiDotsHorizontal /></td>
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
        </>
    );
}