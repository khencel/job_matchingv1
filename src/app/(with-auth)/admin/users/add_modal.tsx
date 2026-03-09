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

  useEffect(() => {
    if (!handleShow) {
      setForm(initialForm);
      setTouched(initialTouched);
    }
  }, [handleShow]);

  const currentYear = new Date().getFullYear();

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2) e.fullName = "Enter a valid name.";

    if (!form.email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(form.email.trim())) {
      e.email = "Enter a valid email address.";
    }

    if (!form.companyName.trim()) e.companyName = "Company name is required.";
    else if (form.companyName.trim().length < 2) {
      e.companyName = "Enter a valid company name.";
    }

    if (!form.companyAddress.trim()) e.companyAddress = "Company address is required.";
    else if (form.companyAddress.trim().length < 5) {
      e.companyAddress = "Enter a valid address.";
    }

    if (!form.phoneNumber.trim()) e.phoneNumber = "Phone number is required.";
    else if (!phoneRegex.test(form.phoneNumber.trim())) {
      e.phoneNumber = "Enter a valid phone number.";
    }

    if (!form.numberOfEmployees.trim()) {
      e.numberOfEmployees = "Number of employees is required.";
    } else {
      const n = Number(form.numberOfEmployees);
      if (!Number.isFinite(n) || !Number.isInteger(n)) {
        e.numberOfEmployees = "Must be a whole number.";
      } else if (n <= 0) {
        e.numberOfEmployees = "Must be greater than 0.";
      }
    }

    if (!form.appealPoints.trim()) {
      e.appealPoints = "Appeal points is required.";
    } else if (form.appealPoints.trim().length < 3) {
      e.appealPoints = "Please add more details (min 3 chars).";
    }

    if (!form.foundedYear.trim()) {
      e.foundedYear = "Founded year is required.";
    } else {
      const y = Number(form.foundedYear);
      if (!Number.isFinite(y) || !Number.isInteger(y)) {
        e.foundedYear = "Enter a valid year.";
      } else if (y < 1800 || y > currentYear) {
        e.foundedYear = `Year must be between 1800 and ${currentYear}.`;
      }
    }

    if (!form.region.trim()) {
      e.region = "Region is required.";
    }

    if (!form.industry.length) {
      e.industry = "Please select at least one industry.";
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
      title: "Create User?",
      text: "Are you sure you want to create this user?",
      icon: "warning",
      onConfirm: async () => {
        await dispatch(createUser(payload));
        handleClose();
        showSuccessToast("Create user","User created successfully.");

        await dispatch(fetchUsers({page:1, filter: { role: "all" }}));
      }
    });
  };

  return (
    <Modal size="lg" show={handleShow} onHide={handleClose} centered>
      <Form onSubmit={onSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 mb-3">
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
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
              <strong>Company Information</strong>
            </div>

            <div className="col-12 mb-3">
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
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
                <Form.Label>Company Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter company address"
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
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="e.g. +63 912 345 6789"
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
                <Form.Label>Number of Employees</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  step={1}
                  placeholder="e.g. 50"
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
                <Form.Label>Company Founded Year</Form.Label>
                <Form.Control
                  type="number"
                  min={1800}
                  max={currentYear}
                  step={1}
                  placeholder={`e.g. ${currentYear - 5}`}
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
                <Form.Label>Industry</Form.Label>
                <MultipleSelect
                  data={listCategory}
                  value={form.industry}
                  onChange={(selected) => {
                    setField("industry", selected);
                    markTouched("industry");
                  }}
                  placeholder="Select industry"
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
                <Form.Label>Region</Form.Label>
                <Form.Select
                  value={form.region}
                  onChange={(e) => setField("region", e.target.value)}
                  onBlur={() => markTouched("region")}
                  isInvalid={showInvalid("region")}
                  isValid={showValid("region")}
                >
                  <option value="" disabled>Select Region</option>
                  {
                    regionList.map((region) => (
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
                <Form.Label>Appeal Points</Form.Label>
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
            Cancel
          </Button>

          <Button
            type="submit"
            className="btn btn-primary-custom rounded-3"
          >
            Create User
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}