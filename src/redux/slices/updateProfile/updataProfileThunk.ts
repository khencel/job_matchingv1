import apiClient from "@/lib/axios";
import { RegisterJobSeekerData } from "@/types/job-seeker";
import { RegisterSuperVisoryData } from "@/types/super-visory";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface updateProfileArgs {
  details?: RegisterJobSeekerData | RegisterSuperVisoryData;
  avatar?: File | null;
  banner?: File | null;
  resume?: File | null;
}

export const updateProfileThunk = createAsyncThunk(
  "profile/updateProfile",
  async (
    { details, avatar, banner, resume }: updateProfileArgs,
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();

      formData.append("details", JSON.stringify(details));
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }
      if (banner instanceof File) {
        formData.append("banner", banner);
      }
      if (resume instanceof File) {
        formData.append("resume", resume);
      }

      const res = await apiClient.put("auth/update/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("error update profile thunk", error);
      // Handle Axios errors
      if (error instanceof AxiosError) {
        // Server responded with error status
        if (error.response) {
          const message = error.response.data.detail || "Profile update failed";
          return rejectWithValue(message);
        }
        // Network error (no response)
        if (error.request) {
          return rejectWithValue(
            "Network error. Please check your connection.",
          );
        }
      }
      // Generic error fallback
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  },
);
