import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../../components/login/loginActions';

const initialState = {
  isFetching: false,
  hasError: false 
}

function loginReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_FETCH: 
      return {...state, isFetching: true}
    case LOGIN_SUCCESS: 
      return {...state, isFetching: false}
    case LOGIN_ERROR: 
    return {...state, isFetching: false, hasError: true }
    default:
      return state;
  }
}

export default loginReducer;