import session from '../../http/session';

export const REGISTER_FETCH = 'REGISTER_FETCH';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const SIGNOUT = 'SIGNOUT';

export function submitRegister(values) {

  return (dispatch) => {
    dispatch({ 
      type: REGISTER_FETCH,
    });
    return session.register(values.email, values.password)
    .then(response => {
      dispatch({ 
        type: REGISTER_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: REGISTER_ERROR, 
        payload: e.response.data.errors[0].title
      });
      
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

const registerActions = {
  submitRegister,
  submitSignout
};

export default registerActions;
