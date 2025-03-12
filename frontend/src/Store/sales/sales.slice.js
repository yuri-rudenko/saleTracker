import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { approveSale, createSale, deleteSale, editSale, getAllSales } from '../../http/saleAPI';
import { updateProductStock } from '../product/product.slice';
import getSaleDashboardValues from '../../functions/graphs/getSaleDashboardValues';

export const fetchSalesAsync = createAsyncThunk(
    'sales/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllSales();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
);

export const createSaleAsync = createAsyncThunk(
    'sales/add',
    async (sale, { rejectWithValue, dispatch }) => {
        try {
            const response = await createSale(sale);
            if (response.data.products) {
                dispatch(updateProductStock(response.data.products));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const approveSaleAsync = createAsyncThunk(
    'sales/approveSale',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await approveSale(_id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const editSaleAsync = createAsyncThunk(
    'sales/editSale',
    async (data, { rejectWithValue }) => {
        try {
            const response = await editSale({ _id: data._id, ...data.fieldsToUpdate });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteSaleAsync = createAsyncThunk(
    'sales/deleteSale',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await deleteSale(_id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const salesSlice = createSlice({
    name: 'sales',
    initialState: { list: [], loading: false, error: null, totalRevenue: 0, daysPerOrder: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchSalesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                const { revenue, daysPerOrder } = getSaleDashboardValues(action.payload);
                state.totalRevenue = revenue;
                state.daysPerOrder = daysPerOrder;
            })
            .addCase(fetchSalesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSaleAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(approveSaleAsync.fulfilled, (state, action) => {

                const newSale = action.payload;

                const index = state.list.findIndex(p => p._id === newSale._id);
                if (index !== -1) {

                    state.list[index] = newSale;

                }
            })
            .addCase(approveSaleAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editSaleAsync.fulfilled, (state, action) => {

                const newSale = action.payload;

                const index = state.list.findIndex(p => p._id === newSale._id);
                if (index !== -1) {

                    state.list[index] = newSale;

                }
            })
            .addCase(editSaleAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteSaleAsync.fulfilled, (state, action) => {
                state.list = state.list.filter(sale => sale._id !== action.payload._id);
            })
    },
});

export default salesSlice.reducer;
