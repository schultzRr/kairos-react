import { fromJS, List } from 'immutable';
import {
  GET_PRODUCTS_FETCH,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  OPEN_PRODUCT_DIALOG,
  CLOSE_PRODUCT_DIALOG,
  EXIT_PRODUCT_DIALOG,
  UPDATE_SELECTED_PRODUCT_VARIANT,
} from './productsActions';

const initialState = fromJS({
  loading: false,
  error: '',
  products: List(),
  selectedProduct: null,
  selectedVariant: null,
  openDialog: false,
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
    case OPEN_PRODUCT_DIALOG:
      return state.merge({
        openDialog: true,
        selectedProduct: state.get('products').get(action.payload.toString()),
        selectedVariant: state.get('products').get(action.payload.toString()).get('variants').first(),
      })
    case CLOSE_PRODUCT_DIALOG:
      return state.merge({
        openDialog: false,
      })
    case EXIT_PRODUCT_DIALOG:
      return state.merge({
        selectedProduct: initialState.get('selectedProduct'),
        selectedVariant: initialState.get('selectedVariant'),
      })
    case UPDATE_SELECTED_PRODUCT_VARIANT:
      return state.merge({
        selectedVariant: state.get('selectedProduct').get('variants') ? state.get('selectedProduct').get('variants').find(item => item.get('id') == action.payload.toString()) : undefined,

      })
    default:
      return state;
  }
}

export default productsReducer;
