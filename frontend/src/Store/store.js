import { configureStore } from '@reduxjs/toolkit';
import saleReducer from './sales/sales.slice';

const store = configureStore({
  reducer: {
    sales: saleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;