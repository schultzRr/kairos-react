import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from './navigationActions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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

  handleMenuClick = event => {
    this.props.toggleMenu();
  };

  render() {
    const { classes, isAuthenticated } = this.props;

    return (
      <AppBar 
        position="absolute" 
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <div className={classes.logoContainer}>
            <a href="/" className={classes.logo}>
              <img src="/images/logo-white@2x.png" className={classes.img} alt="Logo Prana"/>
            </a>
          </div>
          {isAuthenticated && (
            <div>
              <IconButton
                aria-label="Menu"
                onClick={this.handleMenuClick}
                className={classes.menuButton}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
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
