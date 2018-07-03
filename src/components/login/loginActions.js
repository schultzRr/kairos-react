export const HIDE_LOGIN_ERROR = 'HIDE_LOGIN_ERROR';
export const RESET_LOGIN_ERROR = 'RESET_LOGIN_ERROR';

export function hideError() {

  return (dispatch) => {
    dispatch({ 
      type: HIDE_LOGIN_ERROR,
    });
  }
}

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_LOGIN_ERROR,
    });
  }
}

const loginActions = {
  hideError,
  resetError
};

export default loginActions;
