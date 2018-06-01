const initialState = {
  isAuthenticated: false,
  user: {
    name: 'Ricardo',
    last_name: 'Rosas'
  }
}

function sessionReducer(state = initialState, action) {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      console.log(action.payload);
      return {...state, isAuthenticated: true, user: action.payload.user };
    default:
      return state;
  }
}

export default sessionReducer;