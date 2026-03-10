import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextEditor from "../../post_a_job/job-description/TextEditor";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfile } from "@/redux/slices/profile/profilethunk";
import { useEffect } from "react";
import { getProfile } from "@/redux/slices/profile/profilethunk";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import Cookies from "js-cookie";
import MultipleSelect from "@/components/MultipleSelectStandard";
import { regionList } from "@/components/listGroupData";
import { useSearchParams } from "next/navigation";
import { getCompanyDetails, updateCompany } from "@/redux/slices/employer/company/companyThunk";
import { indexPerksBenefits } from "@/redux/slices/perks_benefits/perksBenefitsThunk";
import { useTranslations } from "next-intl";

interface EditModalProps {
    handleShow: boolean;
    handleClose: () => void;
    companyProfile?: any;
}

export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Hospitality",
  "Construction",
  "Transportation",
  "Real Estate",
  "Agriculture",
  "Entertainment",
  "Telecommunications",
  "Energy",
];

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="d-flex align-items-start justify-content-between mb-3">
    <div>
      <div className="fw-semibold" style={{ fontSize: 16 }}>
        {title}
      </div>
      {subtitle ? <div className="text-muted small">{subtitle}</div> : null}
    </div>
  </div>
);

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-muted small mb-1">{children}</div>
);

const CardBox = ({ children }: { children: React.ReactNode }) => (
  <div
    className="bg-white border rounded-4 p-3"
    style={{
      boxShadow: "0 8px 24px rgba(16,24,40,.06)",
    }}
  >
    {children}
  </div>
);

