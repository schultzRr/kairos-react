import session from './session';

export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNOUT_FETCH = 'SIGNOUT_FETCH';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNOUT_ERROR = 'SIGNOUT_ERROR';

export function login(values) {

  return (dispatch) => {
    dispatch({ 
      type: LOGIN_FETCH,
    });
    return session.login(values.email, values.password)
    .then(response => {
      dispatch({ 
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: LOGIN_ERROR, 
        payload: e.response.data.errors[0].title
      });
      
    })
  }
}

export function signout() {

  return (dispatch) => {
    dispatch({ 
      type: SIGNOUT_FETCH,
    });
    return session.signout()
    .then(response => {
      dispatch({ 
        type: SIGNOUT_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: SIGNOUT_ERROR, 
        payload: e.response.data.errors[0].title
      });
      
    })
  }
}

export function getCurrentSession() {

  return (dispatch) => {
    return session.getCurrentSession()
    .then(response => {
      dispatch({ 
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({ 
        type: LOGIN_ERROR, 
        payload: e.response.data.errors[0].title
      });
      
    })
  }
}

const sessionActions = {
  login,
  signout,
  getCurrentSession
};

export default sessionActions;
