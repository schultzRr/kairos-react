import { fromJS } from 'immutable';
import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../../components/login/loginActions';

const initialState = fromJS({
  fetching: false,
  error: '', 
})

function loginReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_FETCH: 
      return state.merge({
        fetching: true,
        error: '',
      })
    case LOGIN_SUCCESS: 
      return state.set('fetching', false) 
    case LOGIN_ERROR: 
      return state.merge({
        fetching: false,
        error: action.payload,
      })
    default:
      return state;
  }
}

export default loginReducer;
