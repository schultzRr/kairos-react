import { createStore, combineReducers } from 'redux';
import reducers from './reducers';

const combinedReducers = combineReducers(reducers);

const store = createStore(
  combinedReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;