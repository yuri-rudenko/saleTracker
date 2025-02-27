import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSale, getAllSales } from '../../http/saleAPI';

export const fetchSalesAsync = createAsyncThunk(
    'sales/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllSales();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createSaleAsync = createAsyncThunk(
    'sales/add',
    async (sale, { rejectWithValue }) => {
        try {
            const response = await createSale(sale);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const salesSlice = createSlice({
    name: 'sales',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchSalesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchSalesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSaleAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            // .addCase(createSaleAsync.fulfilled, (state, action) => {
            //     state.list = state.list.filter(item => item.id !== action.payload);
            // });
    },
});

export default salesSlice.reducer;
