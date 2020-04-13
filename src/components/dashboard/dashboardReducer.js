import { fromJS } from 'immutable';
import {
  GET_SUMMARY_FETCH,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_ERROR,
  SEND_SUMMARY_DETAIL_FETCH,
  SEND_SUMMARY_DETAIL_SUCCESS,
  SEND_SUMMARY_DETAIL_ERROR,
  CLOSE_SUMMARY_NOTIFICATION,
  EXIT_SUMMARY_NOTIFICATION,
} from 'src/actions';

const initialState = fromJS({
  loading: false,
  error: '',
  summary: undefined,
  loadingEmail: false,
  snackbarMessage: '',
  snackbarErrorMessage: '',
  openSnackbar: false,
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
    case SEND_SUMMARY_DETAIL_FETCH:
      return state.merge({
        loadingEmail: true,
        snackbarErrorMessage: initialState.get('snackbarErrorMessage'),
        snackbarMessage: initialState.get('snackbarMessage'),
      })
    case SEND_SUMMARY_DETAIL_SUCCESS:
      return state.merge({
        loadingEmail: initialState.get('loadingEmail'),
        snackbarMessage: action.payload,
        openSnackbar: true,
      })
    case SEND_SUMMARY_DETAIL_ERROR:
      return state.merge({
        loadingEmail: initialState.get('loadingEmail'),
        snackbarErrorMessage: action.payload,
        openSnackbar: true,
      })
    case CLOSE_SUMMARY_NOTIFICATION:
      return state.merge({
        openSnackbar: initialState.get('openSnackbar'),
      })
    case EXIT_SUMMARY_NOTIFICATION:
      return state.merge({
        snackbarMessage: initialState.get('error'),
        snackbarErrorMessage: initialState.get('snackbarErrorMessage'),
      })
    default:
      return state;
  }
}

export default dashboardReducer;
