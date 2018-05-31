import session from './session';
import store from '../store';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

let authenticated = false;

export function isAuthenticated() {
  return authenticated;
}

export function submitLogin(values, event, formApi) {
  console.log('a');
  return (dispatch) => {
    dispatch({ 
      type: LOGIN_SUCCESSFUL, 
      payload: {} });
    // console.log('b');
    // session.login(values.email, values.password)
    // .then(res => {
    //   console.log('x');
    //   if(res.ok) {
    //     dispatch({ 
    //       type: LOGIN_SUCCESSFUL, 
    //       data });
    //   }
    // })
    // .catch(e => {
    //   console.log('y');
    //   dispatch({ type: LOGIN_ERROR, data: e });
    // })
  }
}

export function signout() {
  authenticated = false;
}

const sessionActions = {
  submitLogin,
  isAuthenticated,
  signout
};

export default sessionActions;
