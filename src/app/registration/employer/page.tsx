"use client"

import "../../../../public/css/employer/registration.css"
import { useAppDispatch } from "@/redux/hooks"
import { useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { updateField, validateForm, clearForm, clearErrors } from "@/redux/slices/employer/registration/employerRegistrationSlice"
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer"
import { createJobApproach } from "@/redux/slices/employer/registration/employerRegistrationThunk"
import { useStore } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";


export default function RegistrationEmployer(){
    const store = useStore();
    const dispatch = useAppDispatch();
    const { form, errors } = useSelector((state: RootState) => state.employerRegistration);
    const [isLoading, setIsLoading] = useState(false);

    
    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        dispatch(
            updateField({
            name: name as any,
            value: type === "checkbox" ? value : value,
            type,
            checked: type === "checkbox" ? checked : undefined,
            })
        );
    };


    const handleSubmit = async () => {
        dispatch(validateForm());
        const currentErrors = (store.getState() as RootState).employerRegistration.errors;
        if (Object.keys(currentErrors).length !== 0) {
            console.log("Validation failed", currentErrors);
            return; 
        }

        try {
            setIsLoading(true); // START loading

            const pdfBlob = await generatePDFBlob();
            if (!pdfBlob) {
                console.error("PDF generation failed");
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append("pdf_file", pdfBlob, `company-registration-${Date.now()}.pdf`);
            await dispatch(createJobApproach(formDataToSend)); 

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); 
        }
    };



    const generatePDFBlob = async (): Promise<Blob | null> => {
        const element = document.getElementById("convertPDF");
        if (!element) return null;


        const buttons = document.getElementById("pdfButtons");
        if (buttons) buttons.style.display = "none";

        const canvas = await html2canvas(element, { scale: 1.5 }); 
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        if (buttons) buttons.style.display = "block";

        return pdf.output("blob"); 
    };


    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            console.log("READY TO SUBMIT", form);
            
        }
    }, [errors]);

    return (
        <>
            <Navbar />
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner-custom">Processing... Please wait</div>
                </div>
            )}
            <div id="convertPDF" className=" p-5" style={{
                                            marginTop:"6%",
                                           
                                            background:"linear-gradient(180deg, rgba(47,120,255,.06), #fff)"
                                        }}>
                <div className="container p-5 bg-white rounded-5 shadow">
                    <div className="card-registration " >
                        <h1 data-i18n="title" className="h1-custom">For Companies | Direct Approach (Overseas &amp; Domestic Hiring)</h1>
                        <p className="lead" data-i18n="lead">This form is for companies considering hiring foreign talent.<br/>You can consult about both overseas new hiring and hiring candidates already in Japan.</p>

                    
                        <div className="section-title-reg" data-i18n="sec1">1) Company information</div>
                        <div className="grid-reg">
                            <div className="field-reg">
                                <label data-i18n="company_name_label">Company name (Required) <span className="text-danger">*</span></label>
                                <input 
                                    name="company_name" 
                                    data-ph="company_name_ph" 
                                    placeholder="e.g., ABC Co., Ltd."
                                    value={form.company_name}
                                    onChange={handleChange} 
                                />
                                {errors.company_name && (<small className="text-danger">{errors.company_name}</small>)}
                            </div>

                            <div className="field-reg">
                                <label data-i18n="company_pref_label">Prefecture (Required) <span className="text-danger">*</span></label>
                                <select 
                                    name="company_pref"
                                    value={form.company_pref}
                                    onChange={handleChange}
                                >
                                <option value="" data-i18n="select_ph">Please select</option>
                                <option>北海道</option><option>青森県</option><option>岩手県</option><option>宮城県</option><option>秋田県</option><option>山形県</option><option>福島県</option>
                                <option>茨城県</option><option>栃木県</option><option>群馬県</option><option>埼玉県</option><option>千葉県</option><option>東京都</option><option>神奈川県</option>
                                <option>新潟県</option><option>富山県</option><option>石川県</option><option>福井県</option><option>山梨県</option><option>長野県</option><option>岐阜県</option><option>静岡県</option><option>愛知県</option>
                                <option>三重県</option><option>滋賀県</option><option>京都府</option><option>大阪府</option><option>兵庫県</option><option>奈良県</option><option>和歌山県</option>
                                <option>鳥取県</option><option>島根県</option><option>岡山県</option><option>広島県</option><option>山口県</option>
                                <option>徳島県</option><option>香川県</option><option>愛媛県</option><option>高知県</option>
                                <option>福岡県</option><option>佐賀県</option><option>長崎県</option><option>熊本県</option><option>大分県</option><option>宮崎県</option><option>鹿児島県</option><option>沖縄県</option>
                                </select>
                                {errors.company_pref && (<small className="text-danger">{errors.company_pref}</small>)}
                            </div>

                            <div className="field-reg">
                                <label data-i18n="contact_name_label">Contact person (Required) <span className="text-danger">*</span></label>
                                <input  
                                    name="contact_name" 
                                    data-ph="contact_name_ph" 
                                    placeholder="e.g., Taro Yamada" 
                                    value={form.contact_name}
                                    onChange={handleChange}
                                />
                                {errors.contact_name && (<small className="text-danger">{errors.contact_name}</small>)}
                            </div>

                            <div className="field-reg">
                                <label data-i18n="contact_title_label">Job title</label>
                                <input name="job_title" value={form.job_title} onChange={handleChange} data-ph="contact_title_ph" placeholder="e.g., HR Manager / Recruiter" />
                            </div>

                            <div className="field-reg">
                                <label data-i18n="phone_label">Phone (Required) <span className="text-danger">*</span></label>
                                <input 
                                    name="phone" 
                                    data-ph="phone_ph" 
                                    placeholder="e.g., +81-90-xxxx-xxxx" 
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && (<small className="text-danger">{errors.phone}</small>)}
                            </div>

                            <div className="field-reg">
                                <label data-i18n="email_label">Email (Required) <span className="text-danger">*</span></label>
                                <input  
                                    type="email" 
                                    name="email" 
                                    data-ph="email_ph" 
                                    placeholder="example@company.com" 
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (<small className="text-danger">{errors.email}</small>)}
                            </div>

                            <div className="field-reg">
                                <label data-i18n="company_url_label">Company website</label>
                                <input name="company_url" value={form.company_url} onChange={handleChange} data-ph="company_url_ph" placeholder="https://..." />
                            </div>

                            <div className="field-reg">
                                <label data-i18n="industry_label">Industry</label>
                                <input name="industry" value={form.industry} onChange={handleChange} data-ph="industry_ph" placeholder="e.g., Hospitality / Manufacturing / Care / Restaurant" />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="section-title-reg" data-i18n="sec2">2) Hiring needs (Required)</div>

                        <div className="field-reg">
                        <label data-i18n="needs_label">What you need (Required) <span className="text-danger">*</span></label>
                        <div className="pillrow">
                            <label className="pill">
                                <input 
                                    type="checkbox" 
                                    name="needs" 
                                    value="overseas_new" 
                                    checked={form.needs.includes("overseas_new")}
                                    onChange={handleChange}
                                /> 
                                <span data-i18n="needs_overseas">Overseas new hiring (Interview → guaranteed acceptance)</span>
                            </label>
                            <label className="pill">
                                <input 
                                    type="checkbox" 
                                    name="needs" 
                                    value="domestic_change" 
                                    checked={form.needs.includes('domestic_change')}
                                    onChange={handleChange}
                                /> 
                                <span data-i18n="needs_domestic">Hire candidates already in Japan (job change)</span>
                            </label>
                            <label className="pill">
                                <input 
                                    type="checkbox" 
                                    name="needs" 
                                    value="both" 
                                    checked={form.needs.includes("both")}
                                    onChange={handleChange}
                                /> 
                                <span data-i18n="needs_both">Considering both</span>
                            </label>
                            <label className="pill">
                                <input 
                                    type="checkbox" 
                                    name="needs" 
                                    value="consult" 
                                    checked={form.needs.includes("consult")}
                                    onChange={handleChange}
                                /> 
                                <span data-i18n="needs_consult">Consultation first</span>
                            </label>
                            {errors.needs && <small className="text-danger">{errors.needs}</small>}
                        </div>

                        

                        <div className="hint" data-i18n="needs_hint">*If you select overseas hiring, please also describe readiness (housing, start timing, etc.).</div>
                        </div>

                        <div className="grid-reg" style={{marginTop:"12px"}}>
                        <div className="field-reg">
                            <label data-i18n="job_type_label">Target job/role (Required) <span className="text-danger">*</span></label>
                            <input  
                                name="role" 
                                data-ph="job_type_ph"
                                placeholder="e.g., Care / Hotel front desk / Food factory line" 
                                value={form.role}
                                onChange={handleChange}
                            />
                            {errors.role && (<small className="text-danger">{errors.role}</small>)}
                        </div>

                        <div className="field-reg">
                            <label data-i18n="visa_label">Visa / program (planned)</label>
                            <select name="visa_type" value={form.visa_type} onChange={handleChange}>
                                <option value="" data-i18n="select_ph">Please select</option>
                                <option data-i18n="visa_ssw">Specified Skilled Worker (SSW)</option>
                                <option data-i18n="visa_titp">Technical Intern Training</option>
                                <option data-i18n="visa_gijinkoku">Engineer/Specialist in Humanities/Int'l Services</option>
                                <option data-i18n="visa_student">Student part-time</option>
                                <option data-i18n="visa_unknown">Not sure (consult)</option>
                            </select>
                        </div>

                        <div className="field-reg">
                            <label data-i18n="headcount_label">Headcount (Required) <span className="text-danger">*</span></label>
                            <select  
                                name="head_count" 
                                value={form.head_count}
                                onChange={handleChange}
                            >
                                <option value="" data-i18n="select_ph">Please select</option>
                                <option data-i18n="hc_1">1</option><option data-i18n="hc_2">2</option><option data-i18n="hc_3">3</option>
                                <option data-i18n="hc_4_5">4–5</option><option data-i18n="hc_6_10">6–10</option><option data-i18n="hc_10p">10+</option>
                            </select>
                            {errors.head_count && (<small className="text-danger">{errors.head_count}</small>)}
                        </div>

                        <div className="field-reg">
                            <label data-i18n="start_label">Preferred start timing</label>
                            <input name="start_timing" value={form.start_timing} onChange={handleChange} data-ph="start_ph" placeholder="e.g., Early March / April / ASAP" />
                        </div>
                        </div>

                        {/* <!-- ✅追加：希望国籍 --> */}
                        <div className="grid-reg" style={{marginTop:"12px"}}>
                        <div className="field-reg">
                            <label data-i18n="preferred_nationality_label">Preferred nationality</label>
                            <input name="preferred_nationality" value={form.preferred_nationality} onChange={handleChange} data-ph="preferred_nationality_ph" placeholder="e.g., Philippines / Vietnam / Myanmar / No preference" />
                            <div className="hint" data-i18n="preferred_nationality_hint">*Multiple allowed. If none, write “No preference”.</div>
                        </div>

                        <div className="field-reg">
                            <label data-i18n="work_city_label">Work location (city/area)</label>
                            <input name="work_city" value={form.work_city} onChange={handleChange} data-ph="work_city_ph" placeholder="e.g., Nagoya / Osaka city" />
                    </div>
                    </div>

                    <div className="grid-reg" style={{marginTop:"12px"}}>
                    <div className="field-reg">
                        <label data-i18n="employment_label">Employment type</label>
                        <select name="employment_type" value={form.employment_type} onChange={handleChange}>
                            <option value="" data-i18n="select_ph">Please select</option>
                            <option data-i18n="emp_full">Full-time</option>
                            <option data-i18n="emp_contract">Contract</option>
                            <option data-i18n="emp_dispatch">Dispatch</option>
                            <option data-i18n="emp_part">Part-time</option>
                            <option data-i18n="emp_shift">Shift</option>
                        </select>
                    </div>

                    <div className="field-reg">
                        <label data-i18n="salary_label">Salary range (monthly/hourly)</label>
                        <input name="salary" value={form.salary} onChange={handleChange} data-ph="salary_ph" placeholder="e.g., JPY 220,000+/month or JPY 1,200+/hour" />
                    </div>

                    <div className="field-reg">
                        <label data-i18n="jp_level_label">Required Japanese level</label>
                    <select name="jp_level" value={form.jp_level} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option>N5〜</option><option>N4〜</option><option>N3〜</option><option>N2〜</option><option>N1〜</option>
                        <option data-i18n="jp_any">Any</option>
                    </select>
                </div>

                <div className="field-reg">
                    <label data-i18n="experience_label">Experience requirement</label>
                    <select name="experience_need" value={form.experience_need} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option data-i18n="exp_required">Required</option>
                        <option data-i18n="exp_preferred">Preferred</option>
                        <option data-i18n="exp_ok">No experience OK</option>
                        <option data-i18n="exp_consult">Consult</option>
                    </select>
                </div>
                </div>

                <div className="divider"></div>

                <div className="section-title-reg" data-i18n="sec3">3) Readiness &amp; conditions</div>
                <div className="grid-reg">
                <div className="field-reg">
                    <label data-i18n="housing_label">Housing / dorm</label>
                    <select name="housing" value={form.housing} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option data-i18n="house_dorm">Dorm available</option>
                        <option data-i18n="house_company">Company housing</option>
                        <option data-i18n="house_allowance">Housing allowance</option>
                        <option data-i18n="house_none">None (consult)</option>
                    </select>
                </div>

                <div className="field-reg">
                    <label data-i18n="shuttle_label">Shuttle</label>
                    <select name="shuttle" value={form.shuttle} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option data-i18n="yes">Yes</option>
                        <option data-i18n="no">No</option>
                        <option data-i18n="consult">Consult</option>
                    </select>
                </div>

                <div className="field-reg">
                    <label data-i18n="interview_label">Interview method (for overseas hiring)</label>
                    <select name="interview_method" value={form.interview_method} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option data-i18n="interview_online">Online</option>
                        <option data-i18n="interview_local">On-site (via agency)</option>
                        <option data-i18n="either">Either</option>
                    </select>
                </div>

                <div className="field-reg">
                    <label data-i18n="accept_confirm_label">Acceptance confirmation (overseas hiring)</label>
                    <select name="accept_confirm" value={form.accept_confirm} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option data-i18n="accept_yes">Guaranteed (approved / slots available)</option>
                        <option data-i18n="accept_maybe">Likely (depends on conditions)</option>
                        <option data-i18n="accept_consult">Considering (consult)</option>
                    </select>
                    <div className="hint" data-i18n="accept_hint">*This relates to “Overseas new hiring (guaranteed acceptance)”.</div>
                </div>
                </div>

                <div className="field-reg" style={{marginTop:"12px"}}>
                <label data-i18n="requirements_label">Candidate profile / must-have conditions</label>
                <textarea name="requirements" value={form.requirements} onChange={handleChange} data-ph="requirements_ph" placeholder="e.g., experience, certificates, shifts, constraints, etc."></textarea>
                </div>

                <div className="divider"></div>

                <div className="section-title-reg" data-i18n="sec4">4) Contact preference &amp; notes</div>
                <div className="grid-reg">
                <div className="field-reg">
                    <label data-i18n="contact_method_label">Preferred contact method</label>
                    <select name="contact_method" value={form.contact_method} onChange={handleChange}>
                        <option value="" data-i18n="select_ph">Please select</option>
                        <option data-i18n="cm_phone">Phone</option>
                        <option data-i18n="cm_email">Email</option>
                        <option data-i18n="cm_online">Online meeting</option>
                    </select>
                </div>

                <div className="field-reg">
                    <label data-i18n="contact_time_label">Preferred contact time</label>
                    <input name="contact_time" value={form.contact_time} onChange={handleChange} data-ph="contact_time_ph" placeholder="e.g., Weekdays 10:00–17:00" />
                </div>
                </div>

                <div className="field-reg" style={{marginTop:"12px"}}>
                <label data-i18n="message_label">Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} data-ph="message_ph" placeholder="e.g., Need 3 people urgently. Dorm available. Prefer online interviews."></textarea>
                </div>

                <div className="actions text-end mt-5" id="pdfButtons">
                    <button className="btn btn-default-custom me-1" type="button" data-i18n="clear">Clear</button>
                    <button className="btn btn-primary-custom" onClick={handleSubmit} >Submit</button>
                </div>

             
            </div>
        </div>
        </div>
        <Footer />
        </>
        
        
    )
}