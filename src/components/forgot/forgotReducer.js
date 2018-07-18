import { fromJS } from 'immutable';
import {
  PASSWORD_RECOVERY_FETCH,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
} from '../../http/sessionActions';
import {
  HIDE_FORGOT_NOTIFICATION,
  RESET_FORGOT_NOTIFICATION,
} from './forgotActions';

const initialState = fromJS({
  loading: false,
  message: '',
  notification: false,
  type: ''
})

function forgotReducer(state = initialState, action) {
  switch(action.type){
    case PASSWORD_RECOVERY_FETCH: 
      return state.merge({
        loading: true,
      })
    case PASSWORD_RECOVERY_SUCCESS: 
      return state.merge({
        loading: false,
        message: action.payload,
        notification: true,
        type: ''
      })
    case PASSWORD_RECOVERY_ERROR: 
      return state.merge({
        loading: false,
        message: action.payload,
        notification: true,
        type: 'warning'
      })
    case HIDE_FORGOT_NOTIFICATION:
      return state.merge({
        notification: false,
      })
    case RESET_FORGOT_NOTIFICATION:
      return state.merge({
        message: '',
        type: ''
      })
    default:
      return state;
  }
}

export default forgotReducer;
