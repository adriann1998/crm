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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useStyles, submitForm } from '../utils/FormUtil';
import { useHistory, Link } from "react-router-dom";
import { hash } from '../utils/LoginUtil';

export default function UserFormPage ( ) {
  
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userDOB, setUserDOB] = useState(new Date('1970-01-01'));
  const [NIK, setNIK] = useState("");
  const [mobilePhone1, setMobilePhone1] = useState("");
  const [mobilePhone2, setMobilePhone2] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [userPosition, setUserPosition] = useState("am");
  const [reportTo, setReportTo] = useState(null);
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPoscode] = useState(0);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm])

  const handleSubmit = async (e) => {
    if (passwordMatch) {
      e.preventDefault();
      const endpoint = '/users';
      const formData = {
        name: {
          firstName: firstName,
          middleName: middleName ? middleName : undefined,
          lastName: lastName ? lastName : undefined
        },
        userEmail: userEmail,
        password: hash(password),
        userDOB: userDOB,
        NIK: NIK,
        userPhone: {
          mobile1: mobilePhone1,
          mobile2: mobilePhone2 ? mobilePhone2 : undefined,
          work: workPhone ? workPhone :undefined
        },
        userPosition: userPosition,
        reportTo: reportTo,
        department: department,
        userAddress: {
          street: street,
          city: city,
          state: state,
          postcode: postcode
        }
      };
      const response = await submitForm(endpoint, formData);
      console.log(response);
      if (!response._id) {
        setSuccessOpen(false);
        setErrorOpen(true);
      }
      else {
        setErrorOpen(false);
        setSuccessOpen(true);
      }
    };
  };

  const handleSuccessAlertClose = () => {
    history.push("/user");
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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
            severity="success"
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
          New User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userEmail"
                label="Email"
                name="userEmail"
                autoFocus
                type="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="NIK"
                label="NIK"
                name="NIK"
                autoFocus
                inputProps={{ maxLength: 11, minLength: 11 }}
                onChange={(e) => setNIK(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                error={!passwordMatch}
                helperText={passwordMatch ? '' : "Passwords do not match"}
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoFocus
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={!passwordMatch}
                helperText={passwordMatch ? '' : "Passwords do not match"}
                id="passwordConfirm"
                label="Password (Confirm)"
                name="passwordConfirm"
                autoFocus
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="middleName"
                label="Middle Name"
                name="middleName"
                autoFocus
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoFocus
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  required
                  fullWidth
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="DOB"
                  label="D.O.B"
                  value={userDOB}
                  onChange={(e) => setUserDOB(e.target.value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="department"
                label="Department ID"
                name="department"
                autoFocus
                inputProps={{ maxLength: 24, minLength: 24 }}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Role</InputLabel>
              <Select
                required
                fullWidth
                labelId="userPosition"
                id="userPosition"
                value={userPosition}
                onChange={(e) => setUserPosition(e.target.value)}
              >
                <MenuItem value={"am"}>Account Manager</MenuItem>
                <MenuItem value={"bm"}>Business Manager</MenuItem>
                <MenuItem value={"director"}>Director</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="reportTo"
                label="Report To (Enter User ID)"
                name="reportTo"
                autoFocus
                disabled={userPosition === 'director'}
                inputProps={{ maxLength: 24, minLength: 24 }}
                onChange={(e) => setReportTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile1"
                label="Mobile Phone 1"
                name="mobile1"
                autoFocus
                onChange={(e) => setMobilePhone1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="mobile2"
                label="Mobile Phone 2"
                name="moobile2"
                autoFocus
                onChange={(e) => setMobilePhone2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="workPhone"
                label="Work Phone"
                name="workPhone"
                autoFocus
                onChange={(e) => setWorkPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoFocus
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                name="city"
                autoFocus
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="state"
                label="State"
                name="state"
                autoFocus
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="postcode"
                label="Postcode"
                name="postcode"
                autoFocus
                onChange={(e) => setPoscode(e.target.value)}
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
          <Link to="/user">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}