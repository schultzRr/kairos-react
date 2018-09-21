import axios from 'axios';
import session from '../../http/session';
import { arrayToHash } from '../../common/commonFunctions';

export const GET_ADDRESSES_FETCH = 'GET_ADDRESSES_FETCH';
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS';
export const GET_ADDRESSES_ERROR = 'GET_ADDRESSES_ERROR';
export const ADD_ADDRESS_FETCH = 'ADD_ADDRESS_FETCH';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_ERROR = 'ADD_ADDRESS_ERROR'; 
export const UPDATE_ADDRESS_FETCH = 'UPDATE_ADDRESS_FETCH';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_ERROR = 'UPDATE_ADDRESS_ERROR';
export const DELETE_ADDRESS_FETCH = 'DELETE_ADDRESS_FETCH';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_ERROR = 'DELETE_ADDRESS_ERROR';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

function toJSObject(address) {
  return {
    id: address.id,
    address: address.address,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
  }
}

function toJSArray(addresses) {
  const result = [];
  addresses.map(address => {
    result.push(toJSObject(address));
  })
  return result;
}

export function getAddresses() {
  return (dispatch) => {
    dispatch({ 
      type: GET_ADDRESSES_FETCH,
    });
    return axios.get('/shipping_addresses/get_all_for_user')
    .then(response => {
      dispatch({ 
        type: GET_ADDRESSES_SUCCESS,
        payload: arrayToHash(toJSArray(response.data.shipping_addresses))
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_ADDRESSES_ERROR, 
        payload: "Ocurrió un error al obtener las direcciones. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

export function addAddress(values) {
  return (dispatch) => {
    dispatch({ 
      type: ADD_ADDRESS_FETCH,
    });
    return session.getIpInfo()
    .then(location => {

      axios.post('/shipping_addresses', { 
        shipping_address: {
          address: values.get('address'),
          zip: values.get('zip'),
          city: values.get('city'),
          state: values.get('state'),
          country: values.get('country'),
          location: location
        } 
      })
      .then(response => {
        dispatch({ 
          type: ADD_ADDRESS_SUCCESS,
          payload: response.data.shipping_address,
        });
      })
      .catch(e => {
        dispatch({ 
          type: ADD_ADDRESS_ERROR, 
          payload: "Ocurrió un error al guardar tu dirección. Por favor intenta más tarde."
        });
        throw e;
      })
    });
  }
}

export function updateAddress(values) {
  return (dispatch) => {
    dispatch({ 
      type: UPDATE_ADDRESS_FETCH,
    });
    return axios.put(`/shipping_addresses/${values.get('id')}`, { 
      shipping_address: {
        address: values.get('address'),
        zip: values.get('zip'),
        city: values.get('city'),
        state: values.get('state'),
        country: values.get('country')
      } 
    })
    .then(response => {
      dispatch({ 
        type: UPDATE_ADDRESS_SUCCESS,
        payload: toJSObject(response.data.shipping_address),
      });
    })
    .catch(e => {
      dispatch({ 
        type: UPDATE_ADDRESS_ERROR, 
        payload: "Ocurrió un error al guardar tus cambios. Por favor intenta más tarde."
      });
      throw e;
    });
  }
}

export function deleteAddress(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADDRESS_FETCH,
    })
    return axios.delete(`/shipping_addresses/${id}`)
    .then(response => {
      dispatch({
        type: DELETE_ADDRESS_SUCCESS,
        payload: id,
      });
    })
    .catch(e => {
      dispatch({
        type: DELETE_ADDRESS_ERROR,
        payload: "Ocurrió un error al eliminar la dirección. Por favor intenta más tarde."
      });
      throw e;
    });
  }
}

export function openDialog(dialog, selectedAddressId) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_DIALOG, 
      payload: {
        dialog,
        selectedAddressId
      }
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_DIALOG,
    });
  }
}

const addressActions = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  openDialog,
  closeDialog,
};

export default addressActions;
