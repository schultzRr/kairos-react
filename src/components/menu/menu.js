import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { toggleMenu } from '../navigation/navigationActions';
import { signout } from '../../http/sessionActions';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/ListOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined';
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.custom.lightGrey,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    width: 280,
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    paddingRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  profileText: {
    color: 'black',
  },
  editIcon: {
    color: 'black',
    marginLeft: 'auto',
  },
  terms: {
    marginTop: 'auto',
  },
  termsText: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  }
});

const menu = [
  {
    id: 0,
    label: 'Resumen',
    icon: <ListIcon />,
    route: '/members',
  },
  {
    id: 1,
    label: 'Mis datos',
    icon: <PersonIcon />,
    route: '/members/account',
  },
  {
    id: 2,
    label: 'Mis compras',
    icon: <CreditCardIcon />,
    route: '/members/orders',
  },
  {
    id: 3,
    label: 'Preguntas frecuentes',
    icon: <HelpIcon />,
    route: '/members/faq',
  }, 
]

class Menu extends Component {
  state = {
    selectedMenuIndex: undefined
  }

  toggleMenu = () => {
    this.props.toggleMenu();
  }

  handleMenuItemClick = route => {
    this.setState({ selectedMenu : route });
    this.props.history.push(route);
  }

  handleSignoutClick = () => {
    this.props.signout();
  }

  componentDidMount() {
    const { location } = this.props;
    this.setState({ selectedMenu: location.pathname});
  }
  
  render() {
    const { classes, mobileOpen } = this.props;

    const drawer = (
      <div className={classes.root}>
        <div>
          <div className={classes.profile}>
            <Typography variant="body2" className={classes.profileText}>
              Ricardo Rosas
            </Typography>
            <Typography variant="body1" noWrap className={classes.profileText}>
              rosas_schultz@hotmail.com
            </Typography>
          </div>
          <Divider />
          <List>
            { menu.map(item => {
              return(
                <MenuItem 
                  button 
                  selected={this.state.selectedMenu == item.route}
                  onClick={() => this.handleMenuItemClick(item.route)}
                  key={item.id}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              )
            })}
          </List>
          <Divider />
          <List>
            <MenuItem button onClick={this.handleSignoutClick}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </MenuItem>
          </List>
        </div>
        <div className={classes.terms}>
          <Typography variant="body1" align="right" className={classes.termsText}>
            Términos y condiciones
          </Typography>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={this.toggleMenu}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    mobileOpen: state.get('navigation').get('mobileOpen'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ toggleMenu }, dispatch),
    bindActionCreators({ signout }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)));