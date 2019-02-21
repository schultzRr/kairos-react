import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { closeProductDialog, updateProductVariant } from './productsActions';
import { Typography } from '@material-ui/core';


const styles = theme => ({
  overlay: {
    background: '#fafafa',
    bottom: 0,
    left: 0,
    opacity: '0.5',
    outline: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  leftColumn: {
    borderRight: '1px solid #ddd',
  },
  leftColumnContent: {
    textAlign: 'center',
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  menu: {
    width: 200,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProductDialog extends React.Component {

  handleClose = () => {
    this.props.closeProductDialog();
  }

  handleVariantChange = event => {
    this.props.updateProductVariant(event.target.value);
  };

  handleAddToCart = () => {
    console.log('addToCart');
  }

  render() {
    const { classes, loading, open, fullScreen } = this.props;
    const product = this.props.product ? this.props.product.toJS() : undefined;
    const variants = product ? product.variants : undefined;
    const selectedVariant = this.props.selectedVariant ? this.props.selectedVariant.toJS() : undefined;
    const selectedVariantId = selectedVariant ? selectedVariant.id : 0;

    return (
      <React.Fragment>
        { product && (
          <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            disableRestoreFocus={true}
          >
            <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <Grid container 
              justify="center"
            >
              <Grid item xs={12} md={6} className={classes.leftColumn}>
                <div className={classes.leftColumnContent}>
                  <img src={product.picture} className={classes.picture}></img>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $ {variants.length ? selectedVariant.price : product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {product.description}
                </Typography>
                { variants.length > 0 && (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Tamaño"
                    value={selectedVariantId}
                    onChange={this.handleVariantChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    {variants.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <Button 
                  variant="contained"
                  color="primary"
                >
                  Agregar al carrito
                </Button>
              </Grid>
            </Grid>
          </Dialog>
        )}
      </React.Fragment>
      
    );
  }
}

ProductDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    open: state.get('products').get('openDialog'),
    product: state.get('products').get('selectedProduct'),
    selectedVariant: state.get('products').get('selectedVariant'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ closeProductDialog }, dispatch),
    bindActionCreators({ updateProductVariant }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDialog)));