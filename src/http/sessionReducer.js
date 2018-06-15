import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT
} from '../components/login/loginActions';

const initialState = {
  isAuthenticated: true,
  user: {
    name: 'Ricardo',
    last_name: 'Rosas'
  }
}

function sessionReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS:
      return {...state, isAuthenticated: true, user: action.payload.user };
    case SIGNOUT:
      return {...state, isAuthenticated: false};
    default:
      return state;
  }
}

export default sessionReducer;