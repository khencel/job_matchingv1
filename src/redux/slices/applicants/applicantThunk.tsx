import { standard_get_api } from "@/redux/features/api/api_request";
import { createAsyncThunk } from "@reduxjs/toolkit"; 


interface ListApplicantsParams {
  page?: number;
  pageSize?: number;
}

export const fetchApplicants = createAsyncThunk(
    "applicants/fetchApplicants",
    async ({page = 1, pageSize = 10}: ListApplicantsParams, { rejectWithValue }) => {
        try {
            const response = await standard_get_api(`/api/apply/?page=${page}&page_size=${pageSize}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)