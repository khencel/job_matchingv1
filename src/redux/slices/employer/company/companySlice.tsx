import { createSlice} from "@reduxjs/toolkit";
import { indexCompany, getCompanyDetails} from "./companyThunk";

export interface CompanyState {
    // list Data 
    companies?: any[] | null;
    error?: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";

    // selected Data 
    selectedCompany?: any | null;
    selectedCompanyError?: string | null;
    selectedCompanyStatus: "idle" | "loading" | "succeeded" | "failed";

    // pagination 
    next: string | null;
    previous: string | null;
    currentPage: number;
    pageSize: number;
    count: number;
}

const initialState: CompanyState = {
    companies: null,
    error: null,
    status: "idle",

    selectedCompany: null,
    selectedCompanyError: null,
    selectedCompanyStatus: "idle",

    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 10,
    count: 0,
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
        clearSelectedCompany: (state) => {
            state.selectedCompany = null;
            state.selectedCompanyError = null;
            state.selectedCompanyStatus = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(indexCompany.fulfilled, (state, action) => {
                state.companies = action.payload.results;
                state.status = "succeeded";
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                state.count = action.payload.count;
            })
            .addCase(indexCompany.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = "failed";
            })
            .addCase(indexCompany.pending, (state) => {
                state.status = "loading";
            })
        
        builder
            .addCase(getCompanyDetails.fulfilled, (state, action) => {
                state.selectedCompany = action.payload;
                state.selectedCompanyStatus = "succeeded";
            })
            .addCase(getCompanyDetails.rejected, (state, action) => {
                state.selectedCompanyError = action.payload as string;
                state.selectedCompanyStatus = "failed";
            })
            .addCase(getCompanyDetails.pending, (state) => {
                state.selectedCompanyStatus = "loading";
            })
    }
});

export const { setPage, setPageSize, clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;

