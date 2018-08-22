import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from '../navigation/navigationActions';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/EditOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined';
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  profile: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
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

class Menu extends Component {

  toggleMenu = () => {
    this.props.toggleMenu();
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
              <EditIcon className={classes.editIcon}/>
            </div>
          </div>
          <List>
            <ListItem button>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Compras" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="Resultados" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Preguntas frecuentes" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
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
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu));