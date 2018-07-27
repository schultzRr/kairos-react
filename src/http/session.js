import axios from 'axios';

function isHttpHeaders(){
  return (getHttpHeaders() ? true : false);
};

function getHttpHeaders(){
  return JSON.parse(localStorage.getItem('kairos-hdr'));
};

function configHttpHeaders(){
  var headers = getHttpHeaders();

  axios.defaults.headers.common['access-token'] = headers["access-token"];
  axios.defaults.headers.common['expiry'] = headers["expiry"];
  axios.defaults.headers.common['token-type'] = headers["token-type"];
  axios.defaults.headers.common['uid'] = headers["uid"];
  axios.defaults.headers.common['client'] = headers["client"];
};

function setHttpHeaders(headers){
  localStorage.setItem('kairos-hdr', JSON.stringify(headers));
  configHttpHeaders();
};

function unsetHttpHeaders(){
  localStorage.removeItem('kairos-hdr');

  axios.defaults.headers.common['access-token'] = undefined;
  axios.defaults.headers.common['expiry'] = undefined;
  axios.defaults.headers.common['token-type'] = undefined;
  axios.defaults.headers.common['uid'] = undefined;
  axios.defaults.headers.common['client'] = undefined;
};

function getCurrentSession() {
  return axios.get('/session');
}

function login(email, password) {
  return axios.post('/users/sign_in', {
    user: {
      'email': email,
      'password': password
    }
  })
  .then(response => {
    setHttpHeaders(response.headers);
    return response;
  });
}

function resendConfirmationEmail(user) {
  return axios.post('/auth/confirmation', { 
    user: user
  });
};

function register(user) {
  return axios.post('/users/sign_up', { 
    user: user
  });
};

function confirmRegistration(token) {
  return axios.get('/users/confirm', {
    params : {
      confirmation_token: token
    }
  });
};

function registerAddress(address){
  return axios.post('/shipping_addresses', { 
    shipping_address: address 
  });
};

function recoverPassword(email) {
  return axios.post('/users/password', {
    utf8: 'V',
    user: {
      'email': email,
    }
  });
}

function resetPassword(password, token) {
  return axios.put('/auth/password', {
    utf8: 'V',
    user: {
      reset_password_token: token,
      password: password,
      password_confirmation: password
    }
  });
}

function signout() {
  return axios.get('/logout')
  .then(response => {
    unsetHttpHeaders(response.headers);
    return response;
  });
}

function getIpInfo() {
  return axios.get('http://ipinfo.io', {})
  .then(response => {
    if(response.data){
      return response.data.city + ', ' + response.data.country;
    }
    return '';
  })
  .catch(e => {
    return '';
  });
}

const session = {
  isHttpHeaders,
  getHttpHeaders,
  configHttpHeaders,
  setHttpHeaders,
  unsetHttpHeaders,
  getCurrentSession,
  login,
  resendConfirmationEmail,
  register,
  confirmRegistration,
  registerAddress,
  recoverPassword,
  resetPassword,
  signout,
  getIpInfo
};

export default session;
