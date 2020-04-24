import navigation from 'components/navigation/navigationReducer';
import loginView from 'views/login/loginViewReducer';
import login from 'components/login/loginReducer';
import register from 'components/register/registerReducer';
import forgot from 'components/forgot/forgotReducer';
import session from 'http/sessionReducer';
import dashboard from 'components/dashboard/dashboardReducer';
import downlines from 'components/downlines/downlinesReducer';
import account from 'components/account/accountReducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';

const reducers = combineReducers({
  navigation,
  loginView,
  login,
  register,
  forgot,
  session,
  dashboard,
  downlines,
  account,
  form: reduxFormReducer,
});

export default reducers;
