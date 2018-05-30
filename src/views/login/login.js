import React, { Component } from 'react';
import Login from '../../components/login/login';
import { Redirect } from 'react-router-dom';

import Session from '../../http/session';

class LoginView extends Component {

  state = {
    redirectToReferrer: false
  };

  login = (values, event, formApi) => {
    Session.login(values.email, values.password)
    .then(res => {
      console.log(res);
      this.setState({ redirectToReferrer: true });
    });
    
  }

  componentWillMount() {
    if (Session.isAuthenticated()) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    const redirectToReferrer = this.state.redirectToReferrer;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <Login handleLogin={this.login}/>
    )
  }
}

export default LoginView;