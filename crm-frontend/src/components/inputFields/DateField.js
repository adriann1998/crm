import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0)
  }
}));

export default function DateField(props) {

  const { label, name, value, onChange, size, format, ...other } = props;

  const classes = useStyles();

  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        fullWidth
        size={size || "small"}
        variant="inline"
        inputVariant="outlined"
        margin="normal"
        format={format || "dd MMM yyyy"}
        label={label}
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefaultEventPara(name, date))}
        {...other}
        className={classes.root}
      />
    </MuiPickersUtilsProvider>
  );
}
