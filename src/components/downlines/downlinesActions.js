import axios from 'axios';
import {
  GET_DOWNLINES_DATA_FETCH,
  GET_DOWNLINES_DATA_SUCCESS,
  GET_DOWNLINES_DATA_ERROR,
} from 'src/actions';

function toJSObject(parentId, user, summary, level) {
  const result = {
    id: user.id,
    externalId: user.external_id,
    level: level,
    firstName: user.first_name,
    lastName: user.last_name,
    omeinVp: summary.omein_vp,
    omeinGp: summary.omein_gp,
    pranaVp: summary.prana_vp,
    pranaGp: summary.prana_gp,
    parentId: parentId,
    hasItems: user.downline_count && user.downline_count > 0,
  }

  return result
}

function toJSArray(data, level) {
  const result = [];
  
  if (level == 0){
    result.push(toJSObject(null, data.user, data.summary, level));
  }
  
  data.downlines.map(downline => {
    result.push(toJSObject(data.user.external_id, downline.user, downline.summary, level + 1));
  })
  return result;
}

export function getDownlinesData(id, startDate, endDate, level) {
  return (dispatch) => {
    dispatch({ 
      type: GET_DOWNLINES_DATA_FETCH,
      payload: {
        level: level
      }
    });
    return axios.get('/summaries/by_period_and_user_with_downlines_1_level', {
      params : {
        period_start: startDate,
        period_end: endDate,
        user_id: id,
      }
    })
    .then(response => {
      dispatch({ 
        type: GET_DOWNLINES_DATA_SUCCESS,
        payload: {
          id: response.data.user.external_id,
          downlines: toJSArray(response.data, level),
        }
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_DOWNLINES_DATA_ERROR, 
        payload: "Ocurrió un error al obtener el dashboard. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

export function getMonthDetail(startDate, endDate, email) {
  return (dispatch) => {
    dispatch({ 
      type: SEND_SUMMARY_DETAIL_FETCH,
    });
    return axios.post('/summaries/send_by_email', {
      period_start: startDate,
      period_end: endDate,
    })
    .then(response => {
      dispatch({ 
        type: SEND_SUMMARY_DETAIL_SUCCESS,
        payload: `¡Listo! Pronto recibirás el detalle en ${email}`
      });
    })
    .catch(e => {
      dispatch({ 
        type: SEND_SUMMARY_DETAIL_ERROR, 
        payload: "Hubo un problema al enviar el correo electrónico. Escríbenos a soporte@futuranetwork.com"
      });
      throw e;
    })
  }
}

const downlinesActions = {
  getDownlinesData,
};

export default downlinesActions;
