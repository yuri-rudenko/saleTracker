import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProduct, getAllProducts, editProduct, editViews, deleteProduct } from '../../http/productAPI';

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllProducts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
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
            return rejectWithValue(error.response?.data || error.message)
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
            return rejectWithValue(error.response?.data || error.message)
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
            return rejectWithValue(error.response?.data || error.message)
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

            return rejectWithValue(error.response?.data || error.message)
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: { list: [], loading: false, error: null, updatingIds: [], chosenBuyItems: [], chosenSellItems: [] },
    reducers: {
        addChosenBuyItem: (state, action) => {
            const item = action.payload;
            if (!state.chosenBuyItems.some(chosen => chosen._id === item._id)) {
                state.chosenBuyItems.push(item);
            }
        },
        removeChosenBuyItem: (state, action) => {
            const deletingItem = action.payload;
            state.chosenBuyItems = state.chosenBuyItems.filter(item => item._id !== deletingItem._id);
        },
        resetChosenBuyItems: (state) => {
            state.chosenBuyItems = [];
        },
        addChosenSellItem: (state, action) => {
            const item = action.payload;
            if (!state.chosenSellItems.some(chosen => chosen._id === item._id)) {
                state.chosenSellItems.push(item);
            }
        },
        removeChosenSellItem: (state, action) => {
            const deletingItem = action.payload;
            state.chosenSellItems = state.chosenSellItems.filter(item => item._id !== deletingItem._id);
        },
        resetChosenSellItems: (state) => {
            state.chosenSellItems = [];
        },
        updateProductStock: (state, action) => {
            action.payload.forEach(updatedProduct => {
                const index = state.list.findIndex(p => p._id === updatedProduct.product._id);
                if (index !== -1) {

                    state.list[index] = updatedProduct.product;

                }
            });
        }
    },
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

                

            })
            .addCase(editProductViewsAsync.fulfilled, (state, action) => {
                const updatedProducts = action.payload;
                updatedProducts.forEach(updatedProduct => {

                    const index = state.list.findIndex(product => product._id === updatedProduct._id);
                    if (index !== -1) {

                        state.list[index].views = updatedProduct.views;
                    }
                });
                state.loading = false;
            })
            .addCase(editProductViewsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    addChosenBuyItem,
    removeChosenBuyItem,
    resetChosenBuyItems,
    addChosenSellItem,
    removeChosenSellItem,
    resetChosenSellItems,
    updateProductStock,
} = productsSlice.actions;

export default productsSlice.reducer;
