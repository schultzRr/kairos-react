import { fromJS, List } from 'immutable';
import {
  GET_DOWNLINES_DATA_FETCH,
  GET_DOWNLINES_DATA_SUCCESS,
  GET_DOWNLINES_DATA_ERROR,
  SHOW_DOWNLINES_TABLE_LOADER,
} from 'src/actions';

const initialState = fromJS({
  loading: false,
  error: '',
  data: [],
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
    case SHOW_DOWNLINES_TABLE_LOADER:
      return state.merge({
        loading: true,
      })
    default:
      return state;
  }
}

export default downlinesReducer;
