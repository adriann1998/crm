import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
// icons
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { ImTree } from "react-icons/im";

export default function SecondaryList() {
  return (
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
      <Link to="/companytree">
        <ListItem button>
          <ListItemIcon>
            <ImTree />
          </ListItemIcon>
          <ListItemText primary="Company Tree" />
        </ListItem>
      </Link>
    </div>
  );
}
