import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from './navigationActions';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import LinkButton from '../common/linkButton';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    zIndex: theme.zIndex.drawer + 1,
  },
  main: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%',
    },
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    display: 'inline-block',
  },
  img: {
    height: 40,
  },
  menuButton: {
    margin: 0,
  },
});

class Navigation extends Component {

  toggleMenu = event => {
    this.props.toggleMenu();
  };

  render() {
    const { classes, isAuthenticated } = this.props;

    return (
      <AppBar 
        position="absolute" 
        elevation={1}
        className={classes.root}
      >
        <Grid container justify="center">
          <Grid item className={classes.main}>
            <Toolbar>
              <div className={classes.logoContainer}>
                <a href="/" className={classes.logo}>
                  <img src="/images/logo@2x.png" className={classes.img} alt="Logo Prana"/>
                </a>
              </div>
              <Hidden mdUp>
                {isAuthenticated && (
                  <div>
                    <IconButton
                      aria-label="Menu"
                      onClick={this.toggleMenu}
                      className={classes.menuButton}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                  </div>
                )}
              </Hidden>
              { !isAuthenticated && (
                <LinkButton to="/login">
                  <Button 
                    variant="contained" 
                    color="primary"
                  >
                    Iniciar sesión
                  </Button>
                </LinkButton>
              )}
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.get('session').get('isAuthenticated'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ toggleMenu }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation));
