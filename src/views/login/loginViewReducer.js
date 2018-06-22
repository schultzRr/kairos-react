import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS
} from '../../http/sessionActions';

const initialState = {
  redirectToReferrer: false
}

function loginViewReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS: 
      return {...state, redirectToReferrer: true}
    case SIGNOUT_SUCCESS: 
      return {...state, redirectToReferrer: false}
    default:
      return state;
  }
}

export default loginViewReducer;