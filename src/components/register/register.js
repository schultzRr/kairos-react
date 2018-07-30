import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RegisterAccountForm from './registerAccountForm';
import RegisterMemberForm from './registerMemberForm';
import LinkButton from '../common/linkButton';

import { register, confirmRegistration } from '../../http/sessionActions';
import { changeView } from '../../components/register/registerActions';

import views from './registerConstants';

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
});

class RegisterContainer extends Component {

  componentDidMount() {
    if(this.props.token){
      this.props.confirmRegistration(this.props.token);
    } else {
      this.props.changeView({
        view: views.REGISTER_STEP_1_VIEW,
        title: 'Crear cuenta',
      });
    }
  }

  handleContinue = () => {
    this.props.changeView({
      view: views.REGISTER_STEP_2_VIEW,
      title: 'Crear cuenta',
    });
  }

  handleSubmit = (values) => {
    this.props.register(values);
  }

  render() {
    const { classes, loading, error, view, title } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="title" align="center" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.formContainer}>
            { view == views.REGISTER_STEP_1_VIEW &&
              <React.Fragment>
                <RegisterAccountForm onSubmit={this.handleContinue} formError={error} />
                <div className={classes.linkContainer}>
                  <Typography variant="body2">
                    <Link to="/login" className={classes.link}>¿Ya tienes una cuenta?</Link>
                  </Typography>
                  <Typography variant="body2">
                    <a href="mailto:info@prana.mx" className={classes.link}>¿Tienes algún problema?</a>
                  </Typography>
                </div>
              </React.Fragment>
            }
            { view == views.REGISTER_STEP_2_VIEW &&
              <React.Fragment>
                <RegisterMemberForm onSubmit={this.handleSubmit} loading={loading} formError={error} />
                <div className={classes.linkContainer}>
                  <Typography variant="body2">
                    <Link to="/login" className={classes.link}>¿Ya tienes una cuenta?</Link>
                  </Typography>
                  <Typography variant="body2">
                    <a href="mailto:info@prana.mx" className={classes.link}>¿Tienes algún problema?</a>
                  </Typography>
                </div>
              </React.Fragment>
            }
            { view == views.REGISTER_INSTRUCTIONS_VIEW &&
              <React.Fragment>
                <Typography variant="body1" align="left">
                  Hemos enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para confirmar tu correo electrónico y activar tu cuenta.
                </Typography>
                <div className={classes.buttonContainer}>
                  <LinkButton to="/login" text="Continuar" />
                </div>
              </React.Fragment>
            }
            { view == views.REGISTER_CONFIRMATION_VIEW &&
              <React.Fragment>
                <Typography variant="body1" align="left">
                  ¡Gracias por confirmar tu dirección de correo! Ya puedes iniciar sesión.
                </Typography>
                <div className={classes.buttonContainer}>
                  <LinkButton to="/login" text="Continuar" />
                </div>
              </React.Fragment>
            }
            { view == views.REGISTER_CONFIRMATION_ERROR_VIEW &&
              <React.Fragment>
                <Typography variant="body1" align="left">
                  Hubo un error al confirmar tu dirección de correo
                </Typography>
                <div className={classes.linkContainer}>
                  <Typography variant="body2">
                    <a href="mailto:info@prana.mx" className={classes.link}>¿Tienes algún problema?</a>
                  </Typography>
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
    loading: state.get('register').get('loading'),
    error: state.get('register').get('error'),
    view: state.get('register').get('view'),
    title: state.get('register').get('title'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ register }, dispatch),
    bindActionCreators({ confirmRegistration }, dispatch),
    bindActionCreators({ changeView }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer));
