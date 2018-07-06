import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import colors from '../../styles/colors';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RegisterUserForm from './registerUserForm';
import RegisterAddressForm from './registerAddressForm';

import ErrorSnackbar from '../error/errorSnackbar';

import { register } from '../../http/sessionActions';
import registerActions from './registerActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 4 + 'px 0' ,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  linkContainer: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    color: 'black',
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      color: colors.green,
    },
  },
});

class RegisterContainer extends Component {

  state = {
    page: 1,
  };

  handleSnackClose = (event, reason) => {
    this.props.hideError();
  };

  handleSnackExit = (event, reason) => {
    this.props.resetError();
  };

  handleContinue = () => {
    this.setState({page: this.state.page + 1})
  }

  handleSubmit = (values) => {
    this.props.register(values);
  }

  render() {
    const { classes, loading, error, displayError } = this.props;
    const { page } = this.state;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4}>
          <Paper className={classes.paper}>
          {page === 1 && <RegisterUserForm onSubmit={this.handleContinue} />}
          {page === 2 && <RegisterAddressForm onSubmit={this.handleSubmit} loading={loading} />}
          <div className={classes.linkContainer}>
            <Typography variant="body2">
              <Link to="/login" className={classes.link}>¿Ya tienes una cuenta registrada?</Link>
            </Typography>
            <Typography variant="body2">
              <a href="mailto:info@prana.mx" className={classes.link}>¿Tienes algún problema?</a>
            </Typography>
          </div>
          </Paper>
        </Grid>
        <ErrorSnackbar 
          error={error}
          displayError={displayError}
          handleClose={this.handleSnackClose} 
          handleExited={this.handleSnackExit}
        />
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('register').get('loading'),
    error: state.get('register').get('error'),
    displayError: state.get('register').get('displayError'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ register }, dispatch),
    bindActionCreators(registerActions, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer));
