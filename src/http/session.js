let authenticated = false;

function isAuthenticated() {
  return authenticated;
}

function login(email, password) {
  return fetch('http://servicios.coderia.mx:8083/users/sign_in', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user: {
        'email': email,
        'password': password
      }
    }), 
  })
  .then(res => {
    if(res.ok) {
      authenticated = true;
      return res;
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  })
  .catch(console.error)
}

function signout() {
  authenticated = false;
}

export default {
 login,
 isAuthenticated 
};
