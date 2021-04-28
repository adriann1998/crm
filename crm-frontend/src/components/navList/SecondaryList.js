import React from "react";
import SideBarMenuItem from "../SideBarMenuItem";
// icons
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { ImTree } from "react-icons/im";

export default function SecondaryList() {
  return (
    <div>

      <SideBarMenuItem 
        path="/revenues"
        text="Revenue"
        Icon={EqualizerIcon}
      />

      <SideBarMenuItem 
        path="/sales"
        text="Sales"
        Icon={TrendingUpIcon}
      />

      <SideBarMenuItem 
        path="/companytree"
        text="Company Tree"
        Icon={ImTree}
      />

    </div>
  );
}
