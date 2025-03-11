import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { check, login, registration } from "../../http/userAPI";

export const checkAsync = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const token = await check();
            return token;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const token = await registration(data);
            if (token.status >= 400) {
                return rejectWithValue(token.data.message);  
            }
            return token;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const token = await login(data);
            if (token.status >= 400) {
                return rejectWithValue(token.data.message);
            }
            return token;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: { user: {}, isAuth: false, loading: false },
    reducers: {
        logOut: (state, action) => {
            state.user = {};
            state.isAuth = false;
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAsync.pending, (state) => { state.loading = true; })
            .addCase(checkAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload.username) return;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload?.user.username) return;
                state.user = action.payload.user;
                state.isAuth = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload?.user.username) return;
                state.user = action.payload.user;
                state.isAuth = true;
            })
    },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;