export default function EditModalProfile({ handleShow, handleClose, companyProfile }: EditModalProps) {
    const t = useTranslations("employerProfileBody");
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const companyID = searchParams.get("companyID");

    const logoInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    
    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [companyProfileText, setCompanyProfileText] = useState("");
    const [founded, setFounded] = useState("");
    const [fee, setFee] = useState("100");
    const [appealPoint, setAppealPoint] = useState("100");
    const [employees, setEmployees] = useState(0);
    const [region, setRegion] = useState("");
    const [industry, setIndustry] = useState<
        { label: string; value: string }[]
    >([]);

    const industryOptions = industries.map(item => ({
        label: item,
        value: item,
    }));

    const bannerInputRef = useRef<HTMLInputElement>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const { items } = useAppSelector((state) => state.perksAndBenefitsSlice);
    const userID = Cookies.get("userID") || "";
    const [perksBenefits, setPerksBenefits] = useState<{label: string; value: string}[]>([]);

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

    const handleReplaceBanner = () => {
        bannerInputRef.current?.click();
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
    };

    const saveChanges = () => {
        popup({
            title: "Update Profile?",
            text: "Profile will be updated",
            confirmText: 'yes, Update it!',
            icon:"warning",
            onConfirm: () => {
                handleSave()
            }
        })
            
    }

    const handleSave = async () => {
        if (!companyID) {
            console.error("Company ID is missing");
            return;
        }

        const information = {
            company_information: {
                name: companyName,
                phone,
                email,
                address,
                founded,
                profile: companyProfileText,
                no_of_emp: String(employees),
                appeal_point: appealPoint,
                region,
                company_industry: industry.map((i) => i.value),
                perks_benefits: perksBenefits.map((i) => i.value),
            }
            
        };

        const formData = new FormData();

        formData.append("information", JSON.stringify(information));

        if (logoFile) formData.append("avatar", logoFile);
        if (bannerFile) formData.append("banner", bannerFile);

        // debug
        for (const [k, v] of formData.entries()) console.log(k, v);

        await dispatch(updateCompany({ companyID: Number(companyID), data: formData })).unwrap();
        showSuccessToast("Success", "Company profile updated successfully");
        await dispatch( getCompanyDetails(Number(companyID)));
        handleClose();
    };

    // Update state when companyProfile changes
    useEffect(() => {
        if (!handleShow) return;
        const companyInfo = companyProfile || {};
        
        setCompanyName(companyInfo?.name || "");
        setPhone(companyInfo?.phone || "");
        setEmail(companyInfo?.email || "");
        setAddress(companyInfo?.address || "");
        setFounded(companyInfo?.founded || "");
        setEmployees(companyInfo?.no_of_emp || 0);
        setRegion(companyInfo?.region || "");
        setCompanyProfileText(companyInfo.profile || "");
        
        const existingIndustry = companyInfo.industry;

        if (Array.isArray(existingIndustry)) {
            setIndustry(
                existingIndustry.map((item: string) => ({
                    label: item,
                    value: item,
                }))
            );
        } else {
            setIndustry([]);
        }

        const existingPerksBenefits = companyInfo?.benefits || [];
        if (Array.isArray(existingPerksBenefits)) {
            setPerksBenefits(
            existingPerksBenefits.map((item: { name: string; id: string | number }) => ({
                label: item.name,
                value: String(item.id),
            }))
            );
        } else {
            setPerksBenefits([]);
        }



        setLogoPreview(companyProfile.avatar || null);
        setBannerPreview(companyProfile.banner || null);

        setLogoFile(null);
        setBannerFile(null);

        dispatch(indexPerksBenefits(Number(userID)));
     
        
    }, [handleShow,companyProfile]);

    return (
        <>
            <Modal
                centered
                show={handleShow}
                dialogClassName="edit_profile_modal"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("editProfile.editHeader")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <strong className="standar-text">{t("editProfile.logoBanner")}</strong>

                    <div className="row mt-3">
                        {/* LOGO */}
                        <div className="col-md-3 border p-2">
                            <small>{t("editProfile.uploadLogo")}</small>
                            <div className="edit-logo-profile my-2">
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        className="logo-preview"
                                    />
                                ) : (
                                    <div className="text-muted small text-center">
                                        {t("editProfile.noLogo")}
                                    </div>
                                )}
                            </div>
                            <small>
                                {logoFile ? formatFileSize(logoFile.size) : t("editProfile.nofile")}{" "}
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleReplaceLogo}
                                >
                                    {t("editProfile.replace")}
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
                            <small>{t("editProfile.bannerImage")}</small>
                            <div className="edit-banner-profile my-2">
                                {bannerPreview ? (
                                    <img
                                        src={bannerPreview}
                                        alt="Banner Preview"
                                        className="banner-preview"
                                    />
                                ) : (
                                    <div className="text-muted small text-center">
                                        {t("editProfile.noBanner")}
                                    </div>
                                )}
                            </div>
                            <small>
                                {bannerFile ? formatFileSize(bannerFile.size) : t("editProfile.nofile")}{" "}
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleReplaceBanner}
                                >
                                    {t("editProfile.replace")}
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
                    <div className="mt-4">
                              <SectionTitle title={t("editProfile.basic")} />
                              <CardBox>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                      <FieldLabel>{t("editProfile.companyName")}</FieldLabel>
                                      <input
                                        className="form-control rounded-4"
                                        style={{ height: 44 }}
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="e.g., Concept Machine"
                                      />
                                    </div>
                    
                                  <div className="col-md-4">
                                    <FieldLabel>{t("editProfile.phone")}</FieldLabel>
                                    <input
                                      className="form-control rounded-4"
                                      style={{ height: 44 }}
                                      type="text"
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      placeholder="e.g., 090000000000"
                                    />
                                    </div>
                                  
                                    <div className="col-md-4">
                                      <FieldLabel>{t("editProfile.email")}</FieldLabel>
                                      <input
                                        className="form-control rounded-4"
                                        style={{ height: 44 }}
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="e.g., example@company.com"
                                      />
                                  </div>
                                  
                                  <div className="col-12">
                                    <FieldLabel>{t("editProfile.address")}</FieldLabel>
                                    <input
                                      className="form-control rounded-4"
                                      style={{ height: 44 }}
                                      type="text"
                                      value={address}
                                      onChange={(e) => setAddress(e.target.value)}
                                      placeholder="e.g., 220 Silver Lake Drive, Reno, NV 89501"
                                    />
                                    <div className="text-muted small mt-1">{t("editProfile.branchMuted")}</div>
                                  </div>
                    
                                  <div className="col-md-6">
                                    <FieldLabel>{t("editProfile.region")}</FieldLabel>
                                    <select name="" id="" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)}>
                                      <option value="" disabled>{t("editProfile.selectRegion")}</option>
                                      {
                                        regionList.map((region) => (
                                          <option key={region.value} value={region.value}>{region.label}</option>
                                        ))
                                      }
                                    </select>
                                  </div>
                    
                                  <div className="col-md-6">
                                    <FieldLabel>{t("editProfile.industry")}</FieldLabel>
                                    <div className="rounded-4" style={{ minHeight: 44 }}>
                                      <MultipleSelect
                                        data={industryOptions}
                                        value={industry}
                                        onChange={setIndustry}
                                        placeholder="Select industry"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardBox>
                            </div>

                            <div className="mt-4">
                                <SectionTitle title="Organizational Information" />
                                <CardBox>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                    <FieldLabel>{t("editProfile.founded")}</FieldLabel>
                                    <input
                                        className="form-control rounded-4"
                                        style={{ height: 44 }}
                                        type="text"
                                        value={founded}
                                        onChange={(e) => setFounded(e.target.value)}
                                        placeholder="e.g., 1988"
                                    />
                                    </div>
                    
                                    <div className="col-md-4">
                                    <FieldLabel>{t("editProfile.noOfEmp")}</FieldLabel>
                                    <input
                                        className="form-control rounded-4"
                                        style={{ height: 44 }}
                                        type="number"
                                        value={employees}
                                        onChange={(e) => setEmployees(Number(e.target.value))}
                                        placeholder="e.g., 200"
                                    />
                                    </div>
                    
                                    {/* <div className="col-md-2">
                                    <FieldLabel>Fee</FieldLabel>
                                    <input
                                        className="form-control rounded-4"
                                        style={{ height: 44 }}
                                        type="text"
                                        value={fee}
                                        onChange={(e) => setFee(e.target.value)}
                                        placeholder="100"
                                    />
                                    </div> */}
                    
                                    <div className="col-md-4">
                                    <FieldLabel>{t("editProfile.points")}</FieldLabel>
                                    <input
                                        className="form-control rounded-4"
                                        style={{ height: 44 }}
                                        type="text"
                                        value={appealPoint}
                                        onChange={(e) => setAppealPoint(e.target.value)}
                                        placeholder="100"
                                    />
                                    </div>

                                    <div className="col-12">
                                        <FieldLabel>{t("editProfile.perks")}</FieldLabel>
                                        <div className="rounded-4" style={{ minHeight: 44 }}>
                                            <MultipleSelect
                                            data={items.map((item) => ({ label: item.name, value: String(item.id) }))}
                                            value={perksBenefits}
                                            onChange={setPerksBenefits}
                                            placeholder="Select perks & benefits"
                                            />
                                        </div>
                                    </div>
                    
                                    <div className="col-12">
                                        <FieldLabel>{t("editProfile.profile")}</FieldLabel>
                                        <div className="border rounded-4 p-2" style={{ background: "#fff" }}>
                                            <TextEditor value={companyProfileText} onChange={(value) => setCompanyProfileText(value)} />
                                        </div>
                                    </div>
                    
                                    
                                </div>
                                </CardBox>
                            </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("editProfile.close")}
                    </Button>
                    <Button className="btn-primary-custom rounded-3" onClick={saveChanges}>
                        {t("editProfile.save")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}