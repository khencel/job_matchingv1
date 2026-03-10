"use client";
import { BiArrowBack } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import { AddButton } from "@/components/Button";
import { FaPlus } from "react-icons/fa6";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { indexCompany, deleteCompany } from "@/redux/slices/employer/company/companyThunk";
import AddCompanyModal from "./add_modal";
import { setPage, setPageSize } from "@/redux/slices/employer/company/companySlice";
import { useTranslations } from "next-intl";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import { useRouter } from "next/navigation";

export default function CompanyPage() {
    const t = useTranslations("employerApplicants");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { companies, status, error, next, previous, currentPage, pageSize, count} = useSelector((state: RootState) => state.companySlice);
    
    const [showModal, setShowModal] = useState(false);

    const handleShowAddModal = () => {
        setShowModal(true);
    }

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                dispatch(setPageSize(Number(e.target.value)));
            };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };
    
    const totalPages = Math.ceil(count / pageSize);
    
    
    const handleDelete = (companyID: number) => {
        popup({
            title: t("deleteCompany"),
            text: t("deleteCompanyText"),
            icon: "warning",    
            onConfirm: async () => {
                dispatch(deleteCompany(companyID))
                .unwrap()
                .then((res) => {
                    showSuccessToast(t("deleted"), t("deletedText"));
                    dispatch(indexCompany({page: currentPage, pageSize: pageSize}));
                })
                .catch((err) => {
                    popup({
                        title: "Error",
                        text: "An error occurred while deleting the company: " + err,
                        icon: "error",
                    });
                });
            }
        })
    }

    const handleManage = (companyID: number) => {
        // Navigate to company profile page
        router.push(`/employer/company/profile?companyID=${companyID}`);
    }

    useEffect(() => {
        dispatch(indexCompany({page: currentPage, pageSize: pageSize}));
    }, [dispatch,currentPage,pageSize]);
    
    return (
            <>
                <div className="row standar-div">
                    <div className="col">
                        <h5><strong><BiArrowBack /> {t("companyList")}</strong></h5>
                    </div>
                    <div className="col text-end">
                        {/* <span>{t("dateRange")} <FaCalendarCheck className="text-primary" /></span> */}
                    </div>
                </div>
    
                <div className="row standar-div mt-2">
                    <div className="col">
                        <strong>{t("company")} ({count} {t("total")})</strong>
                    </div>
                    <div className="col-2 text-end">
                        {/* <button className="btn btn-primary-custom"> Add Perks & Benefits</button> */}
                        <AddButton  label={t("addCompany")} className="btn btn-primary-custom" icon={<FaPlus />} onClick={handleShowAddModal} />               
                    </div>
                </div>
    
                <div className="row standar-div">
                    <div className="col">
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>{t("companyTable.name")}</th>
                                            <th>{t("companyTable.jobPosting")}</th>
                                            <th>{t("companyTable.contact")}</th>
                                            <th>{t("companyTable.region")}</th>
                                            <th>{t("companyTable.address")}</th>
                                            <th>{t("companyTable.action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            companies?.map((company, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{company?.information.company_information?.name}</td>
                                                        <td>{company?.job_posting}</td>
                                                        <td>{company?.information.company_information?.phone}</td>
                                                        <td>{company?.information.company_information?.region}</td>
                                                        <td>
                                                            {company?.information.company_information?.address}
                                                        </td>
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
                                                                        <button className="dropdown-item" onClick={() => handleDelete(company?.id)}>{t("delete")}</button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="dropdown-item" onClick={() => handleManage(company?.id)}>{t("manage")}</button>
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
                            </>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                        <label className="me-2">{t("pagination.itemsPerPage")}</label>
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
                            {t("pagination.showing", { start: ((currentPage - 1) * pageSize) + 1, end: Math.min(currentPage * pageSize, count), total: count })}
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
                                        {t("pagination.previous")}
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
                                        {t("pagination.next")}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <AddCompanyModal handleShow={showModal} handleClose={() => setShowModal(false)} />
            </>
        );
}