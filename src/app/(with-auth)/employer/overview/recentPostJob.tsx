import { GoDotFill } from "react-icons/go";
import { FaRegCircleCheck, FaUserGroup } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";

export default function RecentPostJob(){
    return (
        <div className="">
            <div className="row">
                <div className="col">
                    <span className="float-start"><strong>Recent Posted Jobs</strong></span>
                    <span className="float-end">View all</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead className="table-light thead_style_recent_jobs">
                            <tr>
                                <th>JOBS</th>
                                <th>STATUS</th>
                                <th>APPLICATIONS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>UI/UX Designer</strong>
                                        <br />
                                        <small>Full Time <GoDotFill /> 27 days ago</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> Active</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> 798 Applications</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">View Applications</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Senior UX Designer</strong>
                                        <br />
                                        <small>Intership <GoDotFill /> 8 days ago</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> Active</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> 307 Applications</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">View Applications</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Technical Support Specialist</strong>
                                        <br />
                                        <small>Part Time <GoDotFill /> 4 days ago</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> Active</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> 109 Applications</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">View Applications</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Junior Graphic Designer</strong>
                                        <br />
                                        <small>Full Time <GoDotFill /> 24 days ago</small>
                                    </div>
                                </td>
                                <td>
                                    <span className="status_text"><FaRegCircleCheck /> Active</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> 200 Applications</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">View Applications</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="text_rencent_jobs">
                                        <strong>Fron End Developer</strong>
                                        <br />
                                        <small>Full Time <GoDotFill /> Dec 7, 2025</small>
                                    </div>
                                </td>
                                <td>
                                    {/* <span className="status_text"><FaRegCircleCheck /> Active</span> */}
                                    <span className="status_text_expired"><FaRegTimesCircle /> Expired</span>
                                </td>
                                <td>
                                    <span className="applicants_text"><FaUserGroup /> 70 Applications</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary-custom rounded-3">View Applications</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}