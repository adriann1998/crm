import React from 'react';
import {
    Select as MuiSelect,
    MenuItem,
    InputLabel,
    FormControl
} from '@material-ui/core'

export default function SelectField( {label, name, defaultValue, onChange, items} ) {
  return (
    <FormControl variant="outlined">
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
