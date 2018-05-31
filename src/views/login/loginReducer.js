import { onChangeLoadingView } from './loginActions';

const initialState = {
  isAuth: false,
  loadingView: true,
  error: ''
}

function loginViewReducer(state = initialState, action) {
  console.log(action)
  switch(action.type){
    case 'CHANGE_LOADING_VIEW':
      const newState = { ...initialState, 
        loadingView: action.payload.loadingView
      };
      return newState;
    default:
      return state;
  }
}

export default loginViewReducer;
