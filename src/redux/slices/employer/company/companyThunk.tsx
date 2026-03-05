import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { standard_delete_api, standard_get_api, standard_post_api, standard_update_api } from "@/redux/features/api/api_request";

interface ListCompanyParams {
  page?: number;
  pageSize?: number;
}

export const indexCompany = createAsyncThunk(
    "company/indexCompany",
    async ({page = 1, pageSize = 10}: ListCompanyParams , {rejectWithValue}) => {
        try {
           const res = await standard_get_api("/api/company/?page="+page+"&page_size="+pageSize);
           return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createCompany = createAsyncThunk(
    "company/createCompany",
    async (data: any, {rejectWithValue}) => {
        try {
           const res = await standard_post_api("/api/company/", data);
           return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCompany = createAsyncThunk(
    "company/deleteCompany",
    async (companyID:number, {rejectWithValue}) => {
        try{
            const res = await standard_delete_api("/api/company/"+companyID+"/");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getCompanyDetails = createAsyncThunk(
    "company/getCompanyDetails",
    async (companyID:number, {rejectWithValue}) => {
        try{
            const res = await standard_get_api("/api/company/"+companyID+"/");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateCompany = createAsyncThunk(
    "company/updateCompany",
    async ({companyID, data}: {companyID: number, data: any}, {rejectWithValue}) => {   
        try{
            const res = await standard_update_api("/api/company/"+companyID+"/", data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
