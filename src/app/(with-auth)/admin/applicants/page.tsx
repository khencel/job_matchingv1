"use client";

import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAppDispatch } from "@/redux/hooks";
import { fetchApplicants, fetchAllCompany, fetchApplicantsNoPagination, updateStatus } from "@/redux/slices/applicants/applicantThunk";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setPageSize, setPage } from "@/redux/slices/applicants/applicantSlice";

import FormattedDate from "@/components/date_format";
import { useState } from "react";
import ViewEmployer from "./viewEmployer";
import ViewApplicant from "./viewApplicant";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import FilterModal from "./filterModal";
import { useTranslations } from "next-intl";

import * as XLSX from "xlsx-js-style";
import { saveAs } from 'file-saver';



export default function AdminApplicants() {
    const t = useTranslations("adminApplicants");
    const dispatch = useAppDispatch();
    const {items, status, error, next, previous, currentPage, pageSize, count, company, itemToPrint}= useSelector((state: RootState) => state.applicants);
    const [showEmployer, setShowEmployer] = useState(false);
    const [showApplicant, setShowApplicant] = useState(false);

    const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

    const [openFilterModal, setOpenFilterModal] = useState(false)

    const [listCompany, setListCompany] = useState<any>([])

    const [currentFilter, setCurrentFilter] = useState<{ company?: string; gender?: string; visa?: string }>({});


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


    const handleFilter = () => {
        setListCompany(company)
        setOpenFilterModal(true)
    }

    const handleFilterApply = (filterData: { 
                                company?: string; 
                                gender?: string, 
                                visa?: string,
                                firstName?: string,
                                lastName?: string
    }) => {
    
        setCurrentFilter(filterData); 
        dispatch(fetchApplicants({
            page: 1, 
            pageSize,
            ...filterData 
        }));
    }


    const handleDownloadExcel = () => {
        console.log(itemToPrint);
        
        if(itemToPrint.length === 0) return;

        const dataForExcel = itemToPrint.map((item:any) => ({
            "FIRST NAME": `${item.user.userDetails.firstName}`,
            "LAST NAME": `${item.user.userDetails.lastName}`,
            "EMPLOYER": `${item.job_post.employerDetails.userDetails_emp.company_information.name}`,
            "JOB ROLE": `${item.job_post.jobPostDetails.title}`,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

        const range = XLSX.utils.decode_range(worksheet["!ref"]!);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = {
                    font: { bold: true }
                };
            }
        }

        worksheet['!cols'] = Object.keys(dataForExcel[0]).map((key) => {
            const maxLength = Math.max(
                key.length,
                ...dataForExcel.map((row:any) =>
                    row[key] ? row[key].toString().length : 0
                )
            );
            return { wch: maxLength + 4 };
        });
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Filtered_Applicants.xlsx");
    };

    const handleUpdateStatus = (id: number, status: string) => {
        popup({
            title: t("confirm.title"),
            text: t("confirm.text"),
            icon: "warning",
            onConfirm() {
            const payloadstatus = {
                id,
                status,
            };

            dispatch(updateStatus(payloadstatus))
                .unwrap() 
                .then(() => {
                showSuccessToast(t("toast.title"), t("toast.success"));
               
                dispatch(fetchApplicants({ page: currentPage, pageSize, ...currentFilter }));
                dispatch(fetchApplicantsNoPagination(currentFilter));
                })
                .catch((err) => {
                console.error(err);
                });
            },
        });
    };


    
    useEffect(() => {
        dispatch(fetchApplicants({page: currentPage, pageSize, ...currentFilter}));
        dispatch(fetchAllCompany())
        dispatch(fetchApplicantsNoPagination(currentFilter)) 
    }, [dispatch,currentPage, pageSize, currentFilter]);
    return (
        <>
            <div className="row standar-div">
                <div className="col">
                    <h5><strong><BiArrowBack /> {t("title")}</strong></h5>
                </div>
                <div className="col-2 border text-end me-2">
                    <button className="btn btn-success btn-sm" onClick={handleDownloadExcel}>
                        {t("downloadExcel")}
                    </button>
                </div>
            </div>

            <div className="row standar-div mt-2">
                <div className="col">
                    <strong>{t("listTitle", { count })}</strong>
                </div>
                {/* <div className="col-2 text-end">
                    <FaSearch className="text-primary" /> Search Users
                </div> */}
                
                <div className="col-1 text-end">
                    <span style={{cursor:"pointer"}} onClick={handleFilter}>
                        <FaSliders className="text-primary"  /> {t("filter")}
                    </span>
                    
                </div>
            </div>

            <div className="row standar-div">
                    <div className="col">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-start p-2">{t("table.fullName")}</th>
                                    <th className="text-start p-2">{t("table.hiringStage")}</th>
                                    <th className="text-start p-2">{t("table.joined")}</th>
                                    <th className="text-start p-2">{t("table.age")}</th>
                                    <th className="text-start p-2">{t("table.jobRole")}</th>
                                    <th className="text-start p-2">{t("table.employer")}</th>
                                    <th className="text-start p-2">{t("table.action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item: any, index: number) => {
                                        let text_color = ""
                                        if(item.status == null || item.status == "Pending"){
                                            text_color = "text-primary"
                                        }

                                        if(item.status == "Processing"){
                                            text_color = "text-warning"
                                        }

                                        if(item.status == "Completed"){
                                            text_color = "text-success"
                                        }

                                        if(item.status == "Rejected"){
                                            text_color = "text-danger"
                                        }
                                        return (
                                            <tr key={index}>
                                                <td className="text-start p-2 text-capitalize">{item.user.userDetails.firstName} {item.user.userDetails.lastName}</td>
                                                <td className="text-start p-2">
                                                    <select
                                                        className={`badge form-control ${text_color}`}
                                                        value={item.status || "Pending"} // default to "Pending" if null
                                                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                                                    >
                                                        <option className="text-dark"  value="Pending">{t("stages.pending")}</option>
                                                        <option className="text-dark"  value="Processing">{t("stages.processing")}</option>
                                                        <option className="text-dark"  value="Completed">{t("stages.completed")}</option>
                                                        <option className="text-dark"  value="Rejected">{t("stages.rejected")}</option>
                                                    </select>
                                                </td>
                                                <td className="text-start p-2"><FormattedDate date={item.created_at} /></td>
                                                <td className="text-start p-2">{item.user.userDetails.age}</td>
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
                                                                <button className="dropdown-item" onClick={() => handleViewEmployer(item)}>{t("actions.viewEmployer")}</button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => handleViewApplicant(item)}>{t("actions.viewApplicant")}</button>
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
                    <label className="me-2">{t("pagination.itemsPerPage")}</label>
                    <select 
                        className="form-select form-select-sm" 
                        style={{ width: 'auto' }}
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="ms-3 text-muted">
                        {t("pagination.showing", {
                            start: (currentPage - 1) * pageSize + 1,
                            end: Math.min(currentPage * pageSize, count),
                            total: count,
                        })}
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

            <FilterModal
                handleShow={openFilterModal}
                handleClose={() => setOpenFilterModal(false)}
                companyList={listCompany}
                onApplyFilter={handleFilterApply}
            />
        </>
    );
}