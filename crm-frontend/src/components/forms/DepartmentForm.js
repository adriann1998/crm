import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse
} from '@material-ui/core';
import TextField from '../inputFields/TextField';
import SelectField from '../inputFields/SelectField';
import Button from "../Button";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useFormStyles, useForm } from '../../utils/FormUtil';
import { getData } from "../../utils/CRUDUtil";

export default function DepartmentForm( props ) {

  const { addOrEdit, defaultValues } = props;

  const editMode = defaultValues !== undefined;
  
  const classes = useFormStyles();

  const [directorChoices, setDirectorChoices] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);

  const initialFormValues = {
    departmentName: editMode ? defaultValues.departmentName : "",
    director: editMode ? (defaultValues.director ? defaultValues.director._id : "") : ""
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const filterDirector = (dir) => (dir.userPosition === 'director')

  useEffect(() => {
    let mounted = true;
    getData("/users").then((data) => {
      if (mounted) {
        if (data === null) {alert("Err");}
        data = data.filter(filterDirector)
                   .map((user) => ({
                      value: user._id,
                      label: `${user.name.firstName}${user.name.lastName ? "." + user.name.lastName.substring(0, 1) : ""} - ${user.NIK}`,
                   }));
        setDirectorChoices(data);
      }
    });
    return () => (mounted = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addOrEdit(formValues, defaultValues, editMode);
    if (response === null) {
      setErrorOpen(true);
    }
    else {
      setErrorOpen(false);
    }
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Collapse in={errorOpen}>
          <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleErrorAlertClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="error"
            >
              Data Invalid!
            </Alert>
        </Collapse>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required={true}
                label="Department Name"
                name="departmentName"
                defaultValue={formValues.departmentName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <SelectField
                required={true}
                label="Director"
                name="director"
                defaultValue={formValues.director}
                onChange={handleInputChange}
                items={directorChoices}
              />
            </Grid>
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
          />
        </form>
      </div>
    </Container>
  );
}