import React, { Component } from 'react';
import { Switch, Route , Link, Redirect, withRouter } from 'react-router-dom';

import LoginView from './views/login/loginView';
import Register from './views/register/registerView';
import Dashboard from './views/dashboard/dashboardview';

import Session from './http/sessionActions';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Session.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {

  render() {
    return(
      <div>
        <div className="menu">
          <ul>
            <li> <Link to="/login">Login</Link> </li>
            <li> <Link to="/register">Register</Link> </li>
            <li> <Link to="/dashboard">Dashboard</Link> </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect to="/login" />
        </Switch>
      </div>
    )
  }
}

export default App;