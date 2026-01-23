
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MultiSelectDropdown from '@/components/MultipleSelect';
import TextEditor from '../post_a_job/job-description/TextEditor';
import AddSkill from '../add_skill';
import { useAppDispatch } from '@/redux/hooks';
import { setField } from '@/redux/slices/employer/post_a_job/basicInfoSlice';
import { updateJobPost } from '@/redux/features/job_post/job_post_thunk';
import { listJobPost } from '@/redux/features/job_post/job_post_thunk';
import type { RootState } from "@/redux/store";
import { useSelector } from 'react-redux';
import { popup } from '@/helper/pop_up';
import { showSuccessToast } from '@/app/(util)/toaster';

interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    currentPage: number;
    data: any;
}


export default function Editmodal({handleShow, handleClose, data, currentPage}: EditModalProps){

    const basicInfo = useSelector((state: RootState) => state.basicInfo);


    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        id: null as number | null,
        title: "",
        salary: "",
        type_of_emp: [] as string[],
        category: [] as { value: string; label: string }[],
        job_desc: "",
        responsibilities: "",
        who_you_are: "",
        nice_to_have: "",
        skill: [] as string[]
    })

    const handleUpdate = async () => {
        popup({
            title: 'Are you sure?',
            text: 'Do you want to update this job post?',
            icon: 'warning',
            onConfirm: () => {
                updatePostJob()
            }
        })
    };

    const updatePostJob = async () => {
        if (!formData.id) return;
        const skillFromRedux = basicInfo.skill;
        await dispatch(updateJobPost({
            id: formData.id,
            title: formData.title,
            salary: Number(formData.salary),
            type_of_emp: formData.type_of_emp,
            category: formData.category,
            job_desc: formData.job_desc,
            responsibility: formData.responsibilities,
            who_you_are: formData.who_you_are,
            nice_to_have: formData.nice_to_have,
            skill: formData.skill
        })).unwrap();

        const updatedList: any = await dispatch(listJobPost({
            userId: Number(data.user_id),
            page: currentPage,
            pageSize: 10
        })).unwrap();

        const updatedJob = updatedList.results.find((job: any) => job.id === formData.id);

        if (updatedJob) {
            setFormData({
                id: updatedJob.id,
                title: updatedJob.title || "",
                salary: updatedJob.salary || "",
                type_of_emp: updatedJob.type_of_emp || [],
                category: updatedJob.category || [],
                job_desc: updatedJob.job_desc || "",
                responsibilities: updatedJob.responsibility || "",
                who_you_are: updatedJob.who_you_are || "",
                nice_to_have: updatedJob.nice_to_have || "",
                skill: skillFromRedux || []
            });
        }
        showSuccessToast('Success', 'Job post updated successfully')
        handleClose();
    };



    useEffect(() => {
        if(data){
            setFormData({
                id: data.id,
                title: data.title || "",
                salary: data.salary || "",
                type_of_emp: data.type_of_emp || [],
                category: data.category || [],
                job_desc: data.job_desc || "",
                responsibilities: data.responsibility || "",
                who_you_are: data.who_you_are || "",
                nice_to_have: data.nice_to_have || "",
                skill: data.skill || []
            })

            dispatch(setField({
                type_of_emp: data.type_of_emp || [],
                skill: data.skill || [],
            }))
        }
    }, [data])
    
    return (
        <Modal size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Job Post</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <div className="emp-component-style mt-2">
                    <strong>Basic Information</strong>
                    <br />
                    <small>This Information will be displayed publicly.</small>
                    <hr />
                    <div className="row mt-5">
                        <div className="col">
                            <strong>Job Title <span className="text-danger">*</span></strong>
                            <br />
                            <small>Job title must be describe one position.</small>
                        </div>
                        <div className="col">
                            <textarea name="" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value})} placeholder="e.g Software Engineer" className="form-control" id=""></textarea>
                            <small>At least 80 characters</small>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <strong>Salary</strong>
                            <br />
                            <small>Please specify the estimated salary range for the role.</small>
                        </div>
                        <div className="col">
                            <input type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value})} className="form-control" placeholder="Estimate salary" />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <strong>Type of Employment <span className="text-danger">*</span></strong>
                        </div>
                        <div className="col">
                            {["Full-Time", "Part-Time", "Remote", "Internship"].map(type => (
                                <div key={type}>
                                    <input
                                        type="checkbox"
                                        checked={formData.type_of_emp.includes(type)}
                                        onChange={(e) => {
                                            const updated = e.target.checked
                                            ? [...formData.type_of_emp, type]
                                            : formData.type_of_emp.filter(t => t !== type);

                                            setFormData({ ...formData, type_of_emp: updated });
                                            dispatch(setField({ type_of_emp: updated }));
                                        }}
                                        />

                                    {" "}{type}
                                </div>
                            ))}
                           
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <strong>Categories</strong>
                            <br />
                            <small>You can select multiple job categories</small>
                        </div>
                        <div className="col">
                            <MultiSelectDropdown
                                value={formData.category}
                                onChange={(value: { value: string; label: string }[]) =>
                                    setFormData({ ...formData, category: value })
                                }
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <strong>Required Skills</strong>
                            <br />
                            <small>Add required skills for the job</small>
                        </div>
                        <div className="col">
                            
                            <AddSkill
                                skills={formData.skill}
                                onAddSkill={(newSkill) => setFormData({...formData, skill: [...formData.skill, newSkill]})}
                                onRemoveSkill={(skillToRemove) => setFormData({...formData, skill: formData.skill.filter(s => s !== skillToRemove)})}
                            />

                        </div>
                    </div>
                    <hr />
                    <strong>Details</strong>
                        <br />
                        <small>Add the description of the job, responsibilities. who you are and nice-to-have</small>
                        <hr />
        
                        <div className="row mt-5">
                            <div className="col">
                                <strong>Job Description <span className="text-danger">*</span></strong>
                                <br />
                                <small>Job description must be describe one position.</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.job_desc} onChange={(value) => setFormData({ ...formData, job_desc: value})} />
                            </div>
                        </div>
        
                        <div className="row mt-2">
                            <div className="col">
                                <strong>Responsibility <span className="text-danger">*</span></strong>
                                <br />
                                <small>Outline the core responsibilities of the position.</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.responsibilities} onChange={(value) => setFormData({ ...formData, responsibilities: value})}  />
                            </div>
                        </div>
        
                        <div className="row mt-2">
                            <div className="col">
                                <strong>Who You Are <span className="text-danger">*</span></strong>
                                <br />
                                <small>Add your preferred candidates qualifications.</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.who_you_are} onChange={(value) => setFormData({ ...formData, who_you_are: value})}  />
                            </div>
                        </div>
        
                        <div className="row mt-2">
                            <div className="col">
                                <strong>Nice-To-Have <span className="text-danger">*</span></strong>
                                <br />
                                <small>Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply.</small>
                            </div>
                            <div className="col">
                                <TextEditor value={formData.nice_to_have} onChange={(value) => setFormData({ ...formData, nice_to_have: value})} />
                            </div>
                        </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );

}