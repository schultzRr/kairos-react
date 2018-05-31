const initialState = {
  redirectToReferrer: false
}

function loginViewReducer(state = initialState, action) {
  switch(action.type){
    case 'LOGIN_SUCCESS': 
      return state;
    default:
      return state;
  }
}

export default loginViewReducer;