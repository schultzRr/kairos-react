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
  localStorage.setItem('kairos-hdr', JSON.stringify(headers));
  configHttpHeaders();
};

function unsetHttpHeaders(){
  localStorageService.cookie.remove('kairos-hdr');

  axios.defaults.headers.common['access-token'] = undefined;
  axios.defaults.headers.common['expiry'] = undefined;
  axios.defaults.headers.common['token-type'] = undefined;
  axios.defaults.headers.common['uid'] = undefined;
  axios.defaults.headers.common['client'] = undefined;
};

function login(email, password) {
  return axios.post('/users/sign_in', {
    user: {
      'email': email,
      'password': password
    }
  })
  .then(response => {
    session.setHttpHeaders(response.headers);
    return response;
  });
}

function signout() {
  return axios.get('/logout')
  .then(response => {
    return response;
  });
}

const session = {
  isHttpHeaders,
  getHttpHeaders,
  configHttpHeaders,
  setHttpHeaders,
  unsetHttpHeaders,
  login,
  signout
};

export default session;
