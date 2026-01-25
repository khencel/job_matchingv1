import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_post_api } from "@/redux/features/api/api_request";


interface ListUsersParams {
  page?: number;
  pageSize?: number;
  filter?: {} | null
}

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async ({page = 1, pageSize = 10, filter}: ListUsersParams, { rejectWithValue }) => {
        try {
            const response = await standard_post_api(`/api/auth/users?page=${page}&page_size=${pageSize}`,filter);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)