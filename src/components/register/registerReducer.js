import { fromJS } from 'immutable';
import {
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from '../../http/sessionActions';

const initialState = fromJS({
  fetching: false,
  error: '', 
})

function registerReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_FETCH: 
      return state.merge({
        fetching: true,
        error: '',
      })
    case REGISTER_SUCCESS: 
      return state.set('fetching', false) 
    case REGISTER_ERROR: 
      return state.merge({
        fetching: false,
        error: action.payload,
      })
    default:
      return state;
  }
}

export default registerReducer;
