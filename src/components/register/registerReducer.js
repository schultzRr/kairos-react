import { fromJS } from 'immutable';

import {
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CONFIRM_REGISTRATION_FETCH,
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_ERROR,
  REGISTER_VIEW_CHANGE
} from 'src/actions';

import views from './registerConstants';

const initialState = fromJS({
  loading: false,
  error: '',
  view: views.REGISTER_STEP_1_VIEW,
  title: 'Crear cuenta',
})

function registerReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_FETCH:
      return state.merge({
        loading: true,
        error: initialState.get('error'),
      })
    case REGISTER_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        view: views.REGISTER_INSTRUCTIONS_VIEW,
        title: 'Confirma tu correo electrónico'
      })
    case REGISTER_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case CONFIRM_REGISTRATION_FETCH:
      return state.merge({
        loading: true,
        error: initialState.get('error'),
      })
    case CONFIRM_REGISTRATION_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        view: views.REGISTER_CONFIRMATION_VIEW,
        title: 'Correo electrónico confirmado'
      })
    case CONFIRM_REGISTRATION_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
        view: views.REGISTER_CONFIRMATION_ERROR_VIEW,
        title: 'Lo sentimos mucho'
      })
    case REGISTER_VIEW_CHANGE:
      return state.merge({
        view: action.payload.view,
        title: action.payload.title,
        error: initialState.get('error'),
      })
    default:
      return state;
  }
}

export default registerReducer;
