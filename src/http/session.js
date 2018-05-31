
function isAuthenticated() {
  return false;
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
  });
}

const session = {
  isAuthenticated,
  login
};

export default session;
