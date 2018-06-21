import session from '../../http/session';
import { SubmissionError } from 'redux-form';

export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNOUT = 'SIGNOUT';

export function submitLogin(values) {

  return (dispatch) => {
    dispatch({ 
      type: LOGIN_FETCH,
    });
    return session.login(values.email, values.password)
    .then(response => {
      console.log('x')
      dispatch({ 
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: LOGIN_ERROR, 
        payload: e 
      });
      throw new SubmissionError({ _error: 'Login failed!' })
    })
  }
}

export function submitSignout() {
  return (dispatch) => {
    dispatch({ 
      type: SIGNOUT
    });
  }  
}

const sessionActions = {
  submitLogin,
  submitSignout
};

export default sessionActions;
