import { fromJS } from 'immutable';
import {
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../../http/sessionActions';
import {
  RESET_REGISTER_ERROR,
} from './registerActions';

const initialState = fromJS({
  loading: false,
  error: '',
})

function registerReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_FETCH:
      return state.set('loading', true)
    case REGISTER_SUCCESS:
      return state.set('loading', false)
    case REGISTER_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case RESET_REGISTER_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default registerReducer;
