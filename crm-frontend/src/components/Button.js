import React from "react";
import { Button as MuiButton } from "@material-ui/core";

export default function Button( props ) {

  const { variant, color, size, text, onClick, ...other} = props;

  return (
    <MuiButton
      variant={variant || "primary"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
}
