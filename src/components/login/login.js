import React from 'react';
import LoginContainer from './loginContainer';

function Login(props) {
  return (
    <div>
      <LoginContainer handleLogin={props.handleLogin}/>
    </div>
  )
}

export default Login;