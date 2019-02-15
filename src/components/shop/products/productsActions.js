import axios from 'axios';
import productsMock from './productsMock';

export const GET_PRODUCTS_FETCH = 'GET_PRODUCTS_FETCH';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export function getProducts() {
  return (dispatch) => {
    dispatch({ 
      type: GET_PRODUCTS_FETCH,
    });
    return axios.get('/products')
    .then(response => {
      dispatch({ 
        type: GET_PRODUCTS_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_PRODUCTS_ERROR, 
        payload: "Ocurrió un error al obtener los productos. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

export function getProductsMock() {
  return (dispatch) => {
    dispatch({ 
      type: GET_PRODUCTS_SUCCESS,
      payload: productsMock
    });
  }
}

const productsActions = {
  getProducts,
  getProductsMock,
};

export default productsActions;
