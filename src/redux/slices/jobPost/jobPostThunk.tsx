import { standard_get_api } from "@/redux/features/api/api_request";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface ListJobPostParams {
  page?: number;
  pageSize?: number;
  companyID?: number;
}

export const jobPostIndex = createAsyncThunk(
    "jobPost/index",
    async ({ page = 1, pageSize = 10, companyID}: ListJobPostParams, {rejectWithValue}) => {
        try {
            const res = await standard_get_api(`/api/job/jobpost-by-company/${companyID}?page=${page}&page_size=${pageSize}`);
            return res.data;
        } catch (error:any){
            return rejectWithValue(error.response.data);
        }
    }
)