import loginView from './views/login/loginViewReducer';
import login from './components/login/loginReducer';
import session from './http/sessionReducer';

const reducers = {
  loginView,
  login,
  session
};

export default reducers;
