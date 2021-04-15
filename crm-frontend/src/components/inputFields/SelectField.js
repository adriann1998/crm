import React from 'react';
import {
    Select as MuiSelect,
    MenuItem,
    InputLabel,
    FormControl
} from '@material-ui/core'

export default function SelectField( {label, name, defaultValue, onChange, items, size, ...other} ) {
  return (
    <FormControl
      fullWidth
      size={size || "small"}
      variant="outlined"
      {...other}
    >
    <InputLabel>{label}</InputLabel>
      <MuiSelect
        fullWidth
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {items.map((item, index) => {
          return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>;
        })}
      </MuiSelect>
    </FormControl>
  );
}
