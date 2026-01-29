import { standard_get_api, standard_post_api } from "@/redux/features/api/api_request";
import { createAsyncThunk } from "@reduxjs/toolkit"; 


interface ListApplicantsParams {
  page?: number;
  pageSize?: number;
  gender?: string;
  company?: string;
  visa?:string;
  firstName?: string;
  lastName?: string
}


const buildQueryParams = (params: Record<string, any>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return query.toString();
};


export const fetchApplicants = createAsyncThunk(
  "applicants/fetchApplicants",
  async (
    {
      page = 1,
      pageSize = 10,
      gender,
      company,
      visa,
      firstName,
      lastName
    }: ListApplicantsParams,
    { rejectWithValue }
  ) => {
    try {
      const query = buildQueryParams({
        page,
        page_size: pageSize,
        gender,
        company,
        visa,
        firstName,
        lastName
      });

      const response = await standard_get_api(`/api/apply/?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchApplicantsNoPagination = createAsyncThunk(
  "applicants/fetchApplicantsNoPagination",
  async (
    {
      gender,
      company,
      visa,
      firstName,
      lastName
    }: ListApplicantsParams,
    { rejectWithValue }
  ) => {
    try {
      const query = buildQueryParams({
        gender,
        company,
        visa,
        firstName,
        lastName
      });

      const response = await standard_get_api(`/api/apply/?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateStatus = createAsyncThunk(
    "applicants/updateStatus",
    async (payload: any , { rejectWithValue }) => {
        try {
            const response = await standard_post_api(`/api/apply/status`,payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const fetchAllCompany = createAsyncThunk(
  "applicants/fetchAllCompany",
  async(_, {rejectWithValue}) => {
    try{
      const response = await standard_get_api('/api/auth/company');
      return response.data
    } catch (error){
      return rejectWithValue(error)
    }
  }
)