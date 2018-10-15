import axios from 'axios';

export const GET_SUMMARY_FETCH = 'GET_SUMMARY_FETCH';
export const GET_SUMMARY_SUCCESS = 'GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_ERROR = 'GET_SUMMARY_ERROR';

export function getSummary() {
  return (dispatch) => {
    dispatch({ 
      type: GET_SUMMARY_FETCH,
    });
    return axios.get('/summaries/for_user')
    .then(response => {
      console.log(response.data);
      dispatch({ 
        type: GET_SUMMARY_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_SUMMARY_ERROR, 
        payload: "Ocurrió un error al obtener el dashboard. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

const dashboardActions = {
  getSummary
};

export default dashboardActions;
