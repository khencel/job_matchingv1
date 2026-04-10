"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import MultipleSelect from "@/components/MultipleSelectStandard";
import TextEditor from "../post_a_job/job-description/TextEditor";
import { regionList } from "@/components/listGroupData";
import { popup } from "@/helper/pop_up";
import { createCompany, indexCompany, getCompanyAdmin } from "@/redux/slices/employer/company/companyThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showSuccessToast } from "@/app/(util)/toaster";
import ImageDropzone from "@/components/dropzone";
import { indexPerksBenefits } from "@/redux/slices/perks_benefits/perksBenefitsThunk";
import Cookie from "js-cookie";
import { listCategory } from "@/components/listGroupData";
import { useTranslations } from "next-intl";



interface AddModalProps {
  handleShow: boolean;
  handleClose: () => void;
  userID_opt?: string;
  onSuccess?: () => any;
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

export default function AddCompanyModal({ handleShow, handleClose, userID_opt, onSuccess }: AddModalProps) {
    const dispatch = useAppDispatch();
    const i = useTranslations("list");
    const regionListData = regionList(i);
    const listCategoryData = listCategory(i);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [fee, setFee] = useState("100");
    const [appealPoint, setAppealPoint] = useState("100");
    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [founded, setFounded] = useState("");
    const [employees, setEmployees] = useState<number>(0);
    const [companyProfileText, setCompanyProfileText] = useState("");
    const [industry, setIndustry] = useState<{ label: string; value: string }[]>([]);
    const [perksBenefits, setPerksBenefits] = useState<{label: string; value: string}[]>([]);
    const [branchOffice, setBranchOffice] = useState<string[]>([]);
    const [email, setEmail] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const { items } = useAppSelector((state) => state.perksAndBenefitsSlice);
    const userID = Cookie.get("userID") || "";


    const handleSubmit = () => {
      popup({
        title: "Create Company?",
        text: "Are you sure you want to create this company?",
        icon: "warning",
        onConfirm: async () => {
          await handleCreateCompany();
          showSuccessToast("Create company","Company created successfully.");
          if(!userID_opt){
            await dispatch(indexCompany({page: 1, pageSize: 10})).unwrap();
          }
        }
      });
    }

    const handleCreateCompany = async () => {
      setErrorMsg("");

      // basic validation
      if (!companyName.trim()) return setErrorMsg("Company name is required.");
      if (!phone.trim()) return setErrorMsg("Phone number is required.");
      if (!region.trim()) return setErrorMsg("Region is required.");
      if (!address.trim()) return setErrorMsg("Address is required.");
      if (!founded.trim()) return setErrorMsg("Founded year is required.");
      if (industry.length === 0) return setErrorMsg("Please select at least one industry.");

      const payload = {
        company_information:{
          fee: fee || "0",
          name: companyName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          region: region.trim(),
          address: address.trim(),
          founded: founded.trim(),
          profile: companyProfileText, 
          no_of_emp: String(employees || 0),
          appeal_point: appealPoint || "0",
          branch_office: branchOffice.length ? branchOffice : [address.trim()],
          company_industry: industry.map((i) => i.value),
          perks_benefits: perksBenefits.map((i) => i.value),
        }
        
      };

      try {
        setIsSubmitting(true);

        const formData = new FormData();

      
        formData.append("information", JSON.stringify(payload));

    
        if (logoFile) {
          formData.append("avatar", logoFile);
        }

        if (bannerFile) {
          formData.append("banner", bannerFile);
        }

        if (userID_opt) {
          formData.append("user_id", userID_opt);
        }

        
        await dispatch(createCompany(formData)).unwrap();
        if (onSuccess) {
          await onSuccess();
        }

        handleClose();

        setCompanyName("");
        setPhone("");
        setEmail("");
        setRegion("");
        setAddress("");
        setFounded("");
        setEmployees(0);
        setCompanyProfileText("");
        setIndustry([]);
        setPerksBenefits([]);
        setBranchOffice([]);
        setFee("100");
        setAppealPoint("100");
        setLogoFile(null);
        setLogoPreview(null);
        setBannerFile(null);
        setBannerPreview(null);
      } catch (err: any) {
        console.error(err);
        setErrorMsg(err?.message || "Failed to create company. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  useEffect(() => {
    return () => {
      dispatch(indexPerksBenefits(Number(userID)));
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
    
    
  }, [logoPreview, bannerPreview]);

  return (
    <Modal dialogClassName="edit_profile_modal" show={handleShow} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <div>
          <Modal.Title className="fw-bold">Add Company</Modal.Title>
          <div className="text-muted small">Complete your company info to start posting jobs.</div>
        </div>
      </Modal.Header>

      <Modal.Body className="pt-3">
        {/* Uploads (preview only for now) */}
        <SectionTitle title="Logo & Banner" subtitle="Drag & drop or click to upload" />
        <div className="row g-3">
          <div className="col-md-4">
            <ImageDropzone
              label="Logo"
              previewUrl={logoPreview}
              file={logoFile}
              objectFit="contain"
              height={140}
              onChange={(file) => {
                // cleanup old preview
                if (logoPreview) URL.revokeObjectURL(logoPreview);

                setLogoFile(file);
                setLogoPreview(URL.createObjectURL(file));
              }}
              onClear={() => {
                if (logoPreview) URL.revokeObjectURL(logoPreview);
                setLogoFile(null);
                setLogoPreview(null);
              }}
            />
          </div>

          <div className="col-md-8">
            <ImageDropzone
              label="Banner"
              previewUrl={bannerPreview}
              file={bannerFile}
              objectFit="cover"
              height={140}
              onChange={(file) => {
                if (bannerPreview) URL.revokeObjectURL(bannerPreview);

                setBannerFile(file);
                setBannerPreview(URL.createObjectURL(file));
              }}
              onClear={() => {
                if (bannerPreview) URL.revokeObjectURL(bannerPreview);
                setBannerFile(null);
                setBannerPreview(null);
              }}
            />
          </div>
        </div>

        {/* Basic info */}
        <div className="mt-4">
          <SectionTitle title="Basic Information" />
          <CardBox>
            <div className="row g-3">
                <div className="col-md-4">
                  <FieldLabel>Company Name</FieldLabel>
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
                <FieldLabel>Phone Number</FieldLabel>
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
                  <FieldLabel>Email</FieldLabel>
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
                <FieldLabel>Address</FieldLabel>
                <input
                  className="form-control rounded-4"
                  style={{ height: 44 }}
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g., 220 Silver Lake Drive, Reno, NV 89501"
                />
                <div className="text-muted small mt-1">Branch office will default to this address.</div>
              </div>

              <div className="col-md-6">
                <FieldLabel>Region</FieldLabel>
                <select name="" id="" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="" disabled>Select Region</option>
                  {
                    regionListData.map((region) => (
                      <option key={region.value} value={region.value}>{region.label}</option>
                    ))
                  }
                </select>
              </div>

              <div className="col-md-6">
                <FieldLabel>Industry</FieldLabel>
                <div className="rounded-4" style={{ minHeight: 44 }}>
                  <MultipleSelect
                    data={listCategoryData}
                    value={industry}
                    onChange={setIndustry}
                    placeholder="Select industry"
                  />
                </div>
              </div>
            </div>
          </CardBox>
        </div>

        {/* Org info */}
        <div className="mt-4">
          <SectionTitle title="Organizational Information" />
          <CardBox>
            <div className="row g-3">
              <div className="col-md-4">
                <FieldLabel>Founded</FieldLabel>
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
                <FieldLabel>No. of Employees</FieldLabel>
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
                <FieldLabel>Appeal Point</FieldLabel>
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
                <FieldLabel>Perks & Benefits</FieldLabel>
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
                <FieldLabel>Company Profile</FieldLabel>
                <div className="border rounded-4 p-2" style={{ background: "#fff" }}>
                  <TextEditor value={companyProfileText} onChange={(value) => setCompanyProfileText(value)} />
                </div>
              </div>

              {errorMsg ? (
                <div className="col-12">
                  <div className="alert alert-danger mb-0 py-2 rounded-4">{errorMsg}</div>
                </div>
              ) : null}
            </div>
          </CardBox>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <div className="d-flex w-100 gap-2 justify-content-end">
          <Button variant="light" className="rounded-4 px-4" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button
            className="btn btn-primary-custom rounded-4 px-4"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}


