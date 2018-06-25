import loginView from './views/login/loginViewReducer';
import login from './components/login/loginReducer';
import registerView from './views/register/registerViewReducer';
import register from './components/register/registerReducer';
import session from './http/sessionReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux-immutable';

const reducers = combineReducers({
  loginView,
  login,
  registerView,
  register,
  session,
  form: reduxFormReducer,
});

export default reducers;
