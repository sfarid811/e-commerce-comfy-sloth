import {
	fetchProducts,
	getProductsBegin,
	getProductsError,
    getSingleProductBegin,
    getSingleProductError,
    fetchSingleProduct
} from './slices/productsSlice';
import {setLoading, loadProducts, set_error} from './slices/filterSlice';
import axios from 'axios'


export const productsFetcher = url => async dispatch => {
    try {
        dispatch(getProductsBegin(true))
        const { data } = await axios.get(url)
        //console.log(data)
    
        dispatch(fetchProducts(data.sort((a, b) => a.price - b.price)))
    } catch (error) {
        dispatch(getProductsError())
        //console.log(error)
    } finally {
        dispatch(getProductsBegin(false))
    }
}

export const fetchSingleProductItem = (url) => async dispatch => {
    try {
        dispatch(getSingleProductBegin(true))
        const { data } = await axios.get(`${url}`)

        dispatch(fetchSingleProduct(data))
    } catch (error) {
        dispatch(getSingleProductError())
    } finally {
        dispatch(getSingleProductBegin(false))
    }
}

//Fetch Products for filtration 

export const fetchFilterProducts = url => async dispatch =>{
    try {
        dispatch(setLoading(true))
        const { data } = await axios.get(url);
        dispatch(loadProducts(data.sort((a, b) => a.price - b.price)));
    } catch (error) {
        //console.log(error)
        dispatch(set_error())
    } finally {
        dispatch(setLoading(false))
    }
}