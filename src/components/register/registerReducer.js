import { fromJS } from 'immutable';
import views from './registerConstants';
import {
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CONFIRM_REGISTRATION_FETCH,
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_ERROR
} from '../../http/sessionActions';
import {
  REGISTER_VIEW_CHANGE,
  RESET_REGISTER_ERROR,
} from './registerActions';

const initialState = fromJS({
  loading: false,
  error: '',
  view: views.REGISTER_STEP_1_VIEW
})

function registerReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_FETCH:
      return state.set('loading', true)
    case REGISTER_SUCCESS:
      return state.merge({
        loading: false,
        view: views.REGISTER_INSTRUCTIONS_VIEW,
      })
    case REGISTER_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case CONFIRM_REGISTRATION_FETCH:
      return state.set('loading', true)
    case CONFIRM_REGISTRATION_SUCCESS:
      return state.merge({
        loading: false,
        view: views.REGISTER_CONFIRMATION_VIEW,
      })
    case CONFIRM_REGISTRATION_ERROR:
      console.log('CONFIRM_REGISTRATION_ERROR');
      return state.merge({
        loading: false,
        error: action.payload,
        view: views.REGISTER_CONFIRMATION_ERROR_VIEW
      })
    case REGISTER_VIEW_CHANGE:
      return state.set('view', action.payload);
    case RESET_REGISTER_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default registerReducer;
