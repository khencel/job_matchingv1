import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_post_api } from "./api/api_request";

export const contactUsEmailSend = createAsyncThunk("jobs/contactUsEmailSend", async (payload: any) => {
    try {
        const response = await standard_post_api('/api/auth/contact-us',payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})