import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { getProducts, getProductsMock } from './productsActions';

const styles = theme => ({

});

class Products extends Component {

  componentDidMount() {
    this.props.getProductsMock();
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;

    return (
      <Grid container 
        justify="center"
      >
        <Grid item xs={12} xl={9}>
          Productos
        </Grid>
      </Grid>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    products: state.get('products').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getProducts }, dispatch),
    bindActionCreators({ getProductsMock }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)));