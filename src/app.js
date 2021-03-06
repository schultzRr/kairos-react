import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { CssBaseline, withStyles } from '@material-ui/core';

import session from 'http/session';
import { getCurrentSession } from 'http/sessionActions';
import PrivateRoute from 'src/privateRoute';
import LoginView from 'views/login/loginView';
import RegisterView from 'views/register/registerView';
import ForgotView from 'views/forgot/forgotView';
import MembersView from 'views/members/membersView';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
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
        this.setState({ validatedSession: true });
        return response;
      });
    } else {
      this.setState({ validatedSession: true });
    }
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        {this.state.validatedSession && 
          <>
            <CssBaseline />
            <Switch>
              <Route exact path="/login" component={LoginView} />
              <Route path="/forgot" component={ForgotView} />
              <PrivateRoute path="/members" component={MembersView}/>
              <Redirect to="/login" />
            </Switch>
          </>
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
    bindActionCreators({ getCurrentSession }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)));
