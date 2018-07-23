import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Forgot from '../../components/forgot/forgot';

class ForgotView extends Component {
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    const params = queryString.parse(this.props.location.search);

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Forgot token={params.reset_password_token}/>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    redirectToReferrer: state.get('forgotView').get('redirectToReferrer'),
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotView);
