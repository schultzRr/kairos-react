import { fromJS } from 'immutable';
import {
  REGISTER_SUCCESS,
  SIGNOUT_SUCCESS
} from '../../http/sessionActions';

const initialState = fromJS({
  redirectToReferrer: false
})

function registerViewReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_SUCCESS: 
      return state.set('redirectToReferrer', true) 
    case SIGNOUT_SUCCESS: 
      return state.set('redirectToReferrer', false) 
    default:
      return state;
  }
}

export default registerViewReducer;
