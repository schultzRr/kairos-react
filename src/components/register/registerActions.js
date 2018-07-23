export const RESET_REGISTER_ERROR = 'RESET_REGISTER_ERROR';

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_REGISTER_ERROR,
    });
  }
}

const registerActions = {
  resetError
};

export default registerActions;
