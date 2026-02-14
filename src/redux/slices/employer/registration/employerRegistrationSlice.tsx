import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

export interface EmployerRegistrationForm {
    company_name?: string;
    company_pref?: string;
    contact_name?: string;
    job_title?: string;
    phone?: string;
    email?: string;
    company_url?:string;
    headcount?: string;
    needs: string[];
    role?: string;
    head_count?: string;
    industry?: string;
    visa_type?: string;
    start_timing?: string;
    preferred_nationality?:string;
    work_city?:string;
    employment_type?:string;
    salary?:string;
    jp_level?:string;
    experience_need?:string;
    housing?:string;
    shuttle?:string;
    interview_method?:string;
    accept_confirm?:string;
    requirements?:string;
    contact_method?:string;
    contact_time?:string;
    message?:string;
   

}


export interface EmployerRegistrationState{
    form: EmployerRegistrationForm;
    errors: Record<string, string>
}

const initialState: EmployerRegistrationState = {
  form: {
        company_name: "",
        company_pref: "",
        contact_name: "",
        job_title: "",
        phone: "",
        email: "",
        company_url: "",
        head_count: "",
        needs: [],
        role: "",
        industry: "",
        visa_type: "",
        start_timing: "",
        preferred_nationality:"",
        work_city:"",
        employment_type:"",
        salary:"",
        jp_level:"",
        experience_need:"",
        housing:"",
        shuttle:"",
        interview_method:"",
        accept_confirm:"",
        requirements:"",
        contact_method:"",
        contact_time:"",
        message:"",
      // other optional fields...
  },
  errors: {},
};


const requiredFields: (keyof EmployerRegistrationForm)[] = [
    "company_name",
    "company_pref",
    "contact_name",
    "phone",
    "email",
    "needs",
    "role",
    "head_count"
];

const employerRegistrationSlice = createSlice({
  name: "employerRegistration",
  initialState,
  reducers: {
    updateField: (
        state,
        action: PayloadAction<{
            name: keyof EmployerRegistrationForm;
            value: string;
            type?: string;
            checked?: boolean;
        }>
        ) => {
        const { name, value, type, checked } = action.payload;

        if (type === "checkbox" && name === "needs") {
            if (checked) {
            if (!state.form.needs.includes(value)) state.form.needs.push(value);
            } else {
            state.form.needs = state.form.needs.filter((v) => v !== value);
            }

            if (state.form.needs.length > 0) delete state.errors[name];
        } else {
            (state.form[name] as string) = value;
            delete state.errors[name];
        }
    },


    validateForm: (state) => {
        const errors: Record<string, string> = {};

        requiredFields.forEach((field) => {
            const value = state.form[field];

            if (field === "needs") {
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    errors[field] = "errors.required";
                }
            } else {
                if (!value) {
                    errors[field] = "errors.required";
                }
            }
        });


        state.errors = errors;
    },

    clearForm: () => initialState,
    clearErrors: (state) => {state.errors = {}}
  },
});

export const { updateField, validateForm, clearForm, clearErrors } =
  employerRegistrationSlice.actions;

export default employerRegistrationSlice.reducer;