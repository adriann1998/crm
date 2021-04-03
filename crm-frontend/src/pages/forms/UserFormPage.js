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
import PersonIcon from '@material-ui/icons/Person';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useStyles, postData, putData } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function UserFormPage() {

  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;

  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState(editMode ? defaultValues.name.firstName : "");
  const [middleName, setMiddleName] = useState(editMode ? defaultValues.name.middleName : "");
  const [lastName, setLastName] = useState(editMode ? defaultValues.name.lastName : "");
  const [userEmail, setUserEmail] = useState(editMode ? defaultValues.userEmail : "");
  const [password, setPassword] = useState(editMode ? defaultValues.password : "");
  const [passwordConfirm, setPasswordConfirm] = useState(editMode ? defaultValues.password : "");
  const [userDOB, setUserDOB] = useState(editMode ? defaultValues.userDOB : new Date('1970-01-01'));
  const [NIK, setNIK] = useState(editMode ? defaultValues.NIK : "");
  const [mobilePhone1, setMobilePhone1] = useState(editMode ? defaultValues.userPhone.mobile1 : "");
  const [mobilePhone2, setMobilePhone2] = useState(editMode ? defaultValues.userPhone.mobile2 : "");
  const [workPhone, setWorkPhone] = useState(editMode ? defaultValues.userPhone.work : "");
  const [userPosition, setUserPosition] = useState(editMode ? defaultValues.userPosition : "am");
  const [reportTo, setReportTo] = useState(editMode ? (defaultValues.reportTo ? defaultValues.reportTo._id : null) : null);
  const [department, setDepartment] = useState(editMode ? defaultValues.department._id : '');
  const [street, setStreet] = useState(editMode ? defaultValues.userAddress.street : '');
  const [city, setCity] = useState(editMode ? defaultValues.userAddress.street : '');
  const [state, setState] = useState(editMode ? defaultValues.userAddress.state : '');
  const [postcode, setPoscode] = useState(editMode ? defaultValues.userAddress.postcode : 0);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm])

  const handleSubmit = async (e) => {
    if (passwordMatch) {
      e.preventDefault();
      const formData = {
        name: {
          firstName: firstName,
          middleName: middleName ? middleName : undefined,
          lastName: lastName ? lastName : undefined
        },
        userEmail: userEmail,
        password: password,
        userDOB: userDOB,
        NIK: NIK,
        userPhone: {
          mobile1: mobilePhone1,
          mobile2: mobilePhone2 ? mobilePhone2 : undefined,
          work: workPhone ? workPhone : undefined
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
      let response;
      let endpoint;
      if (editMode) {
        endpoint = `/users/${defaultValues._id}`;
        response = await putData(endpoint, formData);
      }
      else {
        endpoint = '/users';
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
          <PersonIcon />
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
          {editMode ? "Edit User" : "New User"}
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
                disabled={editMode}
                defaultValue={editMode ? defaultValues.userEmail : ""}
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
                disabled={editMode}
                defaultValue={editMode ? defaultValues.NIK : ""}
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
                defaultValue={editMode ? defaultValues.name.firstName : ""}
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
                defaultValue={editMode ? defaultValues.name.middleName : ""}
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
                defaultValue={editMode ? defaultValues.name.lastName : ""}
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
                defaultValue={editMode ? defaultValues.department._id : ""}
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
                defaultValue={editMode ? defaultValues.userPosition : userPosition}
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
                defaultValue={editMode ? (defaultValues.reportTo ? defaultValues.reportTo._id : null) : null}
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
                defaultValue={editMode ? defaultValues.userPhone.mobile1 : ''}
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
                defaultValue={editMode ? defaultValues.userPhone.mobile2 : ''}
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
                defaultValue={editMode ? defaultValues.userPhone.work : ''}
                onChange={(e) => setWorkPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoFocus
                defaultValue={editMode ? defaultValues.userAddress.street : ''}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoFocus
                defaultValue={editMode ? defaultValues.userAddress.city : ''}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoFocus
                defaultValue={editMode ? defaultValues.userAddress.state : ''}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="postcode"
                label="Postcode"
                name="postcode"
                autoFocus
                defaultValue={editMode ? defaultValues.userAddress.postcode : ''}
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
          <div style={{ textAlign: 'center' }}>
            Or
            <br />
            <Link to="/user">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}