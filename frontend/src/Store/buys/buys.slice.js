import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBuy, getAllBuys } from '../../http/buyAPI.js';
import { updateProductStock } from '../product/product.slice';


export const fetchBuysAsync = createAsyncThunk(
    'buys/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllBuys();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
);

export const createBuyAsync = createAsyncThunk(
    'buys/add',
    async (buy, { rejectWithValue, dispatch, getState }) => {
        try {
            const state = getState();
            const course = state.global.course;
            const response = await createBuy(buy, course);
            if (response.data.products) {
                dispatch(updateProductStock(response.data.products));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
);

const buysSlice = createSlice({
    name: 'buys',
    initialState: { list: [], loading: false, error: null, totalSpend: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBuysAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchBuysAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchBuysAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBuyAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            // .addCase(createBuyAsync.fulfilled, (state, action) => {
            //     state.list = state.list.filter(item => item.id !== action.payload);
            // });
    },
});

export default buysSlice.reducer;
