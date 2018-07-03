import { fromJS } from 'immutable';
import {
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../../http/sessionActions';
import {
  HIDE_REGISTER_ERROR,
  RESET_REGISTER_ERROR,
} from './registerActions';

const initialState = fromJS({
  loading: false,
  error: '',
  displayError: false
})

function registerReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case REGISTER_SUCCESS:
      return state.set('loading', false)
    case REGISTER_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
        displayError: true
      })
    case HIDE_REGISTER_ERROR:
      return state.set('displayError', false)
    case RESET_REGISTER_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default registerReducer;
