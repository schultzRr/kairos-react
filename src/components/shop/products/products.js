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
  container: {
    padding: `${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
    },
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 0,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
  },
  product: {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 4,
    boxShadow: '0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1)',
  },
  pictureContainer: {
    maxWidth: '100%',
    padding: 8,
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  info: {
    borderTop: '1px solid rgba(51,51,51,.1)',
    padding: 16,
  }
});

class Products extends Component {

  componentDidMount() {
    this.props.getProductsMock();
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;

    return (
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Productos
        </Typography>
        <Grid container 
          justify="flex-start"
          spacing={16}
        >
          { products.map(item => {
            return(
              <Grid item key={item.id} xs={12} md={4}>
                <div className={classes.product}>
                  <div className={classes.picture}>
                    <img src={item.picture} className={classes.picture}></img>
                  </div>
                  <div className={classes.info}>
                      <Typography variant="h5" className={classes.price}>
                        $ {item.price}
                      </Typography>
                    <Typography variant="body1" className={classes.title}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                      {item.description}
                    </Typography>
                    <div className={classes.actions}></div>
                  </div>
                </div>
                {item.name}
              </Grid>
            )
          })}
          
        </Grid>
      </div>
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