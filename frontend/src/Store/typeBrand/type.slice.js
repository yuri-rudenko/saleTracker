import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createType, getAllTypes } from '../../http/typeAPI';

export const fetchTypesAsync = createAsyncThunk(
    'types/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllTypes();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createTypeAsync = createAsyncThunk(
    'types/add',
    async (type, { rejectWithValue }) => {
        try {
            const response = await createType(type);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const typesSlice = createSlice({
    name: 'types',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypesAsync.pending, (state) => { state.loading = true; })
            .addCase(fetchTypesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTypesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTypeAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
    },
});

export default typesSlice.reducer;
