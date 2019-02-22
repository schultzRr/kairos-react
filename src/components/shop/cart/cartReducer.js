import { fromJS, Map } from 'immutable';
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './cartActions';

const initialState = fromJS({
  products: Map(),
});

function productsReducer(state = initialState, action) {
  switch(action.type){
    case ADD_PRODUCT_TO_CART:
      return state.merge({
        products: state.get('products').get(action.payload.id.toString()) ? 
          state.get('products').setIn([action.payload.id.toString(), 'quantity'], state.getIn(['products', action.payload.id.toString(), 'quantity']) + 1) : 
          state.get('products').set(action.payload.id.toString(), fromJS(action.payload)),
      })
    case REMOVE_PRODUCT_FROM_CART:
      return state.merge({
        plays: state.get('products').delete(action.payload.toString()),
      })
    default:
      return state;
  }
}

export default productsReducer;
