import axios from 'axios';
import {
  GET_SUMMARY_FETCH,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_ERROR
} from 'src/actions';

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

const downlinesActions = {
  getSummary,
};

export default downlinesActions;
