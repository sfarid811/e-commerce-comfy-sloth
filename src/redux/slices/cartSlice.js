import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: JSON.parse(localStorage.getItem('cart')) || [],
		total_items: 0,
		total_amount: 0,
		shipping_fee: 534,
	},
	reducers: {
		addToCart: (state, action) => {
			const { id, color, amount, product } = action.payload
			// check if item is already in the cart
			const tempItem = state.cart.find((i) => i.id === id + color)
			if (tempItem) {
				const tempCart = state.cart.map((cartItem) => {
					if (cartItem.id === id + color) {
						let newAmount = cartItem.amount + amount
						if (newAmount > cartItem.max) {
							newAmount = cartItem.max
						}
						return {
							...cartItem,
							amount: newAmount,
						}
					}
					return cartItem
				})

				state.cart = tempCart
			} else {
				const newItem = {
					id: id + color,
					name: product.name,
					color,
					amount,
					image: product.images[0].url,
					price: product.price,
					max: product.stock,
				}
				state.cart = [...state.cart, newItem]
				// console.log(state.cart)
			}
			// console.log(state.cart)
		},
		removeCartItem: (state, action) => {
			const id = action.payload
			const tempCart = state.cart.filter((item) => item.id !== id)
			state.cart = tempCart
		},
		toggleAmount: (state, action) => {
			const { id, val: value } = action.payload
			const tempCart = state.cart.map((item) => {
				if (item.id === id) {
					if (value === 'inc') {
						let newAmount = item.amount + 1
						if (newAmount > item.max) {
							newAmount = item.max
						}
						return { ...item, amount: newAmount }
					} else if (value === 'dec') {
						let newAmount = item.amount - 1
						if (newAmount < 1) {
							newAmount = 1
						}
						return { ...item, amount: newAmount }
					}
				}
				return item
			})
			state.cart = tempCart
		},
		clearCart: (state, action) => {
			state.cart = []
		},
		countCartTotals: (state, action) => {
			const { total_items, total_amount } = state.cart.reduce(
				(total, cartItem) => {
					const { amount, price } = cartItem
					total.total_items += amount
					total.total_amount += price * amount
					return total
				},
				{ total_items: 0, total_amount: 0 }
			)
			state.total_amount = total_amount
			state.total_items = total_items
		},
	},
})

export const {
	addToCart,
	removeCartItem,
	toggleAmount,
	clearCart,
	countCartTotals,
} = cartSlice.actions
export default cartSlice.reducer