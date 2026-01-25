"use client"

import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { setPage, setPageSize } from "@/redux/slices/applicants/userSlice";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/redux/slices/applicants/userThunk";

export default function AdminUsers() {
    
    const {items, status, error, next, previous, currentPage, pageSize, count}= useSelector((state: RootState) => state.getAllUserByFilter);
    const [filter, setFilter] = useState(null)
    const dispatch = useAppDispatch();

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSize(Number(e.target.value)));
        };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };

    const totalPages = Math.ceil(count / pageSize);
    
    const handleFilter = (filter_val:string) => {
        let newFilter: any = {};

        if(filter_val === "all"){
            newFilter = null
        }

        if(filter_val === "job_seeker"){
            newFilter.filter = { role: "job_seeker" };
        }

        if(filter_val === "employer"){
            newFilter.filter = { role: "employer" };
        }

        if(filter_val === "supervisory"){
            newFilter.filter = { role: "supervisory" };
        }

        setFilter(newFilter);
        dispatch(fetchUsers({ page: currentPage, pageSize, filter: newFilter }));
    }
    
    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, pageSize, filter }));
    }, [dispatch, currentPage, pageSize, filter]); // FIXED

    return (
    <>
        <div className="row standar-div">
            <div className="col">
                <h5><strong><BiArrowBack /> Users Listing</strong></h5>
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
                <button
                className="btn btn-link dropdown-toggle text-primary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
            <FaSliders className="me-1" /> Filter
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("all")}>All</button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("job_seeker")}>Job Seeker</button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("employer")}>Employer</button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("supervisory")}>Supervisory</button>
            </li>
        </ul>
            </div>
        </div>

        <div className="row standar-div">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-start p-2">Name</th>
                                <th className="text-start p-2">Email</th>
                                <th className="text-start p-2">Role</th>
                                <th className="text-start p-2">Status</th>
                                <th className="text-start p-2">Joined</th>
                                <th className="text-start p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item:any, index:number) => {
                                    let name = ""
                                    if(item.role === "job_seeker"){
                                        name = item?.userDetails_job_seeker?.jobSeekerData?.firstName + " " + item?.userDetails_job_seeker?.jobSeekerData?.lastName
                                    }
                                    if(item.role === "employer"){
                                        name = item?.userDetails_emp?.company_information?.name
                                    }
                                    if(item.role === "supervisory"){
                                        name = item?.userDetails_supervisory?.companyInfo?.companyName
                                    }
                                    return (
                                        <tr key={item.id}>
                                            <td className="text-start p-2">
                                                {name}
                                            </td>
                                            <td className="text-start p-2">{item.email}</td>
                                            <td className="text-start p-2">{item.role}</td>
                                            <td className="text-start p-2">{item.is_active?"Active":"Not active"}</td>
                                            <td className="text-start p-2">{item.created_at}</td>
                                            <td className="text-start p-2"><HiDotsHorizontal /></td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
        </div>

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