import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route , Link, Redirect, withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContainer: {
    flex: 1,
    flexGrow: 1,
  },
}

class App extends Component {

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <CssBaseline />
        <Navigation />
        <Grid container className={classes.mainContainer}>
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={this.props.isAuthenticated}/>
            <Redirect to="/login" />
          </Switch>
        </Grid>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.get('session').get('isAuthenticated'),
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)));
