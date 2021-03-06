import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { toggleMenu } from './navigationActions';

import { 
  Hidden,
  AppBar,
  Grid,
  Toolbar,
  Button,
  IconButton,
  withStyles 
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 64,
    overflow: 'hidden',
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
    maxHeight: 80,
  },
  logo: {
    display: 'inline-block',
  },
  img: {
    height: 110,
    paddingBottom: 10,
  },
  menuButton: {
    margin: 0,
  },
  actionButton: {
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: '#27648C',
    },
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
        position="relative"
        elevation={0}
        className={classes.root}
      >
        <Grid container justify="center">
          <Grid item className={classes.main}>
            <Toolbar>
              <div className={classes.logoContainer}>
                <Link to="/" className={classes.logo}>
                  <img src="/images/logo-futura@2x.png" className={classes.img} alt="Logo Futura"/>
                </Link>
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
