export const RESET_LOGIN_ERROR = 'RESET_LOGIN_ERROR';

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_LOGIN_ERROR,
    });
  }
}

const loginActions = {
  resetError
};

export default loginActions;
