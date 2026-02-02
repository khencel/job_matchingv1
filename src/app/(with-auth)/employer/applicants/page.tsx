"use client"

import { useTranslations } from "next-intl";
import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { AddButton } from "@/components/Button";
import { FaPlus } from "react-icons/fa6";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchJobSeekerApplicant } from "@/redux/slices/employer/applicants/jobSeekerApplicantThunk";
import { setPage, setPageSize } from "@/redux/slices/employer/applicants/jobSeekerApplicantSlice";
import FormattedDate from "@/components/date_format";

export default function Applicants(){
    const t = useTranslations("employerApplicants");
    const dispatch = useAppDispatch();
    const {items, status, error, next, previous, currentPage, pageSize, count} = useSelector((state: RootState) => state.jobSeekerApplicant);
    

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSize(Number(e.target.value)));
        };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };
    console.log(items);
    
    const totalPages = Math.ceil(count / pageSize);

    useEffect(() => {
        dispatch(fetchJobSeekerApplicant({page: currentPage, pageSize: pageSize}));
    }, [dispatch]);

    return (
            <>
                <div className="row standar-div">
                    <div className="col">
                        <h5><strong><BiArrowBack /> {t("applicants")}</strong></h5>
                    </div>
                </div>
    
                <div className="row standar-div mt-2">
                    <div className="col">
                        <h4 className="text-primary text-center"><span><strong>{t("totalApplicants")}: {count}</strong></span></h4>
                    </div>
                </div>
    
                <div className="row standar-div">
                    <div className="col">
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>{t("fullName")}</th>
                                            <th>{t("hiringStage")}</th>
                                            <th>{t("appliedDate")}</th>
                                            <th>{t("jobRole")}</th>
                                            <th>{t("action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                items.map((item: any, index: number) => {
                                                    let name = item?.user?.userDetails?.firstName + " " + item?.user?.userDetails?.lastName
                                                    let job_role = item?.job_post?.jobPostDetails?.title
                                                    let avatar = item?.user?.avatar
                                                    let default_avatar = "/media/avatar/avatardefault.png"
                                                    return (
                                                        <tr key={item.id}> 
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="applicant_avatar" style={{backgroundImage:`url(http://127.0.0.1:8000${avatar?avatar:default_avatar})`}}>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-10 pt-1">
                                                                        <span className="text-primary text-capitalize">{name}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="badge border border-dark text-black p-2 rounded-4">{item.status?item.status:t("pending")}</span>
                                                            </td>
                                                            <td><span className="text-primary"><FormattedDate date={item.created_at} /></span></td>
                                                            <td><span className="text-primary">{job_role}</span></td>
                                                            <td>
                                                                <button className="btn btn-primary-custom rounded-3">{t("seeApplication")}</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                    </tbody>
                                </table>
                            </>
                    </div>
                </div>
                
                {/* Pagination Controls */}
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