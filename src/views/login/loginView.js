import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../../components/login/login';

class LoginView extends Component {
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <Login/>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    redirectToReferrer: state.loginView.redirectToReferrer,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);