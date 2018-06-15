import React, { Component } from 'react';
import { Switch, Route , Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './views/login/loginView';
import Register from './views/register/registerView';
import Dashboard from './views/dashboard/dashboardview';

import Navigation from './components/navigation/navigation';
import Footer from './components/footer/footer';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.isAuthenticated ? (
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
      
    }
  />
);

class App extends Component {

  render() {
    return(
      <React.Fragment>
        <CssBaseline />
        <Navigation />
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
          <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={this.props.isAuthenticated}/>
          <Redirect to="/login" />
        </Switch>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.session.isAuthenticated,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));