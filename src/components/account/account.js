import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  withStyles 
} from '@material-ui/core';

import DialogWrapper from 'library/components/DialogWrapper';
import ChangeNameForm from './changeNameForm';
import ChangePhoneForm from './changePhoneForm';
import ChangePasswordForm from './changePasswordForm';
import { openDialog, closeDialog } from './accountActions';
import { dialogs } from './accountConstants';


const styles = theme => ({
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 6),
    },
  },
  paperTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperTitle: {
    marginBottom: theme.spacing(3),
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    '&:first-child': {
      marginTop: 0,
    }
  },
  data: {
    color: 'rgba(0, 0, 0, 0.54)',
  }
});

class Account extends Component {

  handleDialogOpen = dialog => {
    this.props.openDialog(dialog);
  }

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  render() {
    const { classes, name, lastname, phone, dialog, loading, open } = this.props;

    return (
      <>
        <Paper elevation={0} className={classes.paper}>
          <div className={classes.paperTitleContainer}>
            <Typography variant="h6" className={classes.paperTitle}>
              Datos personales
            </Typography>
          </div>
          <div className={classes.dataContainer}>
            <div>
              <Typography variant="body2">
                Nombre:
              </Typography>
              <Typography variant="body2" className={classes.data}>
                {name} {lastname}
              </Typography>
            </div>
            <Button
              size="small"
              color="primary"
              onClick={() => this.handleDialogOpen(dialogs.NAME_DIALOG)}
            >
              Editar
            </Button>
          </div>
          <Divider />
          <div className={classes.dataContainer}>
            <div>
              <Typography variant="body2">
                Teléfono:
              </Typography>
              <Typography variant="body2" className={classes.data}>
                {phone}
              </Typography>
            </div>
            <Button
              size="small"
              color="primary"
              onClick={() => this.handleDialogOpen(dialogs.PHONE_DIALOG)}
            >
              Editar
            </Button>
          </div>
          <Divider />
          <div className={classes.dataContainer}>
            <div>
              <Typography variant="body2">
                Contraseña:
              </Typography>
              <Typography variant="body1" className={classes.data}>
                ********
              </Typography>
            </div>
            <Button
              size="small"
              color="primary"
              onClick={() => this.handleDialogOpen(dialogs.PASSWORD_DIALOG)}
            >
              Editar
            </Button>
          </div>
        </Paper>
        <DialogWrapper 
          loading={loading} 
          open={open} 
          handleClose={this.handleDialogClose}>
          {{
            [dialogs.NAME_DIALOG]: (
              <ChangeNameForm handleClose={this.handleDialogClose}/>
            ),
            [dialogs.PHONE_DIALOG]: (
              <ChangePhoneForm handleClose={this.handleDialogClose}/>
            ),
            [dialogs.PASSWORD_DIALOG]: (
              <ChangePasswordForm handleClose={this.handleDialogClose}/>
            ),
          }[dialog]}
        </DialogWrapper>
      </>
    )
  } 
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    name: state.get('session').get('name'),
    lastname: state.get('session').get('lastname'),
    phone: state.get('session').get('phone'),
    dialog: state.get('account').get('dialog'),
    loading: state.get('account').get('loading'),
    open: state.get('account').get('openDialog'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)));