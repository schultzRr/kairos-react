import { fromJS, List } from 'immutable';
import {
  GET_PRODUCTS_FETCH,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from './productsActions';

const initialState = fromJS({
  loading: false,
  error: '',
  products: List()
});

function productsReducer(state = initialState, action) {
  switch(action.type){
    case GET_PRODUCTS_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case GET_PRODUCTS_SUCCESS:
      return state.merge({
        loading: false,
        products: fromJS(action.payload),
      })
    case GET_PRODUCTS_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    default:
      return state;
  }
}

export default productsReducer;
