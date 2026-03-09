import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import AddJobPost from './add_job_post';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { jobPostIndex } from '@/redux/slices/jobPost/jobPostThunk';
import { HiDotsHorizontal } from "react-icons/hi";
import { useTranslations } from 'next-intl';
import { popup } from '@/helper/pop_up';
import Cookies from 'js-cookie';
import { showSuccessToast } from '@/app/(util)/toaster';
import { listJobPost, deleteJobPost } from '@/redux/features/job_post/job_post_thunk';
import { setPage, setPageSize } from '@/redux/slices/employer/post_a_job/JobListing';
import { jobPostChangeStatus } from '@/redux/slices/employer/post_a_job/jobListingThunk';
import Pagination from '@/components/pagination';
import { useSearchParams } from "next/navigation";
import Editmodal from './edit_job_post';



interface PostJobProps {
    handleShow: boolean;
    handleClose: () => void;
}

export default function JobPostList({handleShow, handleClose}:PostJobProps){
    const searchParams = useSearchParams();
    const companyID = searchParams.get("companyID");
    const dispatch = useAppDispatch();
    const [addJobPost, setAddJobPost] = useState(false);
    const { items, count, next, previous, currentPage, pageSize} = useAppSelector((state) => state.jobPostingSlice);
    const t = useTranslations("employerJobListing");
    const [selectedData, setSelectedData] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const handleAddJobPost = () => {
        setAddJobPost(true);
    }

    const handleDelete = (id: number) => {
            popup({
            title: t("modals.deleteJob.title"),
            text: t("modals.deleteJob.message"),
            confirmText: t("modals.deleteJob.confirmButton"),
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
            await dispatch(jobPostIndex({ companyID: Number(companyID), page: currentPage, pageSize }));
            showSuccessToast(t("modals.deleteJob.successTitle"), t("modals.deleteJob.successMessage"));
        }
    
    
        const handleEdit = (data: any) => {
            setSelectedData(data);
            setShowModal(true);
        }
    
        const handleChangeStatus = async (id:number) =>{
            popup({
            title: t("modals.changeStatus.title"),
            text: t("modals.changeStatus.message"),
            icon:"warning",
            onConfirm:async () => {
                    
                    if (!companyID) return;
                    await dispatch(jobPostChangeStatus(id));
                    await dispatch(jobPostIndex({ companyID: Number(companyID), page: currentPage, pageSize }));
                    showSuccessToast(t("modals.changeStatus.successTitle"), t("modals.changeStatus.successMessage"))
                }
            })
            
        }

    useEffect(() => {
        dispatch(jobPostIndex({ companyID: Number(companyID), page: currentPage, pageSize }));
    }, [dispatch,currentPage, pageSize]);

    // pagination 
    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageSize(Number(e.target.value)));
    };

    const totalPages = Math.ceil(count / pageSize);
    // pagination 
    return (
        <>
            <Modal size='xl' show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Job Posting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12 justify-content-end d-flex mb-3">
                            <button className="btn btn-primary-custom rounded-3" onClick={handleAddJobPost}>Add Job Posting</button>
                        </div>
                        <div className="col-12 mt-2">
                            <table className='table table-hover'>
                                <thead>
                                    <tr>  
                                        <th>#</th>
                                        <th>{t("table.status")}</th>
                                        <th>{t("table.role")}</th>
                                        <th>{t("table.datePosted")}</th>
                                        <th>{t("table.salary")}</th>
                                        <th>{t("table.jobType")}</th>
                                        <th>{t("table.applicants")}</th>
                                        <th></th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {
                                        items.map((item: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.is_active ? 'Enable' : 'Disable'}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.created_at}</td>
                                                    <td>{item.salary}</td>
                                                    <td>
                                                        {item.type_of_emp.map((type: string, index: number) => (
                                                            <span key={index} className="badge rounded-4 p-2 bg-success me-1">
                                                                {type}
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td>{item.applicants | 0    }</td>
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
                                                                    <button className="dropdown-item" onClick={() => handleEdit(item)}>{t("buttons.edit")}</button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item text-danger" onClick={() => handleDelete(item.id)}>{t("buttons.delete")}</button>
                                                                </li>
                                                                <li>
                                                                    <button 
                                                                        className={`dropdown-item ${item.is_active?'text-danger':'text-success'}`}
                                                                        onClick={() => handleChangeStatus(item.id)}
                                                                    >
                                                                        {item.is_active ? t("statusToggle.disable") : t("statusToggle.enable")}
                                                                        
                                                                    </button>
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
                    Cancel
                </Button>
                    <AddButton label="Create" className='btn btn-primary-custom rounded-3' icon={null} /> 
                </Modal.Footer>
            </Modal>
            <AddJobPost handleShow={addJobPost} handleClose={() => setAddJobPost(false)} currentPage={currentPage} />
            <Editmodal
                handleShow={showModal}
                handleClose={() => setShowModal(false)}
                data={selectedData}
                currentPage={currentPage}
            />
        
        </>
    );
}