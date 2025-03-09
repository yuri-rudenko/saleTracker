import { configureStore } from '@reduxjs/toolkit';
import saleReducer from './sales/sales.slice';
import typeRedcuer from './typeBrand/type.slice';
import brandReducer from './typeBrand/brand.slice';
import productReducer from './product/product.slice';
import buysReducer from './buys/buys.slice';
import globalReducer from './global/global.slice';

const store = configureStore({
  reducer: {
    sales: saleReducer,
    types: typeRedcuer,
    brands: brandReducer,
    products: productReducer,
    buys: buysReducer,
    global: globalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;