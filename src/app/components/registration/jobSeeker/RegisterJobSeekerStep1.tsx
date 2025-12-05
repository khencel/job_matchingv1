"use client";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  goNextStep,
  saveRegJobSeekerStep1,
  RegisterJobSeekerStep1Data,
} from "@/redux/slices/register/jobSeekerSlice";

const RegisterJobSeekerStep1 = () => {
  const t = useTranslations("registerJobSeekerStep1");
  const dispatch = useAppDispatch();

  const accountInfo = useAppSelector(
    (state) => state.registerJobSeeker?.registerJobSeekerData?.accountInfo
  );

  const [error, setError] = useState<{ [name: string]: boolean }>({});
  const [data, setData] = useState<RegisterJobSeekerStep1Data>({
    nationality: "",
    gender: null,
    currentPlaceResidence: "",
    birthdate: "",
    visaStatus: null,
    highestEducation: null,
    japaneseLevel: null,
    email: "",
    contactNo: "",
    facebook: "",
  });

  useEffect(() => {
    setData(accountInfo);
  }, [accountInfo]);

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

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isContactValid = (contact: string): boolean => {
    return /^[0-9]{7,}$/.test(contact);
  };

  const isFacebookUrlValid = (url: string): boolean => {
    if (!url) return true; // optional field
    const fbRegex = /^(https?:\/\/)?([\w.-]+\.)?facebook\.com\/[^\s]+$/i;
    return fbRegex.test(url.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

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

    if (!isEmailValid(data.email)) {
      setError((prev) => ({ ...prev, email: true }));
      const emailField = form.querySelector("[name='email']") as HTMLElement;
      if (emailField) emailField.focus();
      return;
    }

    if (!isContactValid(data.contactNo)) {
      setError((prev) => ({ ...prev, contactNo: true }));
      const contactField = form.querySelector("[name='contactNo']") as HTMLElement;
      if (contactField) contactField.focus();
      return;
    }

    const birthdate = data.birthdate;
    const minBirthdate = getMinBirthdateFor90YearsOld();
    const maxBirthdate = getMaxBirthdateFor18YearsOld();
    if (!birthdate || birthdate > maxBirthdate || birthdate < minBirthdate) {
      setError((prev) => ({ ...prev, birthdate: true }));
      const birthField = form.querySelector("[name='birthdate']") as HTMLElement;
      if (birthField) birthField.focus();
      return;
    }

    if (!isFacebookUrlValid(data.facebook)) {
      setError((prev) => ({ ...prev, facebook: true }));
      const fbField = form.querySelector("[name='facebook']") as HTMLElement;
      if (fbField) fbField.focus();
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Personal Information Submitted",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });
    setError({});
    dispatch(saveRegJobSeekerStep1(data));
    dispatch(goNextStep(2));
  };

  const birthdateInvalid =
    error.birthdate ||
    (!!data.birthdate &&
      (data.birthdate > getMaxBirthdateFor18YearsOld() ||
        data.birthdate < getMinBirthdateFor90YearsOld()));

  const emailInvalid =
    error.email || (data.email.length > 0 && !isEmailValid(data.email));

  const contactInvalid =
    error.contactNo ||
    (data.contactNo.length > 0 && !isContactValid(data.contactNo));

  const facebookInvalid =
    error.facebook ||
    (!!data.facebook && !isFacebookUrlValid(data.facebook));

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">{t("title")}</h4>
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
          <option value="Afghan">Afghan</option>
          <option value="Albanian">Albanian</option>
          <option value="Algerian">Algerian</option>
          <option value="American">American</option>
          <option value="Andorran">Andorran</option>
          <option value="Angolan">Angolan</option>
          <option value="Argentine">Argentine</option>
          <option value="Armenian">Armenian</option>
          <option value="Australian">Australian</option>
          <option value="Austrian">Austrian</option>
          <option value="Azerbaijani">Azerbaijani</option>
          <option value="Bahamian">Bahamian</option>
          <option value="Bahraini">Bahraini</option>
          <option value="Bangladeshi">Bangladeshi</option>
          <option value="Barbadian">Barbadian</option>
          <option value="Belarusian">Belarusian</option>
          <option value="Belgian">Belgian</option>
          <option value="Belizean">Belizean</option>
          <option value="Beninese">Beninese</option>
          <option value="Bhutanese">Bhutanese</option>
          <option value="Bolivian">Bolivian</option>
          <option value="Bosnian">Bosnian</option>
          <option value="Brazilian">Brazilian</option>
          <option value="British">British</option>
          <option value="Bruneian">Bruneian</option>
          <option value="Bulgarian">Bulgarian</option>
          <option value="Burkinabe">Burkinabe</option>
          <option value="Burmese">Burmese</option>
          <option value="Burundian">Burundian</option>
          <option value="Cambodian">Cambodian</option>
          <option value="Cameroonian">Cameroonian</option>
          <option value="Canadian">Canadian</option>
          <option value="Cape Verdean">Cape Verdean</option>
          <option value="Central African">Central African</option>
          <option value="Chadian">Chadian</option>
          <option value="Chilean">Chilean</option>
          <option value="Chinese">Chinese</option>
          <option value="Colombian">Colombian</option>
          <option value="Comoran">Comoran</option>
          <option value="Congolese">Congolese</option>
          <option value="Costa Rican">Costa Rican</option>
          <option value="Croatian">Croatian</option>
          <option value="Cuban">Cuban</option>
          <option value="Cypriot">Cypriot</option>
          <option value="Czech">Czech</option>
          <option value="Danish">Danish</option>
          <option value="Djiboutian">Djiboutian</option>
          <option value="Dominican">Dominican</option>
          <option value="Dutch">Dutch</option>
          <option value="Ecuadorian">Ecuadorian</option>
          <option value="Egyptian">Egyptian</option>
          <option value="Emirati">Emirati</option>
          <option value="English">English</option>
          <option value="Eritrean">Eritrean</option>
          <option value="Estonian">Estonian</option>
          <option value="Ethiopian">Ethiopian</option>
          <option value="Fijian">Fijian</option>
          <option value="Filipino">Filipino</option>
          <option value="Finnish">Finnish</option>
          <option value="French">French</option>
          <option value="Gabonese">Gabonese</option>
          <option value="Gambian">Gambian</option>
          <option value="Georgian">Georgian</option>
          <option value="German">German</option>
          <option value="Ghanaian">Ghanaian</option>
          <option value="Greek">Greek</option>
          <option value="Grenadian">Grenadian</option>
          <option value="Guatemalan">Guatemalan</option>
          <option value="Guinean">Guinean</option>
          <option value="Guyanese">Guyanese</option>
          <option value="Haitian">Haitian</option>
          <option value="Honduran">Honduran</option>
          <option value="Hungarian">Hungarian</option>
          <option value="Icelandic">Icelandic</option>
          <option value="Indian">Indian</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Iranian">Iranian</option>
          <option value="Iraqi">Iraqi</option>
          <option value="Irish">Irish</option>
          <option value="Israeli">Israeli</option>
          <option value="Italian">Italian</option>
          <option value="Ivorian">Ivorian</option>
          <option value="Jamaican">Jamaican</option>
          <option value="Japanese">Japanese</option>
          <option value="Jordanian">Jordanian</option>
          <option value="Kazakh">Kazakh</option>
          <option value="Kenyan">Kenyan</option>
          <option value="Korean">Korean</option>
          <option value="Kuwaiti">Kuwaiti</option>
          <option value="Kyrgyz">Kyrgyz</option>
          <option value="Laotian">Laotian</option>
          <option value="Latvian">Latvian</option>
          <option value="Lebanese">Lebanese</option>
          <option value="Liberian">Liberian</option>
          <option value="Libyan">Libyan</option>
          <option value="Lithuanian">Lithuanian</option>
          <option value="Luxembourgish">Luxembourgish</option>
          <option value="Macedonian">Macedonian</option>
          <option value="Malagasy">Malagasy</option>
          <option value="Malawian">Malawian</option>
          <option value="Malaysian">Malaysian</option>
          <option value="Maldivian">Maldivian</option>
          <option value="Malian">Malian</option>
          <option value="Maltese">Maltese</option>
          <option value="Mauritanian">Mauritanian</option>
          <option value="Mauritian">Mauritian</option>
          <option value="Mexican">Mexican</option>
          <option value="Moldovan">Moldovan</option>
          <option value="Mongolian">Mongolian</option>
          <option value="Montenegrin">Montenegrin</option>
          <option value="Moroccan">Moroccan</option>
          <option value="Mozambican">Mozambican</option>
          <option value="Namibian">Namibian</option>
          <option value="Nepalese">Nepalese</option>
          <option value="New Zealander">New Zealander</option>
          <option value="Nicaraguan">Nicaraguan</option>
          <option value="Nigerian">Nigerian</option>
          <option value="Nigerien">Nigerien</option>
          <option value="Norwegian">Norwegian</option>
          <option value="Omani">Omani</option>
          <option value="Pakistani">Pakistani</option>
          <option value="Panamanian">Panamanian</option>
          <option value="Papua New Guinean">Papua New Guinean</option>
          <option value="Paraguayan">Paraguayan</option>
          <option value="Peruvian">Peruvian</option>
          <option value="Polish">Polish</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Qatari">Qatari</option>
          <option value="Romanian">Romanian</option>
          <option value="Russian">Russian</option>
          <option value="Rwandan">Rwandan</option>
          <option value="Saudi">Saudi</option>
          <option value="Scottish">Scottish</option>
          <option value="Senegalese">Senegalese</option>
          <option value="Serbian">Serbian</option>
          <option value="Singaporean">Singaporean</option>
          <option value="Slovak">Slovak</option>
          <option value="Slovenian">Slovenian</option>
          <option value="Somali">Somali</option>
          <option value="South African">South African</option>
          <option value="Spanish">Spanish</option>
          <option value="Sri Lankan">Sri Lankan</option>
          <option value="Sudanese">Sudanese</option>
          <option value="Surinamese">Surinamese</option>
          <option value="Swedish">Swedish</option>
          <option value="Swiss">Swiss</option>
          <option value="Syrian">Syrian</option>
          <option value="Taiwanese">Taiwanese</option>
          <option value="Tajik">Tajik</option>
          <option value="Tanzanian">Tanzanian</option>
          <option value="Thai">Thai</option>
          <option value="Togolese">Togolese</option>
          <option value="Trinidadian">Trinidadian</option>
          <option value="Tunisian">Tunisian</option>
          <option value="Turkish">Turkish</option>
          <option value="Turkmen">Turkmen</option>
          <option value="Ugandan">Ugandan</option>
          <option value="Ukrainian">Ukrainian</option>
          <option value="Uruguayan">Uruguayan</option>
          <option value="Uzbek">Uzbek</option>
          <option value="Venezuelan">Venezuelan</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Welsh">Welsh</option>
          <option value="Yemeni">Yemeni</option>
          <option value="Zambian">Zambian</option>
          <option value="Zimbabwean">Zimbabwean</option>
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
        <Form.Label>{t("labels.email")}</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder={t("placeholders.email")}
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          isInvalid={emailInvalid}
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidEmail")}
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
          value={data.facebook}
          onChange={handleChange}
          placeholder={t("placeholders.facebook")}
          minLength={5}
          isInvalid={facebookInvalid}
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

export default RegisterJobSeekerStep1;
