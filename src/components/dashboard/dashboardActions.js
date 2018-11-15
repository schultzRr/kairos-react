import axios from 'axios';

export const GET_SUMMARY_FETCH = 'GET_SUMMARY_FETCH';
export const GET_SUMMARY_SUCCESS = 'GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_ERROR = 'GET_SUMMARY_ERROR';
export const SEND_SUMMARY_DETAIL_FETCH = 'SEND_SUMMARY_DETAIL_FETCH';
export const SEND_SUMMARY_DETAIL_SUCCESS = 'SEND_SUMMARY_DETAIL_SUCCESS';
export const SEND_SUMMARY_DETAIL_ERROR = 'SEND_SUMMARY_DETAIL_ERROR';

export function getSummary() {
  return (dispatch) => {
    dispatch({ 
      type: GET_SUMMARY_FETCH,
    });
    return axios.get('/summaries/for_user')
    .then(response => {
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

export function getMonthDetail(month) {
  return (dispatch) => {
    dispatch({ 
      type: SEND_SUMMARY_DETAIL_FETCH,
    });
    return axios.post('/summaries/send_by_email', {
      period_start: month.period_start,
      period_end: month.period_end,
    })
    .then(response => {
      dispatch({ 
        type: SEND_SUMMARY_DETAIL_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: SEND_SUMMARY_DETAIL_ERROR, 
        payload: "Ocurrió un error al obtener el detalle de volumen del mes. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

const dashboardActions = {
  getSummary,
  getMonthDetail,
};

export default dashboardActions;
