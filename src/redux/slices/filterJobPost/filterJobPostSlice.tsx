import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterJobPostV1 } from "@/redux/slices/filterJobPost/filterJobPostThunk";




export interface JobSearchFilterState {
    category: string;
    type_of_emp: string[];
    salary_start?: number;
    salary_end?: number;
    region: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    items: any[];
}

const initialState: JobSearchFilterState = {
    category: "",
    type_of_emp: [],
    salary_start: undefined,
    salary_end: undefined,
    region: "",
    status: "idle",
    error: null,
    items: [],
}


const jobSearchFilterSlice = createSlice({
    name: "jobSearchFilter",
    initialState,
    reducers: {
        setFilterField: (state, action: PayloadAction<Partial<JobSearchFilterState>>) => {
            return { ...state, ...action.payload };
        },
        setFieldClear: (state) => {
            const { items, status, error } = state;

            return {
                ...initialState,
                items,
                status,
                error,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterJobPostV1.pending, (state) => {
                state.status = "loading";
            })
            .addCase(filterJobPostV1.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(filterJobPostV1.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string || "Something went wrong";
            })
            
    }
})

export const { setFilterField, setFieldClear } = jobSearchFilterSlice.actions;
export default jobSearchFilterSlice.reducer;