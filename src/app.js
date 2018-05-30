import React, { Component } from 'react';
import { Switch, Route , Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { onChangeLoadingView } from './views/login/loginActions';
import Login from './views/login/login';
import Register from './views/register/register';
import Dashboard from './views/dashboard/dashboard';

import Session from './http/session';

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

class AppBase extends Component {
  componentWillMount() {
    const { changeView } = this.props;
    changeView();
  }

  render() {
    const { loadingView } = this.props; 
    if (loadingView) {
      return (<div>ME ESTOY CARGANDO!!</div>);
    }

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
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect to="/login" />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loadingView: state.loginViewReducer.loadingView,
    isAuth: state.loginViewReducer.isAuth,
    error: state.loginViewReducer.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeView: () => {
      dispatch(onChangeLoadingView());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBase);
