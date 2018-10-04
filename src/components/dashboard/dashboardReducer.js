import { fromJS } from 'immutable';
import {
  GET_SUMMARY_FETCH,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_ERROR,
} from './dashboardActions';

const initialState = fromJS({
  loading: false,
  error: '',
  summary: undefined,
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
    default:
      return state;
  }
}

export default dashboardReducer;
