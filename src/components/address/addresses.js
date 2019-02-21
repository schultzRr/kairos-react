import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import CustomDialog from '../common/customDialog';
import EditAddressForm from './editAddressForm';
import AddAddressForm from './addAddressForm';
import DeleteAddress from './deleteAddress';
import { getAddresses, openDialog, closeDialog } from './addressActions';
import { dialogs } from './addressConstants';

const styles = theme => ({
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  paperTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
  loaderContainer: {
    textAlign: 'center',
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `${theme.spacing.unit * 2}px 0`,
    '&:first-child': {
      marginTop: 0,
    }
  },
  data: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  delete: {
    color: theme.palette.custom.red,
    '&:hover': {
      backgroundColor: 'rgba(255, 90, 95, 0.08)',
    },
  },
  addAddressContainer: {
    marginTop: theme.spacing.unit * 4,
    textAlign: 'right',
  },
});

class Addresses extends Component {

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  handleDialogOpen = (dialog, id) => {
    this.props.openDialog(dialog, id);
  }

  componentDidMount() {
    this.props.getAddresses();
  }

  render() {    
    const { classes, loading, dialog, open, selectedAddressId } = this.props;

    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : [];

    return (
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.paperTitleContainer}>
          <Typography variant="h6" className={classes.paperTitle}>
            Direcciones
          </Typography>
        </div> 
          {
            addresses ? (
              <React.Fragment>
                {
                  addressesIdArray.length ? (
                    addressesIdArray.map((id, index) => {
                      const item = addresses[id];
                      return(
                        <React.Fragment key={item.id}>
                          <div className={classes.dataContainer}>
                            <div>
                              <Typography variant="body2">
                                {item.address}
                              </Typography>
                              <Typography variant="body1" className={classes.data}>
                                {item.city}, {item.state}
                              </Typography>
                              <Typography variant="body1" className={classes.data}>
                                {item.zip}
                              </Typography>
                              <Typography variant="body1" className={classes.data}>
                                {item.country}
                              </Typography>
                            </div>
                            <div>
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => this.handleDialogOpen(dialogs.EDIT_ADDRESS_DIALOG, id)}
                              >
                                Editar
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => this.handleDialogOpen(dialogs.DELETE_ADDRESS_DIALOG, id)}
                                className={classes.delete}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                          { index != (addressesIdArray.length - 1) && (
                            <Divider />
                          )}
                        </React.Fragment>
                      )
                    })
                  ) : (
                    <Typography variant="body1" className={classes.data}>
                      Aun no cuentas con direcciones registradas
                    </Typography>
                  ) 
                }
                <CustomDialog 
                  loading={loading} 
                  open={open} 
                  handleClose={this.handleDialogClose} 
                  disableFullScreen={dialog == dialogs.DELETE_ADDRESS_DIALOG}>
                  {{
                    [dialogs.ADD_ADDRESS_DIALOG]: (
                      <AddAddressForm handleClose={this.handleDialogClose} />
                    ),
                    [dialogs.EDIT_ADDRESS_DIALOG]: (
                      <EditAddressForm handleClose={this.handleDialogClose} address={addresses[selectedAddressId]} />
                    ),
                    [dialogs.DELETE_ADDRESS_DIALOG]: (
                      <DeleteAddress handleClose={this.handleDialogClose} />
                    ),
                  }[dialog]}
                </CustomDialog>
              </React.Fragment>
            ) : (
              <div className={classes.loaderContainer}>
                <CircularProgress className={classes.progress} />
              </div>
            )
          }
        <div className={classes.addAddressContainer}>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleDialogOpen(dialogs.ADD_ADDRESS_DIALOG)}
          >
            Agregar dirección
          </Button>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('address').get('loading'),
    dialog: state.get('address').get('dialog'),
    open: state.get('address').get('openDialog'),
    selectedAddressId: state.get('address').get('selectedAddressId'),
    addresses: state.get('address').get('addresses'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getAddresses }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Addresses)));