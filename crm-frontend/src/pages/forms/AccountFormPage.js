import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
  Collapse
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import BusinessIcon from '@material-ui/icons/Business';
import { useStyles, postData, putData } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function AccountFormPage() {
  
  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;

  const classes = useStyles();
  const history = useHistory();

  const [accName, setAccName] = useState(editMode ? defaultValues.accName : "");
  const [accAlias, setAccAlias] = useState(editMode ? defaultValues.accAlias : "");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      accName: accName,
      accAlias: accAlias
    };
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `/accounts/${defaultValues._id}`;
      response = await putData(endpoint, formData);
    }
    else {
      endpoint = '/accounts';
      response = await postData(endpoint, formData);
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
                variant="outlined"
                required
                fullWidth
                id="accName"
                label="Account Name"
                name="accName"
                autoFocus
                defaultValue={editMode ? defaultValues.accName : ''}
                onChange={(e) => setAccName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="accAlias"
                label="Account Alias"
                name="accAlias"
                defaultValue={editMode ? defaultValues.accAlias : ''}
                onChange={(e) => setAccAlias(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
            </Button>
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