import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RecoverPasswordForm from './recoverPasswordForm';
import ResetPasswordForm from './resetPasswordForm';

import { recoverPassword, resetPassword } from '../../http/sessionActions';

const styles = theme => ({
  mainContainer: {
    margin: theme.spacing.unit * 8 + 'px 0',
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  formContainer: {
    backgroundColor: 'white',
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 4 + 'px 15%',
    textAlign: 'center',
  },
});

class ForgotContainer extends Component {
  state = {
    view: 'recoverPasswordForm',
  }

  componentDidMount() {
    if(this.props.token){
      this.setState({ view: 'resetPassword' });
    }
  }

  handleRecoverPassword = (values) => {
    this.props.recoverPassword(values)
    .then(response => {
      this.setState({ view: 'recoverPasswordInstructions' });
    });
  }

  handleResetPassword = (values) => {
    this.props.resetPassword(values, this.props.token)
    .then(response => {
      console.log(response);
    });
  }

  render() {
    const { classes } = this.props;
    const { view } = this.state;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="title" align="center" className={classes.title}>
            Recuperar contraseña
          </Typography>
          <div className={classes.formContainer}>
            { view == 'recoverPasswordForm' &&
              <RecoverPasswordForm onSubmit={this.handleRecoverPassword} />
            }
            { view == 'recoverPasswordInstructions' &&
              <Typography variant="body1" align="left">
                Se ha enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para poder recuperar tu contraseña.
              </Typography>
            }
            { view == 'resetPassword' &&
              <ResetPasswordForm onSubmit={this.handleResetPassword} />
            }
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ recoverPassword }, dispatch),
    bindActionCreators({ resetPassword }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotContainer));
