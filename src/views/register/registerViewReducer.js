import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  SIGNOUT
} from '../../components/register/registerActions';

const initialState = {
  redirectToReferrer: false
}

function registerViewReducer(state = initialState, action) {
  switch(action.type){
    case REGISTER_SUCCESS: 
      return {...state, redirectToReferrer: true}
    case SIGNOUT: 
      return {...state, redirectToReferrer: false}
    default:
      return state;
  }
}

export default registerViewReducer;