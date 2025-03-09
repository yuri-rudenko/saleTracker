import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getCourse = async () => {
    try {
        const response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
};

export const getCourseAsync = createAsyncThunk(
    'global/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCourse();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
);

const globalSlice = createSlice({
    name: 'global',
    initialState: { course: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseAsync.pending, (state) => { state.loading = true; })
            .addCase(getCourseAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload.find(el => el.cc === "USD").rate;
            })
    },
});

export default globalSlice.reducer;