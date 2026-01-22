import apiClient from "@/lib/axios";
import {
  AppliedJobParams,
  ApplyToJobRequest,
  ApplyToJobResponse,
  GetAppliedJobResponse,
  JobPosting,
} from "@/types/applyJob";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "next/navigation";

export const getJobPostings = createAsyncThunk<JobPosting[]>(
  "applyJob/getJobPostings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/job/list");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const applyToJob = createAsyncThunk<
  ApplyToJobResponse,
  ApplyToJobRequest
>("applyJob/applyToJob", async ({ user, job_post }, { rejectWithValue }) => {
  try {
    const res = await apiClient.post(`/apply/`, { user, job_post });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAppliedJobs = createAsyncThunk<
  GetAppliedJobResponse,
  AppliedJobParams
>("applyJob/getAppliedJobs", async (arg, { rejectWithValue }) => {
  try {
    const query: Record<string, number> = {};
    if (arg?.page !== undefined) {
      query.page = arg.page;
    }
    if (arg?.page_size !== undefined) {
      query.page_size = arg.page_size;
    }

    const res = await apiClient.get(`/apply/user/`, {
      params: query,
    });
    console.log("Fetched Applied:", res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
