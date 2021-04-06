import React, { useState } from 'react';
import {
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  IconButton,
  Collapse
} from '@material-ui/core';
import TextField from '../../components/formFields/TextField';
import Button from "../../components/Button";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import BusinessIcon from '@material-ui/icons/Business';
import { useFormStyles, postData, putData, useForm } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function AccountFormPage() {
  
  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;

  const classes = useFormStyles();
  const history = useHistory();

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const initialFormValues = {
    accName: editMode ? defaultValues.accName : "",
    accAlias: editMode ? defaultValues.accName : ""
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `/accounts/${defaultValues._id}`;
      response = await putData(endpoint, formValues);
    }
    else {
      endpoint = '/accounts';
      response = await postData(endpoint, formValues);
    }
    if (response === null) {
      setSuccessOpen(false);
      setErrorOpen(true);
    }
    else {
      setErrorOpen(false);
      setSuccessOpen(true);
    }
  };

  const handleSuccessAlertClose = () => {
    history.push("/account");
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar>
        <Collapse in={successOpen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleSuccessAlertClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Form Submitted !
            </Alert>
        </Collapse>
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
        <Typography component="h1" variant="h5">
          {editMode ? "Edit Account" : "New Account"} 
          </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="Account Name"
                name="accName"
                defaultValue={editMode ? defaultValues.accName : ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Alias"
                name="accAlias"
                defaultValue={editMode ? defaultValues.accName : ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
          />
          <div style={{ textAlign: 'center' }}>
            Or
              <br />
            <Link to="/account">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}