import { fromJS, List } from 'immutable';
import {
  GET_DOWNLINES_DATA_FETCH,
  GET_DOWNLINES_DATA_SUCCESS,
  GET_DOWNLINES_DATA_ERROR,
  SEND_SUMMARY_DETAIL_FETCH,
  SEND_SUMMARY_DETAIL_SUCCESS,
  SEND_SUMMARY_DETAIL_ERROR,
  CLOSE_SUMMARY_NOTIFICATION,
  EXIT_SUMMARY_NOTIFICATION,
} from 'src/actions';

const initialState = fromJS({
  loading: false,
  error: '',
  data: [],
  loadingEmail: false,
  errorEmail: false,
  snackbarMessage: '',
  openSnackbar: false,
});

function downlinesReducer(state = initialState, action) {
  switch(action.type){
    case GET_DOWNLINES_DATA_FETCH:
      return state.merge({
        loading: true,
        error: initialState.get('error'),
        data: action.payload.level == 0 ? initialState.get('data') : state.get('data'),
      })
    case GET_DOWNLINES_DATA_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        data: state.get('data').concat(action.payload.downlines),
      })
    case GET_DOWNLINES_DATA_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case SEND_SUMMARY_DETAIL_FETCH:
      return state.merge({
        loadingEmail: true,
        errorEmail: initialState.get('errorEmail'),
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
        errorEmail: true,
        snackbarMessage: action.payload,
        openSnackbar: true,
      })
    case CLOSE_SUMMARY_NOTIFICATION:
      return state.merge({
        openSnackbar: initialState.get('openSnackbar'),
      })
    case EXIT_SUMMARY_NOTIFICATION:
      return state.merge({
        snackbarMessage: initialState.get('snackbarMessage'),
      })
    default:
      return state;
  }
}

export default downlinesReducer;
