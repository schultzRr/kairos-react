import { fromJS } from 'immutable';
import {
  GET_ADDRESSES_FETCH,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_ERROR,
  ADD_ADDRESS_FETCH,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  UPDATE_ADDRESS_FETCH,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  DELETE_ADDRESS_FETCH,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './addressActions';

const initialState = fromJS({
  loading: false,
  error: '',
  dialog: '',
  selectedAddressId: 0,
  addresses: {}
});

function addressReducer(state = initialState, action) {
  switch(action.type){
    case GET_ADDRESSES_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case GET_ADDRESSES_SUCCESS:
      return state.merge({
        loading: false,
        addresses: fromJS(action.payload)
      })
    case GET_ADDRESSES_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case ADD_ADDRESS_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case ADD_ADDRESS_SUCCESS:
      return state.merge({
        loading: false,
        dialog: initialState.get('dialog'),
        addresses: state.get('addresses').set(action.payload.id, action.payload),
      })
    case ADD_ADDRESS_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case UPDATE_ADDRESS_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case UPDATE_ADDRESS_SUCCESS:
      return state.merge({
        loading: false,
        dialog: initialState.get('dialog'),
        selectedAddressId: initialState.get('selectedAddressId'),
        addresses: state.get('addresses').set(action.payload.id, action.payload),
      })
    case UPDATE_ADDRESS_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case DELETE_ADDRESS_FETCH:
      return state.merge({
        loading: false,
        error: '',
      })
    case DELETE_ADDRESS_SUCCESS:
      return state.merge({
        loading: false,
        addresses: state.get('addresses').delete(action.payload.toString()),
      })
    case DELETE_ADDRESS_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case OPEN_DIALOG:
      return state.merge({
        loading: initialState.get('loading'),
        error: initialState.get('error'),
        dialog: action.payload.dialog,
        selectedAddressId: action.payload.selectedAddressId,
      })
    case CLOSE_DIALOG:
      return state.merge({
        loading: initialState.get('loading'),
        error: initialState.get('error'),
        dialog: initialState.get('dialog'),
        selectedAddressId: initialState.get('selectedAddressId'),
      })
    default:
      return state;
  }
}

export default addressReducer;
