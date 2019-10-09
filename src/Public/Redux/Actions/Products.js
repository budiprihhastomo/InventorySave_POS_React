import Axios from 'axios'

export const getProducts = async () => {
    const result = await Axios.get('http://localhost:5000/api/v1/products')
    return {
        type: 'GET_PRODUCT_FULFILLED',
        payload: result.data.data.content
    }
}