import axios from 'axios';

import {
  ACCOUNT_UPDATE_FETCH,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_ERROR,
  OPEN_ACCOUNT_DIALOG,
  CLOSE_ACCOUNT_DIALOG
} from 'src/actions';

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
      dispatch({ 
        type: CLOSE_ACCOUNT_DIALOG,
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
      type: OPEN_ACCOUNT_DIALOG, 
      payload: dialog
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_ACCOUNT_DIALOG,
    });
  }
}

const accountActions = {
  updateAccount,
  openDialog,
  closeDialog,
};

export default accountActions;
