import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Register from '../../components/register/register';

class RegisterView extends Component {
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <Register/>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    redirectToReferrer: state.registerView.redirectToReferrer,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView);