
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MultiSelectDropdown from '@/components/MultipleSelect';
import TextEditor from '../post_a_job/job-description/TextEditor';
import AddSkill from '../add_skill';
import { useAppDispatch } from '@/redux/hooks';
import { setField } from '@/redux/slices/employer/post_a_job/basicInfoSlice';

interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    data: any;
}


export default function Editmodal({handleShow, handleClose, data}: EditModalProps){
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        title:"",
        salary:"",
        type_of_emp: [] as string[],
        category:"",
        job_desc:"",
        responsibilities:"",
        who_you_are:"",
        nice_to_have:"",
        skill: [] as string[]
    })

    useEffect(() => {
        if(data){
            setFormData({
                title:data.title || "",
                salary:data.salary || "",
                type_of_emp:data.type_of_emp || [],
                category:data.category || [],
                job_desc:data.job_desc || "",
                responsibilities:data.responsibility || "",
                who_you_are:data.who_you_are || "",
                nice_to_have:data.nice_to_have || "",
                skill:data.skill || []
            })

            dispatch(setField({
                skill: data.skill || [],
            }))
        }
    }, [data])
    
    return (
        <Modal size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
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
                                onChange={(value: string) =>
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
                            <AddSkill />

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
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );

}