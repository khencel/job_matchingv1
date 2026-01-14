import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextEditor from "../post_a_job/job-description/TextEditor";
import { useAppDispatch } from "@/redux/hooks";
import { updateProfile } from "@/redux/slices/profile/profilethunk";



interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    companyProfile?: any;
}

export default function EditModalProfile({ handleShow, handleClose, companyProfile }: EditModalProps) {

    const dispatch = useAppDispatch();

    const logoInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [companyName, setCompanyName] = useState(companyProfile?.name || "");
    const [companyProfileText, setCompanyProfileText] = useState(companyProfile?.profile || "");
    const [founded, setFounded] = useState(companyProfile?.founded || "");
    const [employees, setEmployees] = useState(companyProfile?.employees || 0);
    const [region, setRegion] = useState(companyProfile?.region || "");
    const [industry, setIndustry] = useState(companyProfile?.industry || "");


    const handleReplaceLogo = () => {
        logoInputRef.current?.click();
    };

    const formatFileSize = (sizeInBytes: number) => {
        return (sizeInBytes / 1024 / 1024).toFixed(1) + " MB";
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    // BANNER
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const handleReplaceBanner = () => {
        bannerInputRef.current?.click();
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
    };

    const handleSave = () => {
        const details = {
            companyName,
            companyProfileText,
            founded,
            employees,
            region,
            industry
        };

        const payload: any = {
            details,
            user_id: Number(localStorage.getItem("user_id"))
        };

        // Only attach files if they exist
        if (logoFile) payload.avatar = logoFile;
        if (bannerFile) payload.banner = bannerFile;

        // Dispatch API call
        dispatch(updateProfile(payload))
            .unwrap()
            .then(() => {
                handleClose();
            })
            .catch((err) => {
                console.error("Profile update failed:", err);
            });
    };



    return (
        <>
            <Modal
                centered
                show={handleShow}
                dialogClassName="edit_profile_modal"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <strong className="standar-text">Logo & Banner Image</strong>

                    <div className="row mt-3">
                        {/* LOGO */}
                        <div className="col-md-3 border p-2">
                            <small>Upload Logo</small>
                            <div className="edit-logo-profile my-2">
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        className="logo-preview"
                                    />
                                ) : (
                                    <div className="text-muted small text-center">
                                        No logo uploaded
                                    </div>
                                )}
                            </div>
                            <small>
                                {logoFile ? formatFileSize(logoFile.size) : "No file"}{" "}
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleReplaceLogo}
                                >
                                    Replace
                                </span>
                            </small>
                            <input
                                ref={logoInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleLogoChange}
                            />
                        </div>

                        {/* BANNER */}
                        <div className="col-md-9 border p-2">
                            <small>Banner Image</small>
                            <div className="edit-banner-profile my-2">
                                {bannerPreview ? (
                                    <img
                                        src={bannerPreview}
                                        alt="Banner Preview"
                                        className="banner-preview"
                                    />
                                ) : (
                                    <div className="text-muted small text-center">
                                        No banner uploaded
                                    </div>
                                )}
                            </div>
                            <small>
                                {bannerFile ? formatFileSize(bannerFile.size) : "No file"}{" "}
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleReplaceBanner}
                                >
                                    Replace
                                </span>
                            </small>
                            <input
                                ref={bannerInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleBannerChange}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-2">
                        <div className="col">
                            <div>
                                Company Name
                                <br />
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                Company Profile
                                <br />
                                <TextEditor value={companyProfileText} onChange={(value) => setCompanyProfileText(value)} />
                            </div>
                            <div className="mt-2">
                                <div className="row">
                                    <div className="col">
                                        Company Founded
                                        <br />
                                        <input 
                                            className="form-control" 
                                            type="date" 
                                            value={founded}
                                            onChange={(e) => setFounded(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        No. of Employees
                                        <br />
                                        <input 
                                            className="form-control" 
                                            type="number" 
                                            value={employees}
                                            onChange={(e) => setEmployees(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        Region
                                        <br />
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            value={region}
                                            onChange={(e) => setRegion(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        Industry
                                        <br />
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}