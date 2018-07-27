import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, formValueSelector, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PasswordField from '../common/passwordField';
import LoaderButton from '../common/loaderButton';
import LinkButton from '../common/linkButton';

import { login, resendConfirmationEmail } from '../../http/sessionActions';
import { changeView } from '../../components/login/loginActions';

import views from './loginConstants';

const styles = theme => ({
  mainContainer: {
    margin: theme.spacing.unit * 8 + 'px 0',
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  error: {
    color: 'red',
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  formContainer: {
    backgroundColor: 'white',
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 4 + 'px 15%',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
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
  bold: {
    fontWeight: 500,
  }
});

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Introduce una dirección de correo electrónico'
  }
  if (!values.password) {
    errors.password = 'Introduce la contraseña de tu cuenta'
  }
  return errors;
}

const form = {
  form: 'login',
  validate,
  initialValues: {
    email: 'rosas_schultz@hotmail.com',
    password: 'password'
  }
}

const selector = formValueSelector('login')

class LoginContainer extends Component {

  componentDidMount() {
    this.props.changeView(views.LOGIN_FORM_VIEW);
  }

  handleSubmit = (values) => {
    this.props.login(values);
  }

  handleResendConfirmation = () => {
    this.props.resendConfirmationEmail(this.props.email);
  }

  render() {
    const { classes, handleSubmit, loading, error, view, email } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="title" align="center" className={classes.title}>
            Bienvenido
          </Typography>
          <div className={classes.formContainer}>
            { view == views.LOGIN_FORM_VIEW && 
              <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div>
                  <Field
                    name="email"
                    component={TextField}
                    label="Correo electrónico"
                    margin="normal"
                  />
                </div>
                <div>
                  <PasswordField 
                    name="password"
                    label="Contraseña"
                    margin="normal"
                  />
                </div>
                <Typography variant="body1" className={classes.error}>
                  {error}
                </Typography>
                <div className={classes.buttonContainer}>
                  <LoaderButton loading={loading}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        color="secondary"
                        disabled={loading}
                      >
                        Iniciar sesión
                      </Button>
                  </LoaderButton>
                </div>
                <div className={classes.linkContainer}>
                  <Typography variant="body2">
                    <Link to="/forgot" className={classes.link}>¿Olvidaste tu contraseña?</Link>
                  </Typography>
                  <Typography variant="body2">
                    <Link to="/register" className={classes.link}>Crear una cuenta</Link>
                  </Typography>
                </div>
              </form>
            }
            { view == views.CONFIRM_EMAIL_ERROR_VIEW &&
              <React.Fragment>
                <Typography variant="body1" align="left" gutterBottom>
                  Anteriormente enviamos un correo a <span className={classes.bold}>{email}</span> con las instrucciones para activar tu cuenta.
                </Typography>
                <Typography variant="body1" align="left">
                  Si no lo recibiste podemos volver a enviarlo.
                </Typography>
                <Typography variant="body1" className={classes.error}>
                  {error}
                </Typography>
                <div className={classes.buttonContainer}>
                  <LoaderButton loading={loading}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        color="secondary"
                        disabled={loading}
                        onClick={this.handleResendConfirmation}
                      >
                        Reenviar correo
                      </Button>
                  </LoaderButton>
                </div>
              </React.Fragment>
            }
            { view == views.CONFIRM_EMAIL_INTRUCTIONS_VIEW &&
              <React.Fragment>
                <Typography variant="body1" align="left">
                  En breve recibirás un correo electrónico en <span className={classes.bold}>{email}</span> con las instrucciones para activar tu cuenta.
                </Typography>
                <div className={classes.buttonContainer}>
                  <LinkButton to="/login" text="Continuar" />
                </div>
              </React.Fragment>
            }
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('login').get('loading'),
    error: state.get('login').get('error'),
    view: state.get('login').get('view'),
    email: selector(state, 'email')
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ login }, dispatch),
    bindActionCreators({ resendConfirmationEmail }, dispatch),
    bindActionCreators({ changeView }, dispatch),
  );
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)));
