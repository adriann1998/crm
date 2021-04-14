import React, { useState } from 'react';
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse
} from '@material-ui/core';
import TextField from '../../components/inputFields/TextField';
import Button from "../../components/Button";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useFormStyles, useForm } from '../../utils/FormUtil';

export default function DepartmentFormPage ({ addOrEdit, defaultValues }) {
  const editMode = defaultValues !== undefined;
  
  const classes = useFormStyles();

  const [errorOpen, setErrorOpen] = useState(false);

  const initialFormValues = {
    departmentName: editMode ? defaultValues.departmentName : "",
    director: editMode ? (defaultValues.director ? defaultValues.director._id : null) : null
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

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
                defaultValue={editMode ? defaultValues.departmentName : ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Director ID"
                name="directorId"
                defaultValue={editMode ? (defaultValues.director ? defaultValues.director._id : '') : ''}
                onChange={handleInputChange}
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