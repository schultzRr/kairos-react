import navigation from './components/navigation/navigationReducer';
import loginView from './views/login/loginViewReducer';
import login from './components/login/loginReducer';
import registerView from './views/register/registerViewReducer';
import register from './components/register/registerReducer';
import forgotView from './views/forgot/forgotViewReducer';
import forgot from './components/forgot/forgotReducer';
import session from './http/sessionReducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';

const reducers = combineReducers({
  navigation,
  loginView,
  login,
  registerView,
  register,
  forgotView,
  forgot,
  session,
  form: reduxFormReducer,
});

export default reducers;
