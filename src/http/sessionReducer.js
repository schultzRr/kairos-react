import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
} from './sessionActions';

const initialState = fromJS({
  isAuthenticated: false,
  email: '',
  name: '',
  lastname: '',
  phone: '',
});

function sessionReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS:
      return state.merge({
        isAuthenticated: true,
        email: action.payload.user.email,
        name: action.payload.user.first_name,
        lastname: action.payload.user.last_name,
        phone: action.payload.user.phone,
      })
    case SIGNOUT_SUCCESS:
      return state.merge({
        isAuthenticated: false,
        email: '',
        name: '',
        lastname: '',
        phone: '',
      })
    default:
      return state;
  }
}

export default sessionReducer;
