import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../../http/sessionActions';

const initialState = {
  fetching: false,
  error: '', 
}

function loginReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_FETCH: 
      return {...state, fetching: true, error: ''}
    case LOGIN_SUCCESS: 
      return {...state, fetching: false}
    case LOGIN_ERROR: 
    return {...state, fetching: false, error: action.payload }
    default:
      return state;
  }
}

export default loginReducer;