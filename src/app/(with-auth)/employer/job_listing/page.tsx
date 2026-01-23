"use client"

import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { listJobPost, deleteJobPost } from "@/redux/features/job_post/job_post_thunk";

import { setPage, setPageSize } from "@/redux/slices/employer/post_a_job/JobListing";
import { popup } from "@/helper/pop_up";
import Editmodal from "./edit_modal";
import Cookies from "js-cookie";
import { showSuccessToast } from "@/app/(util)/toaster";



export default function JobListing() {
    const dispatch = useAppDispatch();
    const { items, status, error, loading, count, next, previous, currentPage, pageSize } = 
        useSelector((state: RootState) => state.jobListing);
    
    
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const handleClose = () => setShowModal(false);

    
    useEffect(() => {
        const userId = Number(Cookies.get("user_id"));
        if (userId) {
            dispatch(listJobPost({ userId, page: currentPage, pageSize }));
        }
    }, [dispatch, currentPage, pageSize]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageSize(Number(e.target.value)));
    };

    const totalPages = Math.ceil(count / pageSize);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleDelete = (id: number) => {
        popup({
        title: "Delete job post?",
        text: "Job post will be deleted",
        confirmText: 'yes, Delete it!',
        icon:"warning",
        onConfirm: () => {
                btnDelete(id)
            }
        })
    }

    const btnDelete = async (id: number) => {
        const userId = Number(Cookies.get("user_id"));
        if (!userId) return;
        await dispatch(deleteJobPost(id));
        dispatch(listJobPost({ userId, page: currentPage, pageSize }));
        showSuccessToast("Success", "Job post deleted successfully");
    }


    const handleEdit = (data: any) => {
        setSelectedData(data);
        setShowModal(true);
    }

    return (
        <>
            <div className="row standar-div">
                <div className="col">
                    <h5><strong><BiArrowBack /> Job Listing</strong></h5>
                </div>
                <div className="col text-end">
                    <span>November - December 2025 <FaCalendarCheck className="text-primary" /></span>
                </div>
            </div>

            <div className="row standar-div mt-2">
                <div className="col">
                    <strong>Job List ({count} total)</strong>
                </div>
                <div className="col-2 text-end">
                    <FaSearch className="text-primary" /> Search Jobs
                </div>
                <div className="col-2 text-end">
                    <FaSliders className="text-primary" /> Filter
                </div>
            </div>

            <div className="row standar-div">
                <div className="col">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Role</th>
                                        <th>Date Posted</th>
                                        <th>Salary</th>
                                        <th>Job type</th>
                                        <th>Applicants</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: any) => (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{formatDate(item.created_at)}</td>
                                            <td>${item.salary.toLocaleString()}</td>
                                            <td>
                                                {item.type_of_emp.map((type: string, index: number) => (
                                                    <span key={index} className="badge rounded-4 p-2 bg-success me-1">
                                                        {type}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>{item.applicants || 0}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button
                                                    className="btn btn-link p-0"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    >
                                                    <HiDotsHorizontal size={20} />
                                                    </button>

                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <button className="dropdown-item" onClick={() => handleEdit(item)}>Edit</button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item text-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                                    </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

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
                    )}
                </div>
            </div>

            <Editmodal
                handleShow={showModal}
                handleClose={handleClose}
                data={selectedData}
                currentPage={currentPage}
            />
        </>
    );
}