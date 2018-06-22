import loginView from './views/login/loginViewReducer';
import login from './components/login/loginReducer';
import registerView from './views/register/registerViewReducer';
import register from './components/register/registerReducer';
import session from './http/sessionReducer';

const reducers = {
  loginView,
  login,
  registerView,
  register,
  session
};

export default reducers;
