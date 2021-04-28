import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
// icons
import TextsmsIcon from '@material-ui/icons/Textsms';

export default function TertiaryList() {
  return (
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
  );
}
