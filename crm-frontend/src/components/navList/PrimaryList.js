import React, { useContext, useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessIcon from "@material-ui/icons/Business";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
// utils
import { UserContext } from "../../utils/Context";

export default function PrimaryList() {

  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user === "admin");
  }, [user])

  return (
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

      {isAdmin && 
        <Link to="/departments">
          <ListItem button>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Department" />
          </ListItem>
        </Link>
      }
  
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

      {isAdmin &&
        <Link to="/users">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
        </Link>
      }
    </div>
  );
}
