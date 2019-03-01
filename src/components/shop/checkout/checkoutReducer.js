import { fromJS, Map } from 'immutable';
import {
  GET_CHECKOUT_ADDRESSES_SUCCESS,
  UPDATE_SELECTED_CHECKOUT_ADDRESS,
  UPDATE_ACTIVE_SECTION,
  OPEN_ADDRESS_CHECKOUT_DIALOG,
  CLOSE_ADDRESS_CHECKOUT_DIALOG
} from './checkoutActions';

const initialState = fromJS({
  loading: false,
  error: '',
  dialog: '',
  openDialog: false,
  activeSection: undefined,
  addresses: null,
  selectedShippingAddress: undefined,
});

function checkoutReducer(state = initialState, action) {
  switch(action.type){
    case GET_CHECKOUT_ADDRESSES_SUCCESS:
      return state.merge({
        addresses: fromJS(action.payload),
        selectedShippingAddress: fromJS(action.payload).find(address => (address.get('primary') == true)),
      })
    case UPDATE_SELECTED_CHECKOUT_ADDRESS:
      return state.merge({
        selectedShippingAddress: state.get('addresses').get(action.payload.toString()),
      })
    case UPDATE_ACTIVE_SECTION:
      return state.merge({
        activeSection: action.payload,
      })
    case OPEN_ADDRESS_CHECKOUT_DIALOG:
      return state.merge({
        dialog: action.payload,
        openDialog: true,
      })
    case CLOSE_ADDRESS_CHECKOUT_DIALOG:
      return state.merge({
        openDialog: initialState.get('openDialog'),
      })
    default:
      return state;
  }
}

export default checkoutReducer;
