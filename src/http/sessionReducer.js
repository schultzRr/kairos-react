import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
} from './sessionActions';

const initialState = fromJS({
  isAuthenticated: false,
  user: {}
});

function sessionReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS:
      return state.merge({
        isAuthenticated: true,
        user: action.payload.user,
      })
    case SIGNOUT:
      return state.set('isAuthenticated', false) 
    default:
      return state;
  }
}

export default sessionReducer;
