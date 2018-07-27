import { fromJS } from 'immutable';
import views from './loginConstants';
import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CONFIRMATION_ERROR,
  RESEND_CONFIRMATION_EMAIL_FETCH,
  RESEND_CONFIRMATION_EMAIL_SUCCESS,
  RESEND_CONFIRMATION_EMAIL_ERROR,
} from '../../http/sessionActions';
import {
  RESET_LOGIN_ERROR,
} from './loginActions';

const initialState = fromJS({
  loading: false,
  error: '',
  view: views.LOGIN_FORM_VIEW
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
      })
    case LOGIN_CONFIRMATION_ERROR: 
      return state.merge({
        loading: false,
        view: views.CONFIRM_EMAIL_ERROR_VIEW,
      })
    case RESEND_CONFIRMATION_EMAIL_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case RESEND_CONFIRMATION_EMAIL_SUCCESS:
      return state.merge({
        loading: false,
        view: views.CONFIRM_EMAIL_INTRUCTIONS_VIEW,
      })
    case RESEND_CONFIRMATION_EMAIL_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case RESET_LOGIN_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default loginReducer;
