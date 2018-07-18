import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Forgot from '../../components/forgot/forgot';

class ForgotView extends Component {
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <Forgot/>
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
