import { fromJS } from 'immutable';
import {
  GET_SUMMARY_FETCH,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_ERROR,
  SEND_SUMMARY_DETAIL_FETCH,
  SEND_SUMMARY_DETAIL_SUCCESS,
  SEND_SUMMARY_DETAIL_ERROR,
} from './dashboardActions';

const initialState = fromJS({
  loading: false,
  loadingEmail: false,
  error: '',
  summary: undefined,
  emailSent: false,
});

function dashboardReducer(state = initialState, action) {
  switch(action.type){
    case GET_SUMMARY_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case GET_SUMMARY_SUCCESS:
      return state.merge({
        loading: false,
        summary: fromJS(action.payload),
      })
    case GET_SUMMARY_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case SEND_SUMMARY_DETAIL_FETCH:
      return state.merge({
        loadingEmail: true,
        error: '',
        emailSent: false,
      })
    case SEND_SUMMARY_DETAIL_SUCCESS:
      return state.merge({
        loadingEmail: false,
        emailSent: true,
      })
    case SEND_SUMMARY_DETAIL_ERROR:
      return state.merge({
        loadingEmail: false,
        error: action.payload,
      })
    default:
      return state;
  }
}

export default dashboardReducer;
