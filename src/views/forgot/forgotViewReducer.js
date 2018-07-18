import { fromJS } from 'immutable';
import {
  PASSWORD_RESET_SUCCESS,
  SIGNOUT_SUCCESS
} from '../../http/sessionActions';

const initialState = fromJS({
  redirectToReferrer: false
})

function forgotViewReducer(state = initialState, action) {
  switch(action.type){
    case PASSWORD_RESET_SUCCESS:
      return state.set('redirectToReferrer', true)
    case SIGNOUT_SUCCESS:
      return state.set('redirectToReferrer', false)
    default:
      return state;
  }
}

export default forgotViewReducer;
