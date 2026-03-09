import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useEffect, useState } from 'react';
import AddCompanyModal from '../../employer/company/add_modal';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { getCompanyAdmin, delteCompanyAdmin } from '@/redux/slices/employer/company/companyThunk';
import Pagination from '@/components/pagination';
import { setPage, setPageSize } from '@/redux/slices/employer/company/companySlice';
import { popup } from '@/helper/pop_up';
import { showSuccessToast } from '@/app/(util)/toaster';
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface CompanyListProps {
    handleShow: boolean;
    handleClose: () => void;
    userID?: string;
}

export default function CompanyList({ handleShow, handleClose, userID }: CompanyListProps) {
    const t = useTranslations("adminUsers");
    const { companies, count, pageSize, currentPage} = useAppSelector((state) => state.companySlice);
    const router = useRouter(); 
    const dispatch = useAppDispatch();
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSize(Number(e.target.value)));
        };
    const handlePageChange = (newPage: number) => {
            dispatch(setPage(newPage));
        };

    const totalPages = Math.ceil(count / pageSize);
    const [addCompanyModal, setAddCompanyModal] = useState(false);

    const fetchCompanies = async () => {
        if (!userID) return;
        await dispatch(getCompanyAdmin({ userID: Number(userID) }));
    };

    const handleAddCompanyModal = () => {
        setAddCompanyModal(true);
    }

    const handleDeleteCompany = async (companyID: number) => {
        popup({
            title: "Delete Company",
            text: "Are you sure you want to delete this company?",
            icon: "warning",
            onConfirm: async () => {
                try {
                    await dispatch(delteCompanyAdmin(companyID)).unwrap();
                    await fetchCompanies();
                    showSuccessToast("Delete company","Company deleted successfully");
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

    const handleShowProfile = async (companyID: number) => {
        router.push(`users/profile?companyID=${companyID}`);
    }
            
    useEffect(() => {
        if (handleShow && userID) {
            dispatch(getCompanyAdmin({page: currentPage,
            pageSize, userID: Number(userID) }));
        }
    }, [dispatch, userID, handleShow, currentPage, pageSize]);
   
    return (
        <>
            <Modal size='xl' show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{t("users.comapany-user.listModal.header")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12 justify-content-end d-flex mb-3">
                            <button className="btn btn-primary-custom rounded-3 " onClick={handleAddCompanyModal}>{t("users.comapany-user.listModal.addButton")}</button>
                        </div>
                        <div className="col-12 mt-2">
                            <table className='table table-hover'>
                                <thead>
                                    <tr>   
                                        <th>#</th>
                                        <th>{t("users.comapany-user.listTable.companyName")}</th>
                                        <th>{t("users.comapany-user.listTable.jobPosting")}</th>
                                        <th>{t("users.comapany-user.listTable.contact")}</th>
                                        <th>{t("users.comapany-user.listTable.region")}</th>
                                        <th>{t("users.comapany-user.listTable.address")}</th>
                                        <th>{t("users.comapany-user.listTable.action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        companies && companies.length > 0 ? (
                                            companies.map((company: any, index: number) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{company.information.company_information.name}</td>
                                                    <td>{company.job_posting}</td>
                                                    <td>{company.information.company_information.phone}</td>
                                                    <td>{company.information.company_information.region}</td>
                                                    <td>{company.information.company_information.address}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary me-1" onClick={() => handleShowProfile(company.id)}>{t("users.comapany-user.listTable.edit")}</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCompany(company.id)}>{t("users.comapany-user.listTable.delete")}</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className='text-center' colSpan={7}>{t("users.noCompanyFound")}</td>
                                            </tr>
                                        )
                                    }
                                    
                                </tbody>
                            </table>
                            <Pagination 
                                totalPages={totalPages} 
                                currentPage={currentPage} 
                                handlePageChange={handlePageChange} 
                                next={null} 
                                previous={null}
                                pageSize={pageSize}
                                count={count}
                                handlePageSizeChange={handlePageSizeChange}
                                />
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("users.comapany-user.listModal.cancel")}
                </Button>
                    <AddButton  label={t("users.comapany-user.listModal.create")} className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>

            <AddCompanyModal 
                handleShow={addCompanyModal} 
                handleClose={() => setAddCompanyModal(false)} 
                userID_opt={userID} 
                onSuccess={fetchCompanies}
            />                      
        </>
    );
}