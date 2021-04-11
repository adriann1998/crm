import React from 'react';
import {
    Select as MuiSelect,
    MenuItem,
    InputLabel,
    FormControl
} from '@material-ui/core'

export default function SelectField( {label, name, defaultValue, onChange, items, ...other} ) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      {...other}
    >
    <InputLabel>{label}</InputLabel>
      <MuiSelect
        fullwidth
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {items.map((item) => {
          return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>;
        })}
      </MuiSelect>
    </FormControl>
  );
}
