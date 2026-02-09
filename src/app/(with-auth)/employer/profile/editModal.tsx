"use client";

import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextEditor from "../post_a_job/job-description/TextEditor";
import { useAppDispatch } from "@/redux/hooks";
import { updateProfile } from "@/redux/slices/profile/profilethunk";
import { useEffect } from "react";
import { getProfile } from "@/redux/slices/profile/profilethunk";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import Cookies from "js-cookie";
import MultipleSelect from "@/components/MultipleSelectStandard";
import { useTranslations } from "next-intl";

interface EditModalProps {
  handleShow: boolean;
  handleClose: () => void;
  companyProfile?: any;
}

export default function EditModalProfile({
  handleShow,
  handleClose,
  companyProfile,
}: EditModalProps) {
  const t = useTranslations("employerProfileEditModal");
  const dispatch = useAppDispatch();

  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [companyProfileText, setCompanyProfileText] = useState("");
  const [founded, setFounded] = useState("");
  const [employees, setEmployees] = useState(0);
  const [region, setRegion] = useState("");
  const [industry, setIndustry] = useState<{ label: string; value: string }[]>(
    [],
  );

  const industryOptions = (t.raw("industryOptions") as string[]).map(
    (item) => ({
      label: item,
      value: item,
    }),
  );

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

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
      title: t("confirm.title"),
      text: t("confirm.text"),
      confirmText: t("confirm.confirmText"),
      icon: "warning",
      onConfirm: () => {
        handleSave();
      },
    });
  };

  const handleSave = () => {
    const updatedEmployerDetails = {
      ...companyProfile.userDetails_emp.company_information,
      name: companyName,
      profile: companyProfileText,
      founded: founded,
      no_of_emp: employees,
      region: region,
      company_industry: industry.map((item) => item.value),
    };

    const userDetails_emp = {
      ...companyProfile.userDetails_emp,
      company_information: updatedEmployerDetails,
    };

    const payload: any = {
      userDetails_emp,
      user_id: Number(Cookies.get("user_id")),
    };

    if (logoFile instanceof File) {
      payload.avatar = logoFile;
    }

    if (bannerFile instanceof File) {
      payload.banner = bannerFile;
    }

    dispatch(updateProfile(payload))
      .unwrap()
      .then(() => {
        const user_id = Number(Cookies.get("user_id"));
        dispatch(getProfile(user_id));
        showSuccessToast(t("toast.title"), t("toast.success"));
        handleClose();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  // Update state when companyProfile changes
  useEffect(() => {
    const companyInfo =
      companyProfile?.userDetails_emp?.company_information || {};

    setCompanyName(companyInfo.name || "");
    setFounded(companyInfo.founded || "");
    setEmployees(companyInfo.no_of_emp || 0);
    setRegion(companyInfo.region || "");
    setCompanyProfileText(companyInfo.profile || "");

    const existingIndustry = companyInfo.company_industry;

    if (Array.isArray(existingIndustry)) {
      setIndustry(
        existingIndustry.map((item: string) => ({
          label: item,
          value: item,
        })),
      );
    } else {
      setIndustry([]);
    }

    setLogoPreview(companyProfile.avatar || null);
    setBannerPreview(companyProfile.banner || null);
  }, [companyProfile]);

  return (
    <>
      <Modal
        centered
        show={handleShow}
        dialogClassName="edit_profile_modal"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("title")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <strong className="standar-text">{t("logoBanner")}</strong>

          <div className="row mt-3">
            {/* LOGO */}
            <div className="col-md-3 border p-2">
              <small>{t("uploadLogo")}</small>
              <div className="edit-logo-profile my-2">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="logo-preview"
                  />
                ) : (
                  <div className="text-muted small text-center">
                    {t("noLogo")}
                  </div>
                )}
              </div>
              <small>
                {logoFile ? formatFileSize(logoFile.size) : t("noFile")}{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleReplaceLogo}
                >
                  {t("replace")}
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
              <small>{t("bannerImage")}</small>
              <div className="edit-banner-profile my-2">
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="banner-preview"
                  />
                ) : (
                  <div className="text-muted small text-center">
                    {t("noBanner")}
                  </div>
                )}
              </div>
              <small>
                {bannerFile ? formatFileSize(bannerFile.size) : t("noFile")}{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleReplaceBanner}
                >
                  {t("replace")}
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
                {t("companyName")}
                <br />
                <input
                  className="form-control"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                {t("companyProfile")}
                <br />
                <TextEditor
                  value={companyProfileText}
                  onChange={(value) => setCompanyProfileText(value)}
                />
              </div>
              <div className="mt-2">
                <div className="row">
                  <div className="col">
                    {t("companyFounded")}
                    <br />
                    <input
                      className="form-control"
                      type="date"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    {t("employees")}
                    <br />
                    <input
                      className="form-control"
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                    />
                  </div>
                  <div className="col">
                    {t("region")}
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    {t("industry")}
                    <br />
                    <MultipleSelect
                      data={industryOptions}
                      value={industry}
                      onChange={setIndustry}
                      placeholder={t("selectIndustry")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("close")}
          </Button>
          <Button
            className="btn-primary-custom rounded-3"
            onClick={saveChanges}
          >
            {t("saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
