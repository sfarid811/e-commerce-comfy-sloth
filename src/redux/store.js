import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productsSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
export const store = configureStore({
	reducer: {
		products: productReducer,
		filter: filterReducer,
		cart: cartReducer,
	},
})