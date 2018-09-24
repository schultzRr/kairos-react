import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddAddress from './addAddress';
import EditAddress from './editAddress';
import DeleteAddress from './deleteAddress';

import { getAddresses, deleteAddress } from './addressActions';

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
    border: `1px solid ${theme.palette.custom.lightGrey}`,
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
});

class Addresses extends Component {

  handleDelete = id => {
    this.props.deleteAddress(id);
  }

  componentDidMount() {
    this.props.getAddresses();
  }

  render() {
    const { classes } = this.props;
    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : [];

    return (
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.paperTitleContainer}>
          <Typography variant="subheading" className={classes.paperTitle}>
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
                              <EditAddress address={item}/>
                              <DeleteAddress address={item}/>
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
                <AddAddress />
              </React.Fragment>
            ) : (
              <div className={classes.loaderContainer}>
                <CircularProgress className={classes.progress} />
              </div>
            )
          }
      </Paper>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    addresses: state.get('address').get('addresses'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getAddresses }, dispatch),
    bindActionCreators({ deleteAddress }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Addresses)));