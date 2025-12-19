import Header from "../headerPostAJob"
import TextEditor from "./TextEditor";

export default function JobDescription(){
    return(
        <>
            <Header/>
            <div className="emp-component-style mt-2">
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
                        <TextEditor />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Responssibility <span className="text-danger">*</span></strong>
                        <br />
                        <small>Outline the core responsibilities of the position.</small>
                    </div>
                    <div className="col">
                        <TextEditor />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Who You Are <span className="text-danger">*</span></strong>
                        <br />
                        <small>Add your preferred candidates qualifications.</small>
                    </div>
                    <div className="col">
                        <TextEditor />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <strong>Nice-To-Have <span className="text-danger">*</span></strong>
                        <br />
                        <small>Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply.</small>
                    </div>
                    <div className="col">
                        <TextEditor />
                    </div>
                </div>

                <div className="row justify-content-end mt-5 mb-3">
                    <div className="col-md-3 text-end">
                            <button className="btn btn-primary-custom rounded-3">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}