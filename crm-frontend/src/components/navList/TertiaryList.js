import React from "react";
import SideBarMenuItem from "../SideBarMenuItem";
// icons
import TextsmsIcon from "@material-ui/icons/Textsms";

export default function TertiaryList() {
  return (
    <div>

      <SideBarMenuItem 
        path="/chat"
        text="Chat"
        Icon={TextsmsIcon}
      />
      
    </div>
  );
}
