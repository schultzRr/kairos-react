import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import PrivateTemplate from 'templates/privateTemplate';
import Dashboard from 'components/dashboard/dashboard';
import ProfileView from './profileView';

class MembersView extends Component {

  render() {

    return (
      <PrivateTemplate>
        <Switch>
          <Route exact path="/members">
            <Dashboard />
          </Route>
          <Route exact path="/members/profile">
            <ProfileView />
          </Route>
          <Redirect to="/members" />
        </Switch>
      </PrivateTemplate>
    )
  }
 
}

export default withRouter(MembersView);