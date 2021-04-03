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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useStyles, postData } from '../../utils/FormUtil';
import { useHistory, Link } from "react-router-dom";

export default function ProspectFormPage ( ) {
  
  const classes = useStyles();
  const history = useHistory();

  const [prospectName, setProspectName] = useState("");
  const [account, setAccount] = useState("");
  const [prospectAmount, setProspectAmount] = useState("");
  const [endUser, setEndUser] = useState("");
  const [GPM, setGPM] = useState(0);
  const [expectedDuration, setExpectedDuration] = useState(0);
  const [desc, setDesc] = useState("");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/prospects';
    const formData = {
      prospectName: prospectName,
      account: account,
      prospectAmount: prospectAmount,
      endUser: endUser,
      GPM: GPM,
      expectedDuration: expectedDuration,
      desc: desc
    };
    const response = await postData(endpoint, formData);
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
    history.push("/prospect");
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AttachMoneyIcon />
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
          New Prospect
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="prospectName"
                label="Prospect Name"
                name="prospectName"
                autoFocus
                onChange={(e) => setProspectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="account"
                label="Account ID"
                name="account"
                inputProps={{ maxLength: 24, minLength: 24 }}
                onChange={(e) => setAccount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="endUser"
                label="End User"
                name="endUser"
                autoFocus
                onChange={(e) => setEndUser(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="prospectAmount"
                label="Prospect Amount"
                name="prospectAmount"
                type="Number"
                inputProps={{ min: 0}}
                onChange={(e) => setProspectAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="GPM"
                label="GPM"
                name="GPM"
                type="Number"
                inputProps={{ min: 0, max:100}}
                onChange={(e) => setGPM(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="expectedDuration"
                label="Expected Duration"
                name="expectedDuration"
                type="Number"
                inputProps={{ min: 0}}
                onChange={(e) => setExpectedDuration(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="desc"
                label="Descriptions"
                name="desc"
                multiline
                rows={4}
                inputProps={{ maxLength: 500}}
                onChange={(e) => setDesc(e.target.value)}
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
          <Link to="/prospect">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}