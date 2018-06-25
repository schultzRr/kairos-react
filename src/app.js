import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import session from '../src/http/session';
import sessionActions from '../src/http/sessionActions';

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

  state = {
    validatedSession: false
  }

  componentDidMount() {
    if(session.isHttpHeaders()){
      session.configHttpHeaders();
      this.props.getCurrentSession()
      .then(response => {
        this.setState({validatedSession: true});
        return response;
      });
    } else {
      this.setState({validatedSession: true});
    }
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        {this.state.validatedSession && 
          <React.Fragment>
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
          </React.Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(sessionActions, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)));
