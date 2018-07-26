import { fromJS } from 'immutable';
import {
  SIGNOUT_SUCCESS
} from '../../http/sessionActions';

const initialState = fromJS({
  redirectToReferrer: false
})

function forgotViewReducer(state = initialState, action) {
  switch(action.type){
    case SIGNOUT_SUCCESS:
      return state.set('redirectToReferrer', false)
    default:
      return state;
  }
}

export default forgotViewReducer;
