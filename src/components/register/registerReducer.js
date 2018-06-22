import {
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from '../../components/register/registerActions';

const initialState = {
  fetching: false,
  error: '', 
}

function registerReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_FETCH: 
      return {...state, fetching: true, error: ''}
    case REGISTER_SUCCESS: 
      return {...state, fetching: false}
    case REGISTER_ERROR: 
    return {...state, fetching: false, error: action.payload }
    default:
      return state;
  }
}

export default registerReducer;