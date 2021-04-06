import React from "react";
import { TextField as MuiTextField } from '@material-ui/core';

export default function TextField( props ) {
  
  const {label, name, defaultValue, onChange, ...other} = props

  return (
    <MuiTextField
      variant="outlined"
      label={label}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      {...other}
    />
  );
}
