import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DateField ( {label, name, required, value, onChange} ) {

    const convertToDefaultEventPara = (name, value) => ({
        target: { 
            name, value 
        }
    });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker 
        disableToolbar 
        fullWidth
        variant="inline" 
        inputVariant="outlined"
        margin="normal"
        formate="dd/MMM/yyyy"
        label={label}
        name={name}
        value={value}
        onChange={date => onChange(convertToDefaultEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
