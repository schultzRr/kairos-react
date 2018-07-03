import { fromJS } from 'immutable';
import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../../http/sessionActions';
import {
  HIDE_LOGIN_ERROR,
  RESET_LOGIN_ERROR,
} from './loginActions';

const initialState = fromJS({
  loading: false,
  error: '',
  displayError: false
})

function loginReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_FETCH: 
      return state.merge({
        loading: true,
        error: '',
      })
    case LOGIN_SUCCESS: 
      return state.set('loading', false)
    case LOGIN_ERROR: 
      return state.merge({
        loading: false,
        error: action.payload,
        displayError: true
      })
    case HIDE_LOGIN_ERROR:
      return state.set('displayError', false)
    case RESET_LOGIN_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default loginReducer;
