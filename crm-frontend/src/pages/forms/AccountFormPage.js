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
import { useStyles, postData } from '../../utils/FormUtil';
import { useHistory, Link } from "react-router-dom";

export default function AccountFormPage() {

  const classes = useStyles();
  const history = useHistory();

  const [accName, setAccName] = useState("");
  const [accAlias, setAccAlias] = useState("");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/accounts';
    const data = {
      accName: accName,
      accAlias: accAlias ? accAlias : undefined
    };
    const response = await postData(endpoint, data);
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
    history.push("/quote");
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
          New Account
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