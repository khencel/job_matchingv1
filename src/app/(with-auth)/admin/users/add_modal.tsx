import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createUser } from "@/redux/slices/auth/genericAuthThunk";
import { useAppDispatch } from "@/redux/hooks";
import MultipleSelect from "@/components/MultipleSelectStandard";
import { listCategory, regionList } from "@/components/listGroupData";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import { fetchUsers } from "@/redux/slices/applicants/userThunk";
import { useTranslations } from "next-intl";


interface AddModalProps {
  handleShow: boolean;
  handleClose: () => void;
}

type FormState = {
  fullName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  numberOfEmployees: string;
  appealPoints: string;
  foundedYear: string;
  industry: { label: string; value: string }[]; 
  region: string;
};

type TouchedState = Record<keyof FormState, boolean>;

const initialForm: FormState = {
  fullName: "",
  email: "",
  companyName: "",
  companyAddress: "",
  phoneNumber: "",
  numberOfEmployees: "",
  appealPoints: "",
  foundedYear: "",
  industry: [],
  region: "",
};

const initialTouched: TouchedState = {
  fullName: false,
  email: false,
  companyName: false,
  companyAddress: false,
  phoneNumber: false,
  numberOfEmployees: false,
  appealPoints: false,
  foundedYear: false,
  industry: false,
  region: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9()+\-\s]{7,20}$/;

