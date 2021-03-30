import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { LinkContainer } from 'react-router-bootstrap';

export const mainListItems = (
  <div>
    <LinkContainer to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </LinkContainer>
    
    <LinkContainer to="/account">
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </LinkContainer>

    <LinkContainer to="/contact">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
    </LinkContainer>
    
    <LinkContainer to="/department">
      <ListItem button>
        <ListItemIcon>
          <HomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Department" />
      </ListItem>
    </LinkContainer>

    <LinkContainer to="/prospect">
      <ListItem button>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Prospect" />
      </ListItem>
    </LinkContainer>
    
    <LinkContainer to="/quote">
      <ListItem button>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Quote" />
      </ListItem>
    </LinkContainer>
    
    <LinkContainer to="/user">
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
    </LinkContainer>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);