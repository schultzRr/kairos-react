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
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * -2,
    textAlign: 'right',
  },
  linkContainer: {
    marginTop: theme.spacing.unit * 2
  },
  link: {
    color: theme.palette.secondary.main,
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(146, 201, 60, 0.08)',
      color: theme.palette.secondary.main,
    },
  },
  footerContainer: {
    padding: theme.spacing.unit * 1.5,
  },
  footerLink: {
    color: '#666',
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      color: '#666',
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
}

const selector = formValueSelector('login')

class LoginContainer extends Component {

  componentDidMount() {
    this.props.changeView({
      view: views.LOGIN_FORM_VIEW,
      title: 'Bienvenido'
    });
  }

  handleSubmit = (values) => {
    this.props.login(values);
  }

  handleResendConfirmation = () => {
    this.props.resendConfirmationEmail(this.props.email);
  }

  render() {
    const { classes, handleSubmit, loading, error, view, title, email } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="title" align="center" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.formContainer}>
            {{
              [views.LOGIN_FORM_VIEW]: (
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                  <div>
                    <Field
                      name="email"
                      component={TextField}
                      label="Correo electrónico"
                      margin="dense"
                    />
                  </div>
                  <div>
                    <PasswordField 
                      name="password"
                      label="Contraseña"
                      margin="dense"
                    />
                  </div>
                  <div className={classes.linkContainer}>
                    <Typography variant="body2" align="left">
                      <Link to="/forgot" className={classes.link}>¿Has olvidado tu contraseña?</Link>
                    </Typography>
                  </div>
                  <Typography variant="body1" className={classes.error}>
                    {error}
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                    >
                      <Grid item>
                        <LinkButton to="/register">
                          <Button color="secondary">
                            Crear cuenta
                          </Button>
                        </LinkButton>
                      </Grid>
                      <Grid item>
                        <LoaderButton loading={loading}>
                          <Button 
                            type="submit" 
                            variant="contained" 
                            color="secondary"
                            disabled={loading}
                          >
                            Iniciar sesión
                          </Button>
                        </LoaderButton>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              ),
              [views.CONFIRM_EMAIL_ERROR_VIEW]: (
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
                        color="secondary"
                        disabled={loading}
                        onClick={this.handleResendConfirmation}
                      >
                        Reenviar correo
                      </Button>
                    </LoaderButton>
                  </div>
                </React.Fragment>
              ),
              [views.CONFIRM_EMAIL_INTRUCTIONS_VIEW]: (
                <React.Fragment>
                  <Typography variant="body1" align="left">
                    En breve recibirás un correo electrónico en <span className={classes.bold}>{email}</span> con las instrucciones para activar tu cuenta.
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <LinkButton to="/login/refresh" >
                      <Button 
                        variant="contained" 
                        color="secondary"
                      >
                        Continuar
                      </Button>
                    </LinkButton>
                  </div>
                </React.Fragment>
              ),
            }[view]}
          </div>
          <div className={classes.footerContainer}>
            <Typography variant="body2" align="right">
              <a href="mailto:info@prana.mx" className={classes.footerLink}>Ayuda</a>
            </Typography>
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
    title: state.get('login').get('title'),
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
