import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ButtonLoader from '../common/buttonLoader';
import Snackbar from '../notification/snackbar';

import { recoverPassword } from '../../http/sessionActions';
import forgotActions from './forgotActions';

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
  linkContainer: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    color: 'black',
    display: 'inline-block',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
});

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Escribe una dirección de correo electrónico'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'No es un correo electrónico válido'
  }
  return errors;
}

const form = {
  form: 'forgot',
  validate
}


class ForgotContainer extends Component {

  handleSnackbarClose = (event, reason) => {
    this.props.hideNotification();
  };

  handleSnackbarExit = (event, reason) => {
    this.props.resetNotification();
  };

  handleSubmit = (values) => {
    this.props.recoverPassword(values);
  }

  render() {
    const { classes, handleSubmit, loading, message, notification, type } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="title" align="center" className={classes.title}>
            Recuperar contraseña
          </Typography>
          <div className={classes.formContainer}>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <div>
                <Typography variant="body1">
                  Proporciona tu correo electrónico registrado
                </Typography>
              </div>
              <div>
                <Field
                  name="email"
                  component={TextField}
                  label="Correo electrónico"
                  margin="normal"
                />
              </div>
              <div>
                <ButtonLoader loading={loading}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    color="secondary"
                    disabled={loading}
                  >
                    Recuperar
                  </Button>
                </ButtonLoader>
              </div>
              <div className={classes.linkContainer}>
                <Typography variant="body2">
                  <Link to="/login" className={classes.link}>Iniciar sesión</Link>
                </Typography>
              </div>
            </form>
          </div>
        </Grid>
        <Snackbar 
          message={message}
          open={notification}
          type={type}
          handleClose={this.handleSnackbarClose} 
          handleExited={this.handleSnackbarExit}
        />
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('forgot').get('loading'),
    message: state.get('forgot').get('message'),
    notification: state.get('forgot').get('notification'),
    type: state.get('forgot').get('type'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ recoverPassword }, dispatch),
    bindActionCreators(forgotActions, dispatch),
  );
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotContainer)));
