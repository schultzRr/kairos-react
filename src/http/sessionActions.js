import session from './session';

export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTER_FETCH = 'REGISTER_FETCH';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const PASSWORD_RECOVERY_FETCH = 'PASSWORD_RECOVERY_FETCH';
export const PASSWORD_RECOVERY_SUCCESS = 'PASSWORD_RECOVERY_SUCCESS';
export const PASSWORD_RECOVERY_ERROR = 'PASSWORD_RECOVERY_ERROR';
export const PASSWORD_RESET_FETCH = 'PASSWORD_RESET_FETCH';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';
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

export function register(values) {

  return (dispatch) => {
    dispatch({ 
      type: REGISTER_FETCH,
    });

    return session.getIpInfo()
    .then(location => {

      const user = {
        first_name: values.name,
        last_name: values.lastname,
        email: values.email,
        external_id: values.externalId,
        sponsor_external_id: values.sponsorExternalId,
        placement_external_id: values.placementExternalId,
        transaction_number: values.transactionNumber,
        iuvare_id: values.iuvareId,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.confirmation
      };

      session.registerUser(user)
      .then(response => {

        const address = {
          address: values.address,
          zip: values.zip,
          country: values.country,
          state: values.state,
          location: location
        };

        const user = response.data;

        session.registerAddress(address)
        .then(response => {
          dispatch({ 
            type: REGISTER_SUCCESS,
            payload: user
          });
        })
        .catch(e => {
          dispatch({ 
            type: REGISTER_ERROR, 
            payload: e.response.data.errors[0].title
          });
          
        });

      })
      .catch(e => {
        console.log(e.response);
        dispatch({ 
          type: REGISTER_ERROR, 
          payload: e.response.data.errors[0].title
        });
        
      });
      
    });
  }
}

export function recoverPassword(values) {

  return (dispatch) => {
    dispatch({ 
      type: PASSWORD_RECOVERY_FETCH,
    });
    return session.recoverPassword(values.email)
    .then(response => {
      dispatch({ 
        type: PASSWORD_RECOVERY_SUCCESS,
        payload: 'Se ha enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para poder recuperar tu contraseña.'
      });
    })
    .catch(e => {
      dispatch({ 
        type: PASSWORD_RECOVERY_ERROR, 
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
      dispatch({ 
        type: LOGIN_ERROR, 
        payload: e.response.data.errors[0].title
      });
      
    })
  }
}

const sessionActions = {
  login,
  register,
  signout,
  getCurrentSession
};

export default sessionActions;
