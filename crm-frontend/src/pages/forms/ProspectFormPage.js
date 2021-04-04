import React, { useState, useEffect } from 'react';
import { 
  Avatar, 
  Button, 
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
  Collapse,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useStyles, getData, postData, putData } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function ProspectFormPage ( ) {

  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;
  
  const classes = useStyles();
  const history = useHistory();

  const [prospectName, setProspectName] = useState(editMode ? defaultValues.prospectName : "");
  const [account, setAccount] = useState(editMode ? defaultValues.account._id : "");
  const [prospectAmount, setProspectAmount] = useState(editMode ? defaultValues.prospectAmount : 0);
  const [endUser, setEndUser] = useState(editMode ? defaultValues.endUser : "");
  const [GPM, setGPM] = useState(editMode ? defaultValues.GPM : 0);
  const [expectedDuration, setExpectedDuration] = useState(editMode ? defaultValues.expectedDuration : 0);
  const [desc, setDesc] = useState(editMode ? defaultValues.desc : "");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData("/accounts").then((data) => {
      if (mounted) {
        data === null ? alert("Err") : setAccounts(data);
      }
    });
    return () => (mounted = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      prospectName: prospectName,
      account: account,
      prospectAmount: prospectAmount,
      endUser: endUser,
      GPM: GPM,
      expectedDuration: expectedDuration,
      desc: desc
    };
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `/prospects/${defaultValues._id}`;
      response = await putData(endpoint, formData);
    }
    else {
      endpoint = '/prospects';
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
                defaultValue={editMode ? defaultValues.prospectName : ""}
                onChange={(e) => setProspectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Account</InputLabel>
              <Select
                required
                fullWidth
                labelId="accoundId"
                id="accoundId"
                defaultValue={editMode ? defaultValues.account._id : null}
                onChange={(e) => setAccount(e.target.value)}
              >
              {accounts.map((acc) => {
                return (
                  <MenuItem value={acc._id}>{`${acc.accName}`}</MenuItem>
                )
              })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="endUser"
                label="End User"
                name="endUser"
                autoFocus
                defaultValue={editMode ? defaultValues.endUser : ""}
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
                defaultValue={editMode ? defaultValues.prospectAmount : 0}
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
                defaultValue={editMode ? defaultValues.GPM : 0}
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
                defaultValue={editMode ? defaultValues.GPM : 0}
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
                defaultValue={editMode ? defaultValues.desc : ''}
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