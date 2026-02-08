"use client";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  goNextStep,
  saveRegJobSeekerStep2,
} from "@/redux/slices/register/job-seeker/jobseekerSlice";
import { isPhoneNumberValid } from "@/helper/validations";
import { RegisterJobSeekerStep2Data } from "@/types/job-seeker";

const RegisterJobSeekerStep2 = () => {
  const t = useTranslations("registerJobSeekerStep2");
  const dispatch = useAppDispatch();

  const jobSeekerData = useAppSelector(
    (state) => state.registerJobSeeker?.registerJobSeekerData?.jobSeekerData
  );

  const [error, setError] = useState<{ [name: string]: boolean }>({});
  const [data, setData] = useState<RegisterJobSeekerStep2Data>(jobSeekerData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // Clear error for the field on change
    setError((prev) => ({ ...prev, [name]: false }));
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate the min and max dates for age 18-90
  const getMinBirthdateFor90YearsOld = () => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    );
    return minDate.toISOString().split("T")[0];
  };

  const getMaxBirthdateFor18YearsOld = () => {
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return maxDate.toISOString().split("T")[0];
  };

  const isFacebookUrlValid = (url: string): boolean => {
    if (!url) return true; // optional field
    const fbRegex = /^(https?:\/\/)?([\w.-]+\.)?facebook\.com\/[^\s]+$/i;
    return fbRegex.test(url.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    // First validation: Check HTML5 form validity
    if (form.checkValidity() === false) {
      e.stopPropagation();

      const invalidFields = form.querySelectorAll(":invalid");
      const newErrors: Record<string, boolean> = {};

      invalidFields.forEach((field) => {
        const input = field as HTMLInputElement;
        if (input.name) {
          newErrors[input.name] = true;
        }
      });
      setError(newErrors);

      // Find the first invalid field and focus on it
      const firstInvalidField = form.querySelector(":invalid") as HTMLElement;
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Second validation: Check custom business logic
    let hasError = false;
    const validationErrors: Record<string, boolean> = {};

    // Validate firstName
    if (!data.firstName || data.firstName.trim().length < 2) {
      validationErrors.firstName = true;
      hasError = true;
    }

    // Validate midName (optional but if provided must be >= 2 chars)
    if (
      data.midName &&
      data.midName.trim().length > 0 &&
      data.midName.trim().length < 2
    ) {
      validationErrors.midName = true;
      hasError = true;
    }

    // Validate lastName
    if (!data.lastName || data.lastName.trim().length < 2) {
      validationErrors.lastName = true;
      hasError = true;
    }

    // Validate nationality
    if (!data.nationality) {
      validationErrors.nationality = true;
      hasError = true;
    }

    // Validate gender
    if (!data.gender) {
      validationErrors.gender = true;
      hasError = true;
    }

    // Validate current place of residence
    if (
      !data.currentPlaceResidence ||
      data.currentPlaceResidence.trim().length < 2
    ) {
      validationErrors.currentPlaceResidence = true;
      hasError = true;
    }

    // Validate birthdate
    const birthdate = data.birthdate;
    const minBirthdate = getMinBirthdateFor90YearsOld();
    const maxBirthdate = getMaxBirthdateFor18YearsOld();
    if (!birthdate || birthdate > maxBirthdate || birthdate < minBirthdate) {
      validationErrors.birthdate = true;
      hasError = true;
    }

    // Validate visa status
    if (!data.visaStatus) {
      validationErrors.visaStatus = true;
      hasError = true;
    }

    // Validate highest education
    if (!data.highestEducation) {
      validationErrors.highestEducation = true;
      hasError = true;
    }

    // Validate japanese level
    if (!data.japaneseLevel) {
      validationErrors.japaneseLevel = true;
      hasError = true;
    }

    // Validate contact number
    if (!data.contactNo || !isPhoneNumberValid(data.contactNo)) {
      validationErrors.contactNo = true;
      hasError = true;
    }

    // Validate facebook URL (optional but validate if provided)
    if (data.facebook && !isFacebookUrlValid(data.facebook)) {
      validationErrors.facebook = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = form.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      if (errorElement) errorElement.focus();
      return;
    }

    // All validations passed - save data and show success message
    setError({});
    Swal.fire({
      icon: "success",
      title: t("toast.successTitle"),
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(saveRegJobSeekerStep2(data));
    dispatch(goNextStep(3));
  };

  const birthdateInvalid =
    error.birthdate ||
    (!!data.birthdate &&
      (data.birthdate > getMaxBirthdateFor18YearsOld() ||
        data.birthdate < getMinBirthdateFor90YearsOld()));

  const contactInvalid =
    error.contactNo ||
    (data.contactNo.length > 0 && !isPhoneNumberValid(data.contactNo));

  const facebookInvalid =
    !!error.facebook || (!!data.facebook && !isFacebookUrlValid(data.facebook));

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">{t("title")}</h4>
      <Form.Group className="mb-3">
        <Form.Label>{t("labels.firstName")}</Form.Label>
        <Form.Control
          required
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          placeholder={t("placeholders.firstName")}
          minLength={2}
          isInvalid={
            error.firstName ||
            (data.firstName.length > 0 && data.firstName.length < 2)
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.nameTooShort")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {t("labels.midName")}{" "}
          <span className="text-muted">({t("labels.optional")})</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="midName"
          value={data.midName || ""}
          onChange={handleChange}
          placeholder={t("placeholders.midName")}
          minLength={2}
          isInvalid={
            !!(
              error.midName ||
              (data.midName &&
                data.midName.length > 0 &&
                data.midName.length < 2)
            )
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.nameTooShort")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.lastName")}</Form.Label>
        <Form.Control
          required
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder={t("placeholders.lastName")}
          minLength={2}
          isInvalid={
            error.lastName ||
            (data.lastName.length > 0 && data.lastName.length < 2)
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.nameTooShort")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.nationality")}</Form.Label>
        <Form.Select
          required
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          isInvalid={!!error.nationality}
        >
          <option value="">{t("placeholders.selectNationality")}</option>
          {NATIONALITIES.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {t("errors.nationalityRequired")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.gender")}</Form.Label>
        <div className="d-flex gap-3 mt-2">
          <Form.Check
            required
            type="radio"
            name="gender"
            id="gender-male"
            label={t("options.male")}
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
            feedback={t("errors.genderRequired")}
            feedbackType="invalid"
            isInvalid={!!error.gender}
          />
          <Form.Check
            required
            type="radio"
            name="gender"
            id="gender-female"
            label={t("options.female")}
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
            isInvalid={!!error.gender}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.currentPlaceResidence")}</Form.Label>
        <Form.Control
          required
          type="text"
          name="currentPlaceResidence"
          value={data.currentPlaceResidence}
          onChange={handleChange}
          placeholder={t("placeholders.currentPlaceResidence")}
          minLength={2}
          isInvalid={
            error.currentPlaceResidence ||
            (data.currentPlaceResidence.length > 0 &&
              data.currentPlaceResidence.length < 2)
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.residenceTooShort")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.birthdate")}</Form.Label>
        <Form.Control
          required
          type="date"
          name="birthdate"
          value={data.birthdate}
          onChange={handleChange}
          min={getMinBirthdateFor90YearsOld()}
          max={getMaxBirthdateFor18YearsOld()}
          isInvalid={birthdateInvalid}
        />
        <Form.Control.Feedback type="invalid">
          {data.birthdate === ""
            ? t("errors.birthdateRequired")
            : data.birthdate > getMaxBirthdateFor18YearsOld()
            ? t("errors.age18Error")
            : t("errors.age100Error")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.visaStatus")}</Form.Label>
        <Form.Select
          required
          name="visaStatus"
          value={data.visaStatus || ""}
          onChange={handleChange}
          isInvalid={!!error.visaStatus}
        >
          <option value="">{t("placeholders.selectVisaStatus")}</option>
          <option value="APPLIED">{t("options.visaApplied")}</option>
          <option value="PENDING">{t("options.visaPending")}</option>
          <option value="REVIEWING">{t("options.visaReviewing")}</option>
          <option value="ISSUED">{t("options.visaIssued")}</option>
          <option value="DENIED">{t("options.visaDenied")}</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {t("errors.visaStatusRequired")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.highestEducation")}</Form.Label>
        <Form.Select
          name="highestEducation"
          value={data.highestEducation || ""}
          onChange={handleChange}
          required
          isInvalid={!!error.highestEducation}
        >
          <option value="">{t("placeholders.selectEducation")}</option>
          <option value="elementary">{t("options.elementary")}</option>
          <option value="jr-highschool">{t("options.jrHighschool")}</option>
          <option value="sr-highschool">{t("options.srHighschool")}</option>
          <option value="vocational">{t("options.vocational")}</option>
          <option value="bachelorDegree">{t("options.bachelorDegree")}</option>
          <option value="masterDegree">{t("options.masterDegree")}</option>
          <option value="doctoralDegree">{t("options.doctoralDegree")}</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {t("errors.highestEducationRequired")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.japaneseLevel")}</Form.Label>
        <Form.Select
          required
          name="japaneseLevel"
          value={data.japaneseLevel || ""}
          onChange={handleChange}
          isInvalid={!!error.japaneseLevel}
        >
          <option value="">{t("placeholders.selectJapaneseLevel")}</option>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {t("errors.japaneseLevelRequired")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("labels.contactNo")}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type="text"
            name="contactNo"
            value={data.contactNo}
            onChange={handleChange}
            placeholder={t("placeholders.contactNo")}
            pattern="[0-9]{7,}"
            isInvalid={contactInvalid}
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.contactNoTooShort")}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {t("labels.facebook")}{" "}
          <span className="text-muted">({t("labels.optional")})</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="facebook"
          value={data.facebook || ""}
          onChange={handleChange}
          placeholder={t("placeholders.facebook")}
          minLength={5}
          isInvalid={!!facebookInvalid}
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidFacebookUrl")}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="w-100 my-3 fw-bold p-2"
      >
        {t("buttons.next")}
      </Button>
    </Form>
  );
};

const NATIONALITIES: string[] = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "Ecuadorian",
  "Egyptian",
  "Emirati",
  "English",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakh",
  "Kenyan",
  "Korean",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Moldovan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mozambican",
  "Namibian",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Singaporean",
  "Slovak",
  "Slovenian",
  "Somali",
  "South African",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamese",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Trinidadian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbek",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
];

export default RegisterJobSeekerStep2;
