import React from "react";
import { TextField as MuiTextField } from '@material-ui/core';

export default function TextField( props ) {
  
  const {label, name, defaultValue, onChange, size, ...other} = props

  return (
    <MuiTextField
      fullWidth
      size={size || "small"}
      variant="outlined"
      label={label}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      {...other}
    />
  );
}
