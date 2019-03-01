import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CustomDialog from '../../common/customDialog';
import CheckoutAddressesList from './checkoutAddressList';
// import AddCheckoutAddressForm from './addCheckoutAddressForm';
import { getAddresses, updateActiveSection, openDialog, closeDialog } from './checkoutActions';
import { dialogs, sections } from './checkoutConstants';

const styles = theme => ({
  root: {
    height: 'auto',
  },
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
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  shippingAdress:{

  },
  payment: {

  },
  sectionTitleContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 16,
  },
  sectionTitle: {
    color: theme.palette.custom.mediumGrey,
  },
  activeSectionTitle: {
    color: 'black',
    '&:after': {
      backgroundColor: 'black',
      content: '""',
      display: 'block',
      height: 4,
      marginTop: 4,
      width: 50,
    }
  },
  sectionContent: {
    marginBottom: 16,
    marginLeft: 16,
  },
  anchor: {
    color: theme.palette.custom.mediumGrey,
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
  },
  noResultsText: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  buttonContainer: {
    marginLeft: -4,
    marginTop: 16,
  }
});

class Checkout extends Component {

  editShippingAddress = event => {
    event.preventDefault();
    this.props.updateActiveSection(sections.SHIPPING_ADDRESS_SECTION);
  }

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  handleDialogOpen = dialog => {
    this.props.openDialog(dialog);
  }

  componentDidMount() {
    this.props.getAddresses();
    this.props.updateActiveSection(sections.SHIPPING_ADDRESS_SECTION);
  }

  render() {
    const { classes, loading, dialog, open, activeSection } = this.props;
    const shippingAddress = this.props.shippingAddress ? this.props.shippingAddress.toJS() : undefined;

    console.log(dialog);

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <div className={classes.title}>
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Completar compra
            </Typography>
          </div>
          <Paper elevation={0} className={classes.paper}>
            <Divider />
            <section className={classes.shippingAdress}>
              <div className={classes.sectionTitleContainer}>
                <Typography 
                  variant="h6" 
                  className={classNames(
                    classes.sectionTitle,
                    activeSection == sections.SHIPPING_ADDRESS_SECTION ? classes.activeSectionTitle : undefined
                  )}
                >
                  1. Dirección de envío
                </Typography>
                <Typography variant="body2" align="right">
                  <a 
                    aria-label="Delete item"
                    className={classes.anchor}
                    href="#"
                    onClick={(event) => this.editShippingAddress(event)}
                  >
                    Cambiar
                  </a>
                </Typography>
              </div>
              <div className={classes.sectionContent}>
                { shippingAddress ? (
                  <div>
                    <Typography variant="body1">
                      {shippingAddress.address}
                    </Typography>
                    <Typography variant="body1">
                      {shippingAddress.city}, {shippingAddress.state}
                    </Typography>
                    <Typography variant="body1">
                      {shippingAddress.zip}
                    </Typography>
                    <Typography variant="body1">
                      {shippingAddress.country}
                    </Typography>
                  </div>
                ) : (
                  <Typography variant="body1" className={classes.noResultsText}>
                    Aun no cuentas con direcciones registradas
                  </Typography>
                )}
                <div className={classes.buttonContainer}>
                  <Button
                    color="primary"
                    onClick={() => this.handleDialogOpen(dialogs.ADD_ADDRESS_DIALOG)}
                  >
                    Agregar dirección
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.handleDialogOpen(dialogs.ADDRESS_PICKER_DIALOG)}
                  >
                    Cambiar dirección
                  </Button>
                </div>
              </div>
            </section>
            <Divider />
            <section className={classes.payment}>
              <div className={classes.sectionTitleContainer}>
                <Typography 
                  variant="h6" 
                  className={classNames(
                    classes.sectionTitle,
                    activeSection == sections.PAYMENT_METHOD_SECTION ? classes.activeSectionTitle : undefined
                  )}
                >
                  2. Método de pago
                </Typography>
              </div>
              <div className={classes.sectionContent}></div>
            </section>
            <Divider />
          </Paper>
          <CustomDialog 
            loading={loading} 
            open={open} 
            handleClose={this.handleDialogClose}
          >
            {{
              [dialogs.ADD_ADDRESS_DIALOG]: (
                <React.Fragment>
                  <div>Hola</div>
                  <CheckoutAddressesList />
                </React.Fragment>
              ),
              [dialogs.ADDRESS_PICKER_DIALOG]: (
                <div></div>
              ),
            }[dialog]}
          </CustomDialog>
        </Grid>
      </Grid>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('checkout').get('loading'),
    dialog: state.get('checkout').get('dialog'),
    open: state.get('checkout').get('openDialog'),
    activeSection: state.get('checkout').get('activeSection'),
    shippingAddress: state.get('checkout').get('selectedShippingAddress'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getAddresses }, dispatch),
    bindActionCreators({ updateActiveSection }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)));