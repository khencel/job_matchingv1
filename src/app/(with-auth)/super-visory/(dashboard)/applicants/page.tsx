import { useTranslations } from "next-intl";
import { BiArrowBack } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";

export default function SuperVisoryApplicantsPage() {
    const t = useTranslations("supervisoryApplicants");
    return (
        <>
            <div className="row standar-div">
                <div className="col">
                    <h5><strong><BiArrowBack /> {t("applicants")}</strong></h5>
                </div>
            </div>

            <div className="row standar-div mt-2">
                <div className="col">
                    <h4 className="text-primary text-center"><span><strong>{t("totalApplicants")}: {2}</strong></span></h4>
                </div>
            </div>
            <div className="row standar-div">
                <div className="col">
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>{t("fullName")}</th>
                                        <th>{t("hiringStage")}</th>
                                        <th>{t("appliedDate")}</th>
                                        <th>{t("jobRole")}</th>
                                        <th>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                      
                                    <tr> 
                                        <td>
                                            <div className="row">
                                                <div className="col-10 pt-1">
                                                    <span className="text-primary text-capitalize">test</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge border border-dark text-black p-2 rounded-4">Pending</span>
                                        </td>
                                        <td><span className="text-primary">test</span></td>
                                        <td><span className="text-primary">test</span></td>
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
                                                        <button className="dropdown-item" >Update Date</button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item" >Delete Data</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                              
                                        
                                </tbody>
                            </table>
                        </>
                </div>
            </div>
        </>
    )
}
