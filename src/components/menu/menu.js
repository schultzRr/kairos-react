import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from '../navigation/navigationActions';
import { signout } from '../../http/sessionActions';

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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import ExitToApp from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    maxWidth: drawerWidth,
  },
  profile: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing.unit * 2 + 'px',
  },
  avatar: {
    marginRight: theme.spacing.unit * 3
  },
});

class Menu extends Component {

  toggleMenu = () => {
    this.props.toggleMenu();
  }

  handleExit = () => {
    this.props.signout();
  }
  
  render() {
    const { classes, mobileOpen } = this.props;

    const drawer = (
      <div>
        <div className={classes.profile}>
          <Avatar className={classes.avatar}>
            <StarIcon />
          </Avatar>
          <div>
            <Typography variant="body2">
              Ricardo
            </Typography>
            <Typography variant="body1">
              rosas_schultz@hotmail.com
            </Typography>
          </div>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem button onClick={this.handleExit}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <React.Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
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

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu));