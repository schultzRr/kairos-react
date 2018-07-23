import { fromJS } from 'immutable';
import {
  PASSWORD_RECOVERY_FETCH,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
} from '../../http/sessionActions';
import {
  RESET_FORGOT_ERROR,
} from './forgotActions';

const initialState = fromJS({
  loading: false,
  error: '',
})

function forgotReducer(state = initialState, action) {
  switch(action.type){
    case PASSWORD_RECOVERY_FETCH: 
      return state.set('loading', true)
    case PASSWORD_RECOVERY_SUCCESS: 
      return state.set('loading', false)
    case PASSWORD_RECOVERY_ERROR: 
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case RESET_FORGOT_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default forgotReducer;
