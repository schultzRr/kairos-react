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

function signout() {
  return axios.get('/logout')
  .then(response => {
    unsetHttpHeaders(response.headers);
    return response;
  });
}

function getCurrentSession() {
  return axios.get('/session');
}

const session = {
  isHttpHeaders,
  getHttpHeaders,
  configHttpHeaders,
  setHttpHeaders,
  unsetHttpHeaders,
  login,
  signout,
  getCurrentSession
};

export default session;
