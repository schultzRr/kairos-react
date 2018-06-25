import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT
} from '../../components/login/loginActions';

const initialState = fromJS({
  redirectToReferrer: false
})

function loginViewReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS: 
      return state.set('redirectToReferrer', true) 
    case SIGNOUT: 
      return state.set('redirectToReferrer', false) 
    default:
      return state;
  }
}

export default loginViewReducer;
