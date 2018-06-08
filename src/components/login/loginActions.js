import session from '../../http/session';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function submitLogin(values, event, formApi) {
  return (dispatch) => {
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
        payload: e 
      });
    })
  }
}

export function submitSignout() {
  
}

const sessionActions = {
  submitLogin,
  submitSignout
};

export default sessionActions;
