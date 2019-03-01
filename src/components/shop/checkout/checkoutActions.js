import axios from 'axios';
import session from '../../../http/session';
import { arrayToHash } from '../../../common/commonFunctions';

export const GET_CHECKOUT_ADDRESSES_FETCH = 'GET_CHECKOUT_ADDRESSES_FETCH';
export const GET_CHECKOUT_ADDRESSES_SUCCESS = 'GET_CHECKOUT_ADDRESSES_SUCCESS';
export const GET_CHECKOUT_ADDRESSES_ERROR = 'GET_CHECKOUT_ADDRESSES_ERROR';
export const ADD_CHECKOUT_ADDRESS_FETCH = 'ADD_CHECKOUT_ADDRESS_FETCH';
export const ADD_CHECKOUT_ADDRESS_SUCCESS = 'ADD_CHECKOUT_ADDRESS_SUCCESS';
export const ADD_CHECKOUT_ADDRESS_ERROR = 'ADD_CHECKOUT_ADDRESS_ERROR';
export const UPDATE_SELECTED_CHECKOUT_ADDRESS = 'UPDATE_SELECTED_CHECKOUT_ADDRESS';
export const UPDATE_ACTIVE_SECTION = 'UPDATE_ACTIVE_SECTION';
export const OPEN_ADDRESS_CHECKOUT_DIALOG = 'OPEN_ADDRESS_CHECKOUT_DIALOG';
export const CLOSE_ADDRESS_CHECKOUT_DIALOG = 'CLOSE_ADDRESS_CHECKOUT_DIALOG';

function toJSObject(address) {
  return {
    id: address.id,
    address: address.address,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
    primary: true,
  }
}

function toJSArray(addresses) {
  const result = [];
  addresses.map(address => {
    result.push(toJSObject(address));
  })
  return result;
}

export function updateActiveSection(section) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ACTIVE_SECTION,
      payload: section,
    });
  }
}

export function getAddresses() {
  return (dispatch) => {
    dispatch({ 
      type: GET_CHECKOUT_ADDRESSES_FETCH,
    });
    return axios.get('/shipping_addresses/get_all_for_user')
    .then(response => {
      dispatch({ 
        type: GET_CHECKOUT_ADDRESSES_SUCCESS,
        payload: arrayToHash(toJSArray(response.data.shipping_addresses)),
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_CHECKOUT_ADDRESSES_ERROR, 
        payload: "Ocurrió un error al obtener las direcciones. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function addAddress(values) {
  return (dispatch) => {
    dispatch({ 
      type: ADD_CHECKOUT_ADDRESS_FETCH,
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
          type: ADD_CHECKOUT_ADDRESS_SUCCESS,
          payload: toJSObject(response.data.shipping_address),
        });
        dispatch({ 
          type: CLOSE_ADDRESS_CHECKOUT_DIALOG,
        });
      })
      .catch(e => {
        dispatch({ 
          type: ADD_CHECKOUT_ADDRESS_ERROR, 
          payload: "Ocurrió un error al guardar tu dirección. Por favor intenta más tarde.",
        });
        throw e;
      })
    });
  }
}

export function updateSelectedAddress(id) {
  return (dispatch) => {
    dispatch({ 
      type: UPDATE_SELECTED_CHECKOUT_ADDRESS, 
      payload: id,
    });
  }
}

export function openDialog(dialog) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_ADDRESS_CHECKOUT_DIALOG, 
      payload: dialog
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_ADDRESS_CHECKOUT_DIALOG,
    });
  }
}

const checkoutActions = {
  updateActiveSection,
  getAddresses,
  addAddress,
  updateSelectedAddress,
  openDialog,
  closeDialog,
};

export default checkoutActions;
