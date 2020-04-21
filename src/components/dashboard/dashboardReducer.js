import { fromJS } from 'immutable';
import {
  GET_SUMMARY_FETCH,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_ERROR,
} from 'src/actions';

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
        error: initialState.get('error'),
        summary: initialState.get('summary')
      })
    case GET_SUMMARY_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        summary: fromJS(action.payload),
      })
    case GET_SUMMARY_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    default:
      return state;
  }
}

export default dashboardReducer;
