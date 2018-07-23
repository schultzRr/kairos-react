import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RegisterAccountForm from './registerAccountForm';
import RegisterMemberForm from './registerMemberForm';

import { register } from '../../http/sessionActions';

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

class RegisterContainer extends Component {

  state = {
    page: 1,
  };

  handleContinue = () => {
    this.setState({ page: this.state.page + 1 })
  }

  handleSubmit = (values) => {
    this.props.register(values);
  }

  render() {
    const { classes, loading, error } = this.props;
    const { page } = this.state;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="title" align="center" className={classes.title}>
            Crear cuenta
          </Typography>
          <div className={classes.formContainer}>
            {page === 1 && <RegisterAccountForm onSubmit={this.handleContinue} formError={error} />}
            {page === 2 && <RegisterMemberForm onSubmit={this.handleSubmit} loading={loading} formError={error} />}
            <div className={classes.linkContainer}>
              <Typography variant="body2">
                <Link to="/login" className={classes.link}>¿Ya tienes una cuenta?</Link>
              </Typography>
              <Typography variant="body2">
                <a href="mailto:info@prana.mx" className={classes.link}>¿Tienes algún problema?</a>
              </Typography>
            </div>
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
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ register }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer));
