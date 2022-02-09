import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		filtered_products: [],
		all_products: [],
		get_products_loading: false,
		get_products_error: false,
		grid_view: false,
		sort: 'price-lowest',
		filters: {
			text: '',
			company: 'all',
			category: 'all',
			color: 'all',
			min_price: 0,
			max_price: 0,
			price: 0,
			shipping: false,
		},
	},
	reducers: {
		loadProducts: (state, action) => {
			state.all_products = action.payload
			state.filtered_products = [...state.all_products]
			// console.log(state.all_products)

			// for max price
			let maxPrice = action.payload.map((p) => p.price)
			maxPrice = Math.max(...maxPrice)
			// console.log(maxPrice)
			// Setting maxPrice
			// first way
			// state.filters.max_price = maxPrice
			// second way
			state.filters = { ...state.filters, max_price: maxPrice, price: maxPrice }
		},
		setLoading: (state, {payload}) => {
			state.get_products_loading = payload
		},
		set_error: (state) => {
			state.get_products_error = true
		},
		view_toggler: (state, {payload}) => {
			state.grid_view = payload
		},

		// Sort functionality
		updateSort: (state,  {payload}) => {
			state.sort = payload
		},
		sortProducts: (state) => {
            let tempProducts = [...state.filtered_products];
            const sortBy = state.sort;
            if (sortBy === "price_lowest") {
              tempProducts = tempProducts.sort(
                (a, b) => Number(a.price) - Number(b.price)
              );
            } else if (sortBy === "price_highest") {
              tempProducts = tempProducts.sort(
                (a, b) => Number(b.price) - Number(a.price)
              );
            } else if (sortBy === "name_a") {
              tempProducts = tempProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
            } else if (sortBy === "name_z") {
              tempProducts = tempProducts
                .sort((a, b) => a.name.localeCompare(b.name))
                .reverse();
            }
            // console.log(tempProducts);
            
            state.filtered_products = tempProducts;
			
		},

		// Filter functionality

		update_filters: (state, {payload}) => {
			const e = payload;
			let name = e.target.name;
			let value = e.target.value;

			if (name === "text") {
				value = e.target.value.toLowerCase();
			  }
			  if (name === "category") {
				value = e.target.innerText.toLowerCase();
			  }
			  if (name === "company") {
				value = e.target.value.toLowerCase();
			  }
			  if (name === "price") {
				value = Number(value);
			  }
			  if (name === "shipping") {
				value = e.target.checked;
			  }
			  if (name === "color") {
				value = e.target.getAttribute('data-color');
			  }
			  state.filters[name] = value;
			// console.log(state.filters)
		},
		applyFilters: (state) => {
			const { all_products } = state;
			const { text, company, category, color, price, shipping } = state.filters
			let tempProducts = [...all_products];

			
			if (text.length) {
				tempProducts = tempProducts.filter((product) =>
				  product.name.includes(text)
				);
			  }

			// category
			if (category !== "all") {
				tempProducts = tempProducts.filter((pdt) => pdt.category === category);
			  }
		   
			// company
			if (company !== "all") {
				tempProducts = tempProducts.filter((pdt) => pdt.company === company);
			  }
		

			// colors
			if (color !== 'all') {
				tempProducts = tempProducts.filter(pdt => pdt.colors.find(c => c === color));
      }
            
			// price
			tempProducts = tempProducts.filter((product) => product.price <= price);
    
			// shipping
			if (shipping) {
				tempProducts = tempProducts.filter(
				  (pdt) => pdt.hasOwnProperty("shipping") && pdt.shipping
				);
			  }
			// final step

			state.filtered_products = tempProducts
		},
		clearFilters: (state) => {
			state.filters = {
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.max_price,
				shipping: false,
			}
		},
	},
})

export const {
	loadProducts,
	setLoading,
	set_error,
	view_toggler,
	updateSort,
	sortProducts,
	update_filters,
	clearFilters,
	applyFilters,
} = filterSlice.actions
export default filterSlice.reducer