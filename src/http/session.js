
import axios from 'axios';

function isHttpHeaders(){
  return (getHttpHeaders() ? true : false);
};

function getHttpHeaders(){
  return JSON.parse(localStorage.getItem('kairos-hdr'));
};

function configHttpHeaders(){
  var headers = getHttpHeaders();

  axios.defaults.headers.common['access-token'] = headers.accessToken;
  axios.defaults.headers.common['expiry'] = headers.expiry;
  axios.defaults.headers.common['token-type'] = headers.tokenType;
  axios.defaults.headers.common['uid'] = headers.uid;
  axios.defaults.headers.common['client'] = headers.client;
};

function setHttpHeaders(headers){
  const tmpHeaders = {};
  headers.forEach(function(value, name) {
    tmpHeaders[name] = value;
  });
  localStorage.setItem('kairos-hdr', JSON.stringify(tmpHeaders));

  console.log(tmpHeaders);

  configHttpHeaders();
};

function unsetHttpHeaders(){
  localStorageService.cookie.remove('kairos-hdr');

  $http.defaults.headers.common['access-token'] = undefined;
  $http.defaults.headers.common['expiry'] = undefined;
  $http.defaults.headers.common['token-type'] = undefined;
  $http.defaults.headers.common['uid'] = undefined;
  $http.defaults.headers.common['client'] = undefined;
};

function login(email, password) {
  return axios.post('/users/sign_in', {
    user: {
      'email': email,
      'password': password
    }
  });

  // Actualizar los headers aquí, no en loginActions.js
}

const session = {
  isHttpHeaders,
  getHttpHeaders,
  configHttpHeaders,
  setHttpHeaders,
  unsetHttpHeaders,
  login
};

export default session;
