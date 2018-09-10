import axios from 'axios';

export const ACCOUNT_UPDATE_FETCH = 'ACCOUNT_UPDATE_FETCH';
export const ACCOUNT_UPDATE_SUCCESS = 'ACCOUNT_UPDATE_SUCCESS';
export const ACCOUNT_UPDATE_ERROR = 'ACCOUNT_UPDATE_ERROR';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export function updateAccount(user) {
  return (dispatch) => {
    dispatch({ 
      type: ACCOUNT_UPDATE_FETCH,
    });
    return axios.put(`/users/${user.id}`, {
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

export function openDialog(dialog) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_DIALOG, 
      payload: dialog
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_DIALOG,
    });
  }
}

export function closeSnackbar() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_SNACKBAR,
    });
  }
}

const accountActions = {
  updateAccount,
  openDialog,
  closeDialog,
  closeSnackbar,
};

export default accountActions;
