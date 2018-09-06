import { fromJS } from 'immutable';
import {
  ACCOUNT_UPDATE_FETCH,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_ERROR,
} from './accountActions';

const initialState = fromJS({
  loading: false,
  error: '',
});

function accountReducer(state = initialState, action) {
  switch(action.type){
    case ACCOUNT_UPDATE_FETCH: 
      return state.merge({
        loading: true,
        error: '',
      })
    case ACCOUNT_UPDATE_SUCCESS: 
      return state.merge({
        loading: false,
      })
    case ACCOUNT_UPDATE_ERROR: 
      return state.merge({
        loading: false,
        error: action.payload,
      })
    default:
      return state;
  }
}

export default accountReducer;
