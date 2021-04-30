import React from "react";
import SideBarMenuItem from "../SideBarMenuItem";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessIcon from "@material-ui/icons/Business";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import HomeWorkIcon from "@material-ui/icons/HomeWork";

export default function PrimaryList() {

  return (
    <div>

      <SideBarMenuItem 
        path="/"
        text="Dashboard"
        Icon={DashboardIcon}
      />

      <SideBarMenuItem 
        path="/accounts"
        text="Account"
        Icon={BusinessIcon}
      />

      <SideBarMenuItem 
        path="/contacts"
        text="Contact"
        Icon={PeopleIcon}
      />

      <SideBarMenuItem 
        path="/departments"
        text="Department"
        Icon={HomeWorkIcon}
        adminOnly
      />

      <SideBarMenuItem 
        path="/prospects"
        text="Prospect"
        Icon={AttachMoneyIcon}
      />

      <SideBarMenuItem 
        path="/quotes"
        text="Quote"
        Icon={AssignmentIcon}
      />

      <SideBarMenuItem 
        path="/users"
        text="User"
        Icon={PersonIcon}
        adminOnly
      />

    </div>
  );
}
