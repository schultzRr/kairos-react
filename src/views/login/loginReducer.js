const initialState = {
  test: 'test'
}

function loginViewReducer(state = initialState, action) {
  switch(action.type){
    case 'TEST': 
      return state;
    default:
      return state;
  }
}

export default loginViewReducer;