export default function AddUserModal({
  handleShow,
  handleClose,
}: AddModalProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>(initialForm);
  const [touched, setTouched] = useState<TouchedState>(initialTouched);
  const t = useTranslations("adminUsers");
  useEffect(() => {
    if (!handleShow) {
      setForm(initialForm);
      setTouched(initialTouched);
    }
  }, [handleShow]);

  const currentYear = new Date().getFullYear();

  const i  = useTranslations("list");

  const regionListData = regionList(i)
  const industryListData = listCategory(i)

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) e.fullName = t("addUser.validation.fullname");
    else if (form.fullName.trim().length < 2) e.fullName = t("addUser.validationAccept.validFname");

    if (!form.email.trim()) e.email = t("addUser.validation.email");
    else if (!emailRegex.test(form.email.trim())) {
      e.email = t("addUser.validationAccept.validEmail");
    }

    if (!form.companyName.trim()) e.companyName = t("addUser.validation.companyName");
    else if (form.companyName.trim().length < 2) {
      e.companyName = t("addUser.validationAccept.validCompName");
    }

    if (!form.companyAddress.trim()) e.companyAddress = t("addUser.validation.companyAddress");
    else if (form.companyAddress.trim().length < 5) {
      e.companyAddress = t("addUser.validationAccept.validAddress");
    }

    if (!form.phoneNumber.trim()) e.phoneNumber = t("addUser.validation.phone");
    else if (!phoneRegex.test(form.phoneNumber.trim())) {
      e.phoneNumber = t("addUser.validationAccept.validPhone");
    }

    if (!form.numberOfEmployees.trim()) {
      e.numberOfEmployees = t("addUser.validation.noEmp");
    } else {
      const n = Number(form.numberOfEmployees);
      if (!Number.isFinite(n) || !Number.isInteger(n)) {
        e.numberOfEmployees = t("addUser.validationAccept.validNoEmpWhole");
      } else if (n <= 0) {
        e.numberOfEmployees = t("addUser.validationAccept.validNoEmpGreater");
      }
    }

    if (!form.appealPoints.trim()) {
      e.appealPoints = "Appeal points is required.";
    } else if (form.appealPoints.trim().length < 3) {
      e.appealPoints = "Please add more details (min 3 chars).";
    }

    if (!form.foundedYear.trim()) {
      e.foundedYear = t("addUser.validation.founded");
    } else {
      const y = Number(form.foundedYear);
      if (!Number.isFinite(y) || !Number.isInteger(y)) {
        e.foundedYear =  t("addUser.validationAccept.validFounded");
      } else if (y < 1800 || y > currentYear) {
        e.foundedYear = `${t("addUser.validationAccept.validFoundedBetween")} ${currentYear}.`;
      }
    }

    if (!form.region.trim()) {
      e.region = t("addUser.validation.region");
    }

    if (!form.industry.length) {
      e.industry = t("addUser.validation.industry");
    }

    return e;
  }, [form, currentYear]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const showInvalid = (key: keyof FormState) => touched[key] && !!errors[key];
  const showValid = (key: keyof FormState) => touched[key] && !errors[key];

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      companyName: true,
      companyAddress: true,
      phoneNumber: true,
      numberOfEmployees: true,
      appealPoints: true,
      foundedYear: true,
      industry: true,
      region: true,
    });

    if (!isValid) return;

    const payload = {
      email: form.email.trim(),
      user_type: "employer",
      is_email_verified: true,
      details: JSON.stringify({
        contact_person: {
          name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phoneNumber.trim(),
        },
        company_information: {
          name: form.companyName.trim(),
          email: form.email.trim(),
          phone: form.phoneNumber.trim(),
          address: form.companyAddress.trim(),
          no_of_emp: Number(form.numberOfEmployees),
          appeal_point: form.appealPoints.trim(),
          founded: Number(form.foundedYear),
          company_industry: form.industry.map((item) => item.value),
        },
      }),
    };

    popup({
      title: t("addUser.popcreate.title"),
      text: t("addUser.popcreate.text"),
      icon: "warning",
      onConfirm: async () => {
        await dispatch(createUser(payload));
        handleClose();
        showSuccessToast(t("addUser.popcreate.toastText"),t("addUser.popcreate.toastDesc"));

        await dispatch(fetchUsers({page:1, filter: { role: "all" }}));
      }
    });
  };

  return (
    <Modal size="lg" show={handleShow} onHide={handleClose} centered>
      <Form onSubmit={onSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{t("addUser.header")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 mb-3">
              <Form.Group controlId="fullName">
                <Form.Label>{t("addUser.label.fullname")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("addUser.placeholder.fullname")}
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  onBlur={() => markTouched("fullName")}
                  isInvalid={showInvalid("fullName")}
                  isValid={showValid("fullName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-6 mb-3">
              <Form.Group controlId="email">
                <Form.Label>{t("addUser.label.email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("addUser.placeholder.email")}
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => markTouched("email")}
                  isInvalid={showInvalid("email")}
                  isValid={showValid("email")}
                  inputMode="email"
                  autoComplete="email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-12 mb-3">
              <hr />
              <strong>{t("addUser.label.companyInfo")}</strong>
            </div>

            <div className="col-12 mb-3">
              <Form.Group controlId="companyName">
                <Form.Label>{t("addUser.label.companyName")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("addUser.placeholder.companyName")}
                  value={form.companyName}
                  onChange={(e) => setField("companyName", e.target.value)}
                  onBlur={() => markTouched("companyName")}
                  isInvalid={showInvalid("companyName")}
                  isValid={showValid("companyName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-12 mb-3">
              <Form.Group controlId="companyAddress">
                <Form.Label>{t("addUser.label.companyAddress")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t("addUser.placeholder.companyAddress")}
                  value={form.companyAddress}
                  onChange={(e) => setField("companyAddress", e.target.value)}
                  onBlur={() => markTouched("companyAddress")}
                  isInvalid={showInvalid("companyAddress")}
                  isValid={showValid("companyAddress")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyAddress}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-6 mb-3">
              <Form.Group controlId="phoneNumber">
                <Form.Label>{t("addUser.label.phone")}</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder={t("addUser.placeholder.phone")}
                  value={form.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  onBlur={() => markTouched("phoneNumber")}
                  isInvalid={showInvalid("phoneNumber")}
                  isValid={showValid("phoneNumber")}
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-3 mb-3">
              <Form.Group controlId="numberOfEmployees">
                <Form.Label>{t("addUser.label.noEmp")}</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  step={1}
                  placeholder={t("addUser.placeholder.noEmp")}
                  value={form.numberOfEmployees}
                  onChange={(e) => setField("numberOfEmployees", e.target.value)}
                  onBlur={() => markTouched("numberOfEmployees")}
                  isInvalid={showInvalid("numberOfEmployees")}
                  isValid={showValid("numberOfEmployees")}
                  inputMode="numeric"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numberOfEmployees}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-3 mb-3">
              <Form.Group controlId="foundedYear">
                <Form.Label>{t("addUser.label.founded")}</Form.Label>
                <Form.Control
                  type="number"
                  min={1800}
                  max={currentYear}
                  step={1}
                  placeholder={t("addUser.placeholder.founded")}
                  value={form.foundedYear}
                  onChange={(e) => setField("foundedYear", e.target.value)}
                  onBlur={() => markTouched("foundedYear")}
                  isInvalid={showInvalid("foundedYear")}
                  isValid={showValid("foundedYear")}
                  inputMode="numeric"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.foundedYear}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-12 mb-3">
              <Form.Group controlId="industry">
                <Form.Label>{t("addUser.label.industry")}</Form.Label>
                <MultipleSelect
                  data={industryListData}
                  value={form.industry}
                  onChange={(selected) => {
                    setField("industry", selected);
                    markTouched("industry");
                  }}
                  placeholder={t("addUser.placeholder.industry")}
                />
                {showInvalid("industry") && (
                  <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                    {errors.industry}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </div>

            <div className="col-6 mb-3">
              <Form.Group controlId="region">
                <Form.Label>{t("addUser.label.region")}</Form.Label>
                <Form.Select
                  value={form.region}
                  onChange={(e) => setField("region", e.target.value)}
                  onBlur={() => markTouched("region")}
                  isInvalid={showInvalid("region")}
                  isValid={showValid("region")}
                >
                  <option value="" disabled>{t("addUser.placeholder.region")}</option>
                  {
                    regionListData.map((region) => (
                      <option key={region.value} value={region.value}>{region.label}</option>
                    ))
                  }
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.region}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-6 mb-3">
              <Form.Group controlId="appealPoints">
                <Form.Label>{t("addUser.label.appeal")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={form.appealPoints}
                  onChange={(e) => setField("appealPoints", e.target.value)}
                  onBlur={() => markTouched("appealPoints")}
                  isInvalid={showInvalid("appealPoints")}
                  isValid={showValid("appealPoints")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.appealPoints}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} type="button">
            {t("addUser.cancel")}
          </Button>

          <Button
            type="submit"
            className="btn btn-primary-custom rounded-3"
          >
            {t("addUser.createUser")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}