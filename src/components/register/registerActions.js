export const HIDE_REGISTER_ERROR = 'HIDE_REGISTER_ERROR';
export const RESET_REGISTER_ERROR = 'RESET_REGISTER_ERROR';

export function hideError() {

  return (dispatch) => {
    dispatch({ 
      type: HIDE_REGISTER_ERROR,
    });
  }
}

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_REGISTER_ERROR,
    });
  }
}

const registerActions = {
  hideError,
  resetError
};

export default registerActions;
