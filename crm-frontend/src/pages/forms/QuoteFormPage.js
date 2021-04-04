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
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useStyles, getData, postData, putData } from '../../utils/FormUtil';
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

  const [prospects, setProspects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/prospects').then((data) => {
      if (mounted) {
        data === null ? alert("Err") : setProspects(data);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getData('/users').then((data) => {
      if (mounted) {
        data === null ? alert("Err") : setUsers(data);
      }
    });
    return () => (mounted = false);
  }, []);

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
              <InputLabel>Prospect</InputLabel>
              <Select
                required
                fullWidth
                labelId="prospectId"
                id="prospectId"
                defaultValue={editMode ? defaultValues.prospect._id : null}
                onChange={(e) => setProspectId(e.target.value)}
              >
              {prospects.map((prospect) => {
                return (
                  <MenuItem value={prospect._id}>{`${prospect.prospectName}`}</MenuItem>
                )
              })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel>User</InputLabel>
              <Select
                required
                fullWidth
                labelId="userId"
                id="userId"
                defaultValue={editMode ? defaultValues.user._id : null}
                onChange={(e) => setUserId(e.target.value)}
              >
              {users.map((user, index) => {
                return (
                  <MenuItem key={index} value={user._id}>{`${user.name.firstName}${user.name.lastName ? '.'+user.name.lastName.substring(0,1) : ''} - ${user.NIK}`}</MenuItem>
                )
              })}
              </Select>
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