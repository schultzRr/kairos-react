import session from '../../http/session';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function submitLogin(values, event, formApi) {
  return (dispatch) => {
    return session.login(values.email, values.password)
    .then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      session.setHeaders();
      
      response.json().then(data => {
        dispatch({ 
          type: LOGIN_SUCCESS,
          payload: data
        });
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
