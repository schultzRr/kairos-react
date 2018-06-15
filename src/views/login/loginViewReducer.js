import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT
} from '../../components/login/loginActions';

const initialState = {
  redirectToReferrer: false
}

function loginViewReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS: 
      return {...state, redirectToReferrer: true}
    default:
      return state;
  }
}

export default loginViewReducer;