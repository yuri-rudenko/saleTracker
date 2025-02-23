import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBrand, getAllBrands } from '../../http/brandAPI';

export const fetchBrandsAsync = createAsyncThunk(
    'brands/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllBrands();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createBrandAsync = createAsyncThunk(
    'brands/add',
    async (brand, { rejectWithValue }) => {
        try {
            const response = await createBrand(brand);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const brandsSlice = createSlice({
    name: 'brands',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandsAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchBrandsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBrandAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
    },
});

export default brandsSlice.reducer;
