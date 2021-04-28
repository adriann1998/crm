import React, { useContext, useState, useEffect } from "react";
import { 
  MenuItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
// utils.
import { UserContext } from "../utils/Context";
import { useHistory } from "react-router-dom";


export default function SideBarMenuItem( props ) {

  const { path, text, Icon, adminOnly } = props;

  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user === "admin");
  }, [user]);

  const routeChange = (event) => {
    const { myValue } = event.currentTarget.dataset;
    history.push(myValue);
  };

  return (
    <React.Fragment>
      {(adminOnly && isAdmin) || !adminOnly ? 
        <MenuItem data-my-value={path} onClick={routeChange}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </MenuItem> : null
      }
    </React.Fragment>
  );
}
