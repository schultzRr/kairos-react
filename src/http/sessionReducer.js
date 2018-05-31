const initialState = {
  isAuthenticated: false,
  user: 'Ricardo'
}

function sessionReducer(state = initialState, action) {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export default sessionReducer;