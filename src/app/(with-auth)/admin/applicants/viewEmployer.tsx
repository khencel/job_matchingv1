import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface ViewEmployerProps {
    showModalEdit: boolean;
    closeModalEdit: () => void;
    data: any;
}


export default function ViewEmployer({showModalEdit, closeModalEdit, data}: ViewEmployerProps) {
    data = data || {};
    console.log(data);
    
    const company_name = data?.job_post?.employerDetails?.userDetails_emp?.company_information?.name || 'Employer Details';
    const logo = data?.job_post?.employerDetails?.avatar || '';
    const profile = data?.job_post?.employerDetails?.userDetails_emp?.company_information?.profile || '';

    // Job Post 
    const job_posts = data?.job_post?.jobPostDetails || [];
    const description = job_posts.job_desc || '';
    const responsibilities = job_posts.responsibility || '';
    const nice_to_have = job_posts.nice_to_have || '';
    const title = job_posts.title || '';
    const salary = job_posts.salary || '';
    const who_you_are = job_posts.who_you_are || '';
    const type_of_emp = job_posts.type_of_emp || [];
    
    return (
        <Modal 
            show={showModalEdit} 
            onHide={closeModalEdit}
            size="xl"
            >
            <Modal.Header closeButton>
            <Modal.Title>{company_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <strong>About Company</strong> 
                        <br />
                        <div className='mb-5 text-center'>
                            <img src={`http://127.0.0.1:8000${logo}`} style={{width:"50%"}}  alt="" />
                        </div>
                        <div>
                            Company Profile
                            <br />
                            <small dangerouslySetInnerHTML={{
                                __html: profile,
                            }}>
                                
                            </small>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <strong>Job Posts by this Employer</strong>
                        <br />
                        <br />
                        <div>
                            <div className='mb-4'>
                                <div className="row">
                                    <div className="col-4 ">
                                        Position:
                                    </div>
                                    <div className="col-8 ">
                                        {title}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 ">
                                        Salary:
                                    </div>
                                    <div className="col-8 ">
                                        {salary}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 ">
                                        Type of Employment:
                                    </div>
                                    <div className="col-8 ">
                                        {
                                            type_of_emp.map((item: any, index: number) => {
                                                return (
                                                    <span key={index}>
                                                        {item}{index < type_of_emp.length - 1 ? ', ' : ''}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div>
                                Job Description
                                <br />
                                <small>
                                    <span dangerouslySetInnerHTML={{
                                        __html: description
                                    }}></span>
                                </small>
                            </div>

                            <div>
                                Responsibility
                                <br />
                                <small>
                                    <span dangerouslySetInnerHTML={{
                                        __html: responsibilities
                                    }}></span>
                                </small>
                            </div>

                            <div>
                                Nice to Have
                                <br />
                                <small>
                                    <span dangerouslySetInnerHTML={{
                                        __html: nice_to_have
                                    }}></span>
                                </small>
                            </div>

                            <div>
                                Who you are
                                <br />
                                <small>
                                    <span dangerouslySetInnerHTML={{
                                        __html: who_you_are
                                    }}></span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeModalEdit}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}