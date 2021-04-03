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
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useStyles, postData, putData } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function QuoteFormPage ( ) {

  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;
  
  const classes = useStyles();
  const history = useHistory();

  const [prospectId, setProspectId] = useState(editMode ? (defaultValues.prospect ? defaultValues.prospect._id : "") : "");
  const [userId, setUserId] = useState(editMode ? (defaultValues.user ? defaultValues.user._id : "") : "");
  const [amountQuoted, setamountQuoted] = useState(editMode ? defaultValues.amountQuoted : 0);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      prospect: prospectId,
      user: userId,
      amountQuoted: amountQuoted
    };
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `/quotes/${defaultValues._id}`;
      response = await putData(endpoint, formData);
    }
    else {
      endpoint = '/quotes';
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
          <AssignmentIcon />
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
          New Quote
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="prospectId"
                label="Prospect Id"
                name="prospectid"
                autoFocus
                defaultValue={editMode ? (defaultValues.prospect ? defaultValues.prospect._id : "") : ""}
                inputProps={{ maxLength: 24, minLength: 24 }}
                onChange={(e) => setProspectId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User ID"
                label="User ID"
                name="userId"
                defaultValue={editMode ? (defaultValues.user ? defaultValues.user._id : "") : ""}
                inputProps={{ maxLength: 24, minLength: 24 }}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Amount Quoted"
                label="Amount Quoted"
                name="amountQuoted"
                type="Number"
                defaultValue={editMode ? defaultValues.amountQuoted : 0}
                onChange={(e) => setamountQuoted(e.target.value)}
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
          <div style={{textAlign: 'center'}}>
            Or
            <br/>
          <Link to="/quote">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}