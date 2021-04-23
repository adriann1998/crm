import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessIcon from "@material-ui/icons/Business";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { Link } from "react-router-dom";

export const primaryList = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link to="/accounts">
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </Link>

    <Link to="/contacts">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
    </Link>

    <Link to="/departments">
      <ListItem button>
        <ListItemIcon>
          <HomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Department" />
      </ListItem>
    </Link>

    <Link to="/prospects">
      <ListItem button>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Prospect" />
      </ListItem>
    </Link>

    <Link to="/quotes">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Quote" />
      </ListItem>
    </Link>

    <Link to="/users">
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryList = (
  <div>
    <Link to="/revenues">
      <ListItem button>
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Revenue" />
      </ListItem>
    </Link>
    <Link to="/sales">
      <ListItem button>
        <ListItemIcon>
          <TrendingUpIcon />
        </ListItemIcon>
        <ListItemText primary="Sales" />
      </ListItem>
    </Link>
  </div>
);

export const tertiaryList = (
  <div>
    <Link to="/chat">
      <ListItem button>
        <ListItemIcon>
          <TextsmsIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
    </Link>
  </div>
)
