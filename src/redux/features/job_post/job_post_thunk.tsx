import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PostBasicInfoState } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import postAPI from "@/redux/features/api/api_request";
import { fetchAPI, standard_get_api, standard_delete_api } from "@/redux/features/api/api_request";



interface ListJobPostParams {
  userId: number;
  page?: number;
  pageSize?: number;
}


export const createJobPost = createAsyncThunk(
    "jobPost/createJobPost",
    async (jobData: PostBasicInfoState, {rejectWithValue}) => {
        try {
            const response = await postAPI(jobData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const listJobPost = createAsyncThunk(
  "jobPost/listJobPost",
  async ({ userId, page = 1, pageSize = 10 }: ListJobPostParams, { rejectWithValue }) => {
    try {
      const response = await standard_get_api(
        `/api/job/list/${userId}?page=${page}&page_size=${pageSize}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteJobPost = createAsyncThunk(
    "jobPost/deleteJobPost",
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await standard_delete_api(`/api/job/delete/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue("Failed to delete job post");
        }
    }
)