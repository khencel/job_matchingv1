import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PostBasicInfoState,
  UpdateJobPostPayload,
} from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import postAPI from "@/redux/features/api/api_request";
import {
  standard_get_api,
  standard_delete_api,
  standard_update_api,
} from "@/redux/features/api/api_request";

interface ListJobPostParams {
  userId: number;
  page?: number;
  pageSize?: number;
}

export const createJobPost = createAsyncThunk(
  "jobPost/createJobPost",
  async (jobData: PostBasicInfoState, { rejectWithValue }) => {
    try {
      const response = await postAPI(jobData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const listJobPost = createAsyncThunk(
  "jobPost/listJobPost",
  async (
    { userId, page = 1, pageSize = 10 }: ListJobPostParams,
    { rejectWithValue },
  ) => {
    try {
      const response = await standard_get_api(
        `/api/job/list/${userId}?page=${page}&page_size=${pageSize}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteJobPost = createAsyncThunk(
  "jobPost/deleteJobPost",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await standard_delete_api(`/api/job/delete/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to delete job post");
    }
  },
);

export const updateJobPost = createAsyncThunk(
  "jobPost/updateJobPost",
  async (jobData: UpdateJobPostPayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...jobData,
        type_of_emp: JSON.stringify(jobData.type_of_emp),
        category: JSON.stringify(jobData.category || []),
        skill: JSON.stringify(jobData.skill || []),
      };
      const response = await standard_update_api(
        `/api/job/update/${jobData.id}`,
        payload,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
