export const RESET_FORGOT_ERROR = 'RESET_FORGOT_ERROR';

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_FORGOT_ERROR,
    });
  }
}

const forgotActions = {
  resetError
};

export default forgotActions;
