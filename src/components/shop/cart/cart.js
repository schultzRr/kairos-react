import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
});

class Cart extends Component {

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;
    const productsIdArray = this.props.products ? Object.keys(products) : null;

    return (
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Carrito
        </Typography>
      </div>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    products: state.get('cart').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)));