import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItemsAsync = createAsyncThunk(
    'sales/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchItems();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addItemAsync = createAsyncThunk(
    'sales/add',
    async (item, { rejectWithValue }) => {
        try {
            const response = await addItemAPI(item);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeItemAsync = createAsyncThunk(
    'sales/remove',
    async (id, { rejectWithValue }) => {
        try {
            await removeItemAPI(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const itemsSlice = createSlice({
    name: 'sales',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchItemsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchItemsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(removeItemAsync.fulfilled, (state, action) => {
                state.list = state.list.filter(item => item.id !== action.payload);
            });
    },
});

export default itemsSlice.reducer;
