import { createSlice } from '@reduxjs/toolkit'
const productsSlice = createSlice({
	name: 'products',
	initialState: {
		isSidebarOpen: false,
		products: [],
		featured_products: [],
		products_loading: false,
		products_error: false,
		single_product_loading: false,
		single_product_error: false,
		single_product: {},
	},
	reducers: {
		openSidebar: (state) => {
			state.isSidebarOpen = true
		},
		closeSidebar: (state) => {
			state.isSidebarOpen = false
		},
		getProductsBegin: (state, action) => {
			state.products_loading = action.payload
		},
		fetchProducts: (state, action) => {
			state.products = action.payload
			state.featured_products = action.payload.filter(
				(p) => p.featured === true
			)
		},
		getProductsError: (state) => {
			state.products_error = true
		},

		getSingleProductBegin: (state, action) => {
			state.single_product_loading = action.payload
		},
		getSingleProductError: (state) => {
			state.single_product_error = true
		},
		fetchSingleProduct: (state, action) => {
			state.single_product = action.payload
		},
	},
})

export const {
	openSidebar,
	closeSidebar,
	fetchProducts,
	getProductsBegin,
	getProductsError,
	fetchSingleProduct,
	getSingleProductBegin,
	getSingleProductError,
} = productsSlice.actions
export default productsSlice.reducer