import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { OMEIN_STORE_URL, PRANA_STORE_URL } from 'res/constants';

import { 
  Hidden,
  Drawer,
  Typography,
  Divider,
  List,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles 
} from '@material-ui/core';
import {
  ListOutlined as ListIcon ,
  PersonOutlined as PersonIcon,
  AccountTreeOutlined as TreeIcon,
  StoreOutlined as StoreIcon,
  ExitToAppOutlined as ExitToAppIcon,
} from '@material-ui/icons';

import ThreeBounceLoader from 'library/components/Loader/ThreeBounceLoader';
import { toggleMenu } from 'components/navigation/navigationActions';
import { signout } from 'http/sessionActions';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.custom.white,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  drawer: {
    height: '100%',
  },
  drawerPaper: {
    position: 'relative',
    width: 280,
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 3),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  profileText: {
    color: 'black',
  },
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  selectedMenuItem: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    '& span': {
      color: theme.palette.custom.white,
    },
    '& svg': {
      color: theme.palette.custom.white
    }
    
  },
  editIcon: {
    color: 'black',
    marginLeft: 'auto',
  },
  terms: {
    marginTop: 'auto',
  },
  termsText: {
    padding: theme.spacing(2, 3),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.custom.text,
  },
});

const menu = [
  {
    id: 0,
    label: 'Resumen',
    icon: <ListIcon />,
    route: '/members',
    matchingRoutes: ['/members'],
    value: 0,
  },
  {
    id: 1,
    label: 'Mis datos',
    icon: <PersonIcon />,
    route: '/members/profile',
    matchingRoutes: ['/members/profile'],
    value: 1,
  },
  {
    id: 2,
    label: 'Detalle de volumen',
    icon: <TreeIcon />,
    route: '/members/downlines',
    matchingRoutes: ['/members/downlines'],
    value: 2,
  },
]

class Menu extends Component {
  state = {
    selectedMenu: undefined
  }

  toggleMenu = () => {
    this.props.toggleMenu();
  }

  handleMenuItemClick = route => {
    this.toggleMenu();
    this.props.history.push(route);
  }

  handleSignoutClick = () => {
    this.props.signout()
    .then(response => {
      this.toggleMenu();
    })
    .catch(e => {});
  }

  setMenuValue = () => {
    const { location } = this.props;

    menu.map(item => {
      item.matchingRoutes.map(route => {
        if (location.pathname.includes(route)) {
          this.setState({selectedMenu: item.value});
        }
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setMenuValue();
    }
  }

  componentDidMount() {
    this.setMenuValue();
  }
  
  render() {
    const { classes, mobileOpen, loading, name, lastname, externalId } = this.props;

    const drawer = (
      <div className={classes.root}>
        <div>
          <div className={classes.profile}>
            <Typography variant="body2" className={classes.profileText}>
              {name} {lastname}
            </Typography>
            <Typography variant="caption" noWrap className={classes.profileText}>
              Id: {externalId}
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
                  classes={{
                    selected: classes.selectedMenuItem,
                  }}
                  className={classes.menuItem}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              )
            })}
            <a href={OMEIN_STORE_URL} target="_blank" className={classes.link}>
              <MenuItem 
                button 
                classes={{
                  selected: classes.selectedMenuItem,
                }}
                className={classes.menuItem}
              >
                <ListItemIcon>
                  <StoreIcon></StoreIcon>
                </ListItemIcon>
                <ListItemText primary="Tienda Omein" />
              </MenuItem>
            </a>
            <a href={PRANA_STORE_URL} target="_blank" className={classes.link}>
              <MenuItem 
                button 
                classes={{
                  selected: classes.selectedMenuItem,
                }}
                className={classes.menuItem}
              >
                <ListItemIcon>
                  <StoreIcon></StoreIcon>
                </ListItemIcon>
                <ListItemText primary="Tienda Prana" />
              </MenuItem>
            </a>
          </List>
          <Divider />
          <List>
            <MenuItem 
              button 
              onClick={this.handleSignoutClick} 
              classes={{
                selected: classes.selectedMenuItem,
              }}
              className={classes.menuItem}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" />
              { loading && (
                <ThreeBounceLoader />
              )}
            </MenuItem>
          </List>
        </div>
        <div className={classes.terms}>
          {/* <Typography variant="body1" align="right" className={classes.termsText}>
            Términos y condiciones
          </Typography> */}
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
            className={classes.drawer}
          >
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
    loading: state.get('session').get('loading'),
    name: state.get('session').get('name'),
    lastname: state.get('session').get('lastname'),
    externalId: state.get('session').get('externalId'),
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