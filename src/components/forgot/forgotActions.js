export const HIDE_FORGOT_NOTIFICATION = 'HIDE_FORGOT_NOTIFICATION';
export const RESET_FORGOT_NOTIFICATION = 'RESET_FORGOT_NOTIFICATION';

export function hideNotification() {

  return (dispatch) => {
    dispatch({ 
      type: HIDE_FORGOT_NOTIFICATION,
    });
  }
}

export function resetNotification() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_FORGOT_NOTIFICATION,
    });
  }
}

const forgotActions = {
  hideNotification,
  resetNotification
};

export default forgotActions;
