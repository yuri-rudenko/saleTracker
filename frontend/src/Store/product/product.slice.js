import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProduct, getAllProducts, editProduct, editViews, deleteProduct } from '../../http/ProductAPI';

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllProducts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createProductAsync = createAsyncThunk(
    'products/add',
    async (product, { rejectWithValue }) => {
        try {
            const response = await createProduct(product);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editProductAsync = createAsyncThunk(
    'products/edit',
    async (_id, fieldsToUpdate, { rejectWithValue }) => {
        try {
            const response = await editProduct(_id, fieldsToUpdate);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProductAsync = createAsyncThunk(
    'products/delete',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await deleteProduct(_id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editProductViewsAsync = createAsyncThunk(
    'products/editViews',
    async (newValues, { rejectWithValue }) => {
        try {
            const response = await editViews(newValues);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: { list: [], loading: false, error: null, updatingIds: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.list = state.list.filter(item => item.id !== action.payload);
            })

            .addCase(editProductAsync.pending, (state, action) => {
                const id = action.meta.arg._id;
                if (!state.updatingIds.includes(id)) {
                    state.updatingIds.push(id)
                }
            })
            .addCase(editProductAsync.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                state.updatingIds = state.updatingIds.filter(id => id !== updatedProduct._id);
                const index = state.list.findIndex(item => item._id === updatedProduct._id);
                if (index !== -1) {
                    state.list[index] = updatedProduct;
                }
            })
            .addCase(editProductAsync.rejected, (state, action) => {
                const id = action.meta.arg._id;
                state.updatingIds = state.updatingIds.filter(item => item !== id);
                state.error = action.payload || "Failed to edit product";
            })

            .addCase(editProductViewsAsync.pending, (state, action) => {
                const ids = new Set(action.meta.arg.newValues.map(product => product._id));
                state.updatingIds = Array.from(new Set([...state.updatingIds, ...ids]));
            })
            .addCase(editProductViewsAsync.fulfilled, (state, action) => {
                const updatedProducts = action.payload;
                updatedProducts.forEach(updatedProduct => {

                    const index = state.list.findIndex(product => product._id === updatedProduct._id);
                    if (index !== -1) {

                        state.list[index].views = updatedProduct.views;
                    }
                });
            })
            .addCase(editProductViewsAsync.rejected, (state, action) => {
                const ids = new Set(action.meta.arg.newValues.map(product => product._id));
                state.updatingIds = state.updatingIds.filter(id => !ids.has(id));
                state.error = action.payload || "Failed to edit views";
            });
    },
});

export default productsSlice.reducer;
