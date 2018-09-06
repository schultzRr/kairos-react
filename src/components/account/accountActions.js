import axios from 'axios';

export const ACCOUNT_UPDATE_FETCH = 'ACCOUNT_UPDATE_FETCH';
export const ACCOUNT_UPDATE_SUCCESS = 'ACCOUNT_UPDATE_SUCCESS';
export const ACCOUNT_UPDATE_ERROR = 'ACCOUNT_UPDATE_ERROR';

export function updateAccount(user) {
  return (dispatch) => {
    dispatch({ 
      type: ACCOUNT_UPDATE_FETCH,
    });
    return axios.put(`/usersx/${user.id}`, {
      user: user
    })
    .then(response => {
      dispatch({ 
        type: ACCOUNT_UPDATE_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: ACCOUNT_UPDATE_ERROR, 
        payload: "Ocurrió un error al guardar tus cambios. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

const accountActions = {
  updateAccount
};

export default accountActions;
