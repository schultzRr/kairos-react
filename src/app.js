import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LoginView from './views/login/loginView';
import RegisterView from './views/register/registerView';
import DashboardView from './views/dashboard/dashboardView';

import Navigation from './components/navigation/navigation';
import Footer from './components/footer/footer';

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

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <CssBaseline />
        <Navigation />
        <Grid container className={classes.mainContainer}>
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route path="/register" component={RegisterView} />
            <PrivateRoute path="/dashboard" component={DashboardView}/>
            <Redirect to="/login" />
          </Switch>
        </Grid>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(App));