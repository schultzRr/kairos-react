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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined';
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    width: 300,
  },
  profile: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    paddingRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  profileText: {
    color: 'white',
  },
  profileLower: {
    display: 'flex',
    alignItems: 'center',
  },
  profileTextContainer: {
    maxWidth: 'calc(100% - 2em)',
  },
  editIcon: {
    color: 'white',
    marginLeft: 'auto',
  },
  avatar: {
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    height: 60,
    width: 60,
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
    icon: <DateRangeIcon />,
    route: '/members',
  },
  {
    id: 1,
    label: 'Mis compras',
    icon: <CreditCardIcon />,
    route: '/members/orders',
  },
  {
    id: 2,
    label: 'Preguntas frecuentes',
    icon: <HelpIcon />,
    route: '/members/faq',
  },
]

class Menu extends Component {
  state = {
    selectedMenuIndex: 0
  }

  toggleMenu = () => {
    this.props.toggleMenu();
  }

  handleMenuItemClick = (index, route) => {
    this.setState({selectedMenuIndex : index});
    this.props.history.push(route);
  }

  handleSignoutClick = () => {
    this.props.signout();
  }
  
  render() {
    const { classes, mobileOpen } = this.props;

    const drawer = (
      <div className={classes.root}>
        <div>
          <div className={classes.profile}>
            <Avatar src="/images/avatar.jpeg" className={classes.avatar}/>
            <div className={classes.profileLower}>
              <div className={classes.profileTextContainer}>
                <Typography variant="body2" className={classes.profileText}>
                  Ricardo Rosas
                </Typography>
                <Typography variant="body1" noWrap className={classes.profileText}>
                  rosas_schultz@hotmail.com
                </Typography>
              </div>
              <IconButton component={Link} to="/members/account" className={classes.editIcon}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <List>
            { menu.map((item, index) => {
              return(
                <MenuItem 
                  button 
                  selected={this.state.selectedMenuIndex == index}
                  onClick={() => this.handleMenuItemClick(index, item.route)}
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