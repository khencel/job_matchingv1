"use client"

import { useTranslations } from "next-intl";
import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { setPage, setPageSize } from "@/redux/slices/applicants/userSlice";
import { useEffect, useState } from "react";
import { fetchUsers, updateStatus } from "@/redux/slices/applicants/userThunk";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";

export default function AdminUsers() {
    const t = useTranslations("adminUsers");
    const {items, status, error, next, previous, currentPage, pageSize, count}= useSelector((state: RootState) => state.getAllUserByFilter);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<{ role: string }>({ role: "all" });

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSize(Number(e.target.value)));
        };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };

    const totalPages = Math.ceil(count / pageSize);
    
    const handleFilter = (val:string) => {
        setFilter({ role: val });
        dispatch(setPage(1));
    }


    useEffect(() => {
        dispatch(fetchUsers({
            page: currentPage,
            pageSize,
            filter
        }));
    }, [dispatch, currentPage, pageSize, filter]);

    return (
    <>
        <div className="row standar-div">
            <div className="col">
                <h5><strong><BiArrowBack /> {t("usersListing")}</strong></h5>
            </div>
            <div className="col text-end">
                <span>{t("dateRange")} <FaCalendarCheck className="text-primary" /></span>
            </div>
        </div>

        <div className="row standar-div mt-2">
            <div className="col">
                <strong>{t("usersList")} ({count} {t("total")})</strong>
            </div>
            <div className="col-2 text-end">
                <FaSearch className="text-primary" /> {t("searchUsers")}
            </div>
            <div className="col-2 text-end">
                <button
                className="btn btn-link dropdown-toggle text-primary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
            <FaSliders className="me-1" /> {t("filter")}
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("all")}>{t("filterAll")}</button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("job_seeker")}>{t("filterJobSeeker")}</button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("employer")}>{t("filterEmployer")}</button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("supervisory")}>{t("filterSupervisory")}</button>
            </li>
        </ul>
            </div>
        </div>

        <div className="row standar-div">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-start p-2">{t("name")}</th>
                                <th className="text-start p-2">{t("email")}</th>
                                <th className="text-start p-2">{t("role")}</th>
                                <th className="text-start p-2">{t("status")}</th>
                                <th className="text-start p-2">{t("joined")}</th>
                                <th className="text-start p-2">{t("action")}</th>
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
                                            <td className="text-start p-2">{item.is_active?t("active"):t("notActive")}</td>
                                            <td className="text-start p-2">{item.created_at}</td>

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
                                                        {item.role === "employer" && (
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <button className="dropdown-item">{t("deactivate")}</button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item">{t("activate")}</button>
                                                                </li>
                                                    
                                                            </ul>
                                                        )}

                                                        {item.role === "job_seeker" && (
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <button className="dropdown-item">{t("deactivate")}</button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item">{t("activate")}</button>
                                                                </li>
                                                    
                                                            </ul>
                                                        )}

                                                        {item.role === "supervisory" && (
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <button className="dropdown-item">{t("deactivate")}</button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item">{t("activate")}</button>
                                                                </li>
                                                    
                                                            </ul>
                                                        )}

                                                        {item.role === "admin" && (
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <button className="dropdown-item">{t("deactivate")}</button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item">{t("activate")}</button>
                                                                </li>
                                                    
                                                            </ul>
                                                        )}
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

        <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
            <label className="me-2">{t("itemsPerPage")}:</label>
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
                {t("showing")} {((currentPage - 1) * pageSize) + 1} {t("to")} {Math.min(currentPage * pageSize, count)} {t("of")} {count}
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
                        {t("previous")}
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
                        {t("next")}
                    </button>
                </li>
            </ul>
        </nav>
    </div>
    </>
    );
}