"use client"

import { BiArrowBack } from "react-icons/bi";
import { FaSliders } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { setPage, setPageSize } from "@/redux/slices/applicants/userSlice";
import { useEffect, useState } from "react";
import { fetchUsers, updateStatus, updateIsActive } from "@/redux/slices/applicants/userThunk";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import { useTranslations } from "next-intl";
import AddUserModal from "./add_modal";
import FormattedDate from "@/components/date_format";
import CompanyList from "./company_list";
import PerksBenefits from "./perks_benefits";

export default function AdminUsers() {
    const t = useTranslations("adminUsers");
    const {items, status, error, next, previous, currentPage, pageSize, count}= useSelector((state: RootState) => state.getAllUserByFilter);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<{ role: string }>({ role: "all" });

    const [addModal, setAddModal] = useState(false);
    const [companyListModal, setCompanyListModal] = useState(false);
    const [userID, setUserID] = useState<string>("");

    const [perksBenefitsModal, setPerksBenefitsModal] = useState(false);


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

    const verifyChangeStatus = (id:number) => {
        popup({
            title: t("users.modal.title"),
            text: t("users.modal.message"),
            icon:"warning",
            onConfirm: () => {
                handleIsActive(id)
            }
        })
    }

    const handleIsActive = async (id:number) => {
        try {
            await dispatch(updateIsActive(id)).unwrap();

            dispatch(fetchUsers({
                page: currentPage,
                pageSize,
                filter
            }));

            showSuccessToast(t("users.toast.title"), t("users.toast.message"));
        } catch (err) {
            console.error(err);
        }
    }

    const handleAddModal = () => {
        setAddModal(true);
    }

    const handleShowCompanyList = (data: any) => {
        setUserID(data.id)
        setCompanyListModal(true);
    }
    
    const handleShowPerksBenefits = (id: number) => {
        setPerksBenefitsModal(true);
        setUserID(String(id))
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
                <h5><strong><BiArrowBack /> {t("users.title")}</strong></h5>
            </div>
            <div className="col text-end">
                {/* <span>{t("users.period")} <FaCalendarCheck className="text-primary" /></span> */}
                <button className="btn btn-primary-custom rounded-3 me-2" onClick={handleAddModal}>
                    Add User
                </button>
            </div>
        </div>

        <div className="row standar-div mt-2">
            <div className="col">
                <strong>{t("users.listTitle", { count })}</strong>
            </div>
            <div className="col-2 text-end">
                {/* <FaSearch className="text-primary" /> {t("users.searchPlaceholder")} */}
                
            </div>
            <div className="col-1 text-end">
                <button
                className="btn btn-link dropdown-toggle text-primary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
            <FaSliders className="me-1" /> {t("users.filterButton")}
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("all")}>
                    {t("users.filters.all")}
                </button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("job_seeker")}>
                    {t("users.filters.jobSeeker")}
                </button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("employer")}>
                    {t("users.filters.employer")}
                </button>
            </li>
            <li>
                <button className="dropdown-item" onClick={() => handleFilter("supervisory")}>
                    {t("users.filters.supervisory")}
                </button>
            </li>
        </ul>
            </div>
        </div>

        <div className="row standar-div">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-start p-2">{t("users.table.name")}</th>
                                <th className="text-start p-2">{t("users.table.email")}</th>
                                <th className="text-start p-2">{t("users.table.role")}</th>
                                <th className="text-start p-2">{t("users.table.status")}</th>
                                <th className="text-start p-2">{t("users.table.joined")}</th>
                                <th className="text-start p-2">{t("users.table.action")}</th>
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
                                        name = item?.userDetails_emp?.contact_person?.name
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
                                            <td className={`text-start p-2`}>
                                                <span className={`badge p-2 ${item.is_active?'bg-success':'bg-danger'}`}>
                                                    {item.is_active
                                                        ? t("users.status.active")
                                                        : t("users.status.notActive")}
                                                </span>
                                                
                                            </td>
                                            <td className="text-start p-2"><FormattedDate date={item.created_at} /></td>

                                            <td className="text-start p-2">
                                                    {
                                                        item.role !== "admin" && (
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
                                                                    {
                                                                        item.is_active === true?
                                                                            <li>
                                                                                <button className="dropdown-item" onClick={() => verifyChangeStatus(item.id)}>
                                                                                    {t("users.status.deactivate")}
                                                                                </button>
                                                                            </li>
                                                                            :
                                                                            <li>
                                                                                <button className="dropdown-item" onClick={() => verifyChangeStatus(item.id)}>
                                                                                    {t("users.status.activate")}
                                                                                </button>
                                                                            </li>     
                                                                    }

                                                                    {
                                                                        item.role === "employer" && (
                                                                            <>
                                                                                <li >
                                                                                    <button onClick={() => handleShowCompanyList(item)} className="dropdown-item">
                                                                                        Manage Company
                                                                                    </button>
                                                                                </li>
                                                                                <li >
                                                                                    <button onClick={() => handleShowPerksBenefits(item.id)} className="dropdown-item">
                                                                                        Manage Perks & Benefits
                                                                                    </button>
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
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
            <label className="me-2">{t("users.pagination.itemsPerPage")}</label>
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
                {t("users.pagination.showing", {
                    start: ((currentPage - 1) * pageSize) + 1,
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
                        {t("users.pagination.previous")}
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
                        {t("users.pagination.next")}
                    </button>
                </li>
            </ul>
        </nav>
    </div>
                <AddUserModal handleShow={addModal} handleClose={() => setAddModal(false)} />
                <CompanyList handleShow={companyListModal} handleClose={() => setCompanyListModal(false)} userID={userID} />
                <PerksBenefits handleShow={perksBenefitsModal} handleClose={() => setPerksBenefitsModal(false)} userID={userID} />
    </>
    );
}