import React, { useState, useEffect } from "react";
import {
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  IconButton,
  Collapse,
} from "@material-ui/core";
import TextField from "../../components/formFields/TextField";
import SelectField from "../../components/formFields/SelectField";
import DateField from "../../components/formFields/DateField.js";
import Button from "../../components/Button";
import PersonIcon from "@material-ui/icons/Person";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import {
  useFormStyles,
  getData,
  postData,
  putData,
  useForm,
} from "../../utils/FormUtil";
import { useHistory, useLocation, Link } from "react-router-dom";

const userPositionsChoices = [
  { value: "am", label: "Account Manager" },
  { value: "bm", label: "Business Manager" },
  { value: "director", label: "Director" },
];

export default function UserFormPage() {
  const location = useLocation();
  const defaultValues = location.state
    ? location.state.defaultValues
    : undefined;
  const editMode = defaultValues !== undefined;

  const classes = useFormStyles();
  const history = useHistory();

  const initialFormValues = {
    firstName: editMode ? defaultValues.name.firstName : "",
    middleName: editMode ? defaultValues.name.middleName : "",
    lastName: editMode ? defaultValues.name.lastName : "",
    userEmail: editMode ? defaultValues.userEmail : "",
    password: editMode ? defaultValues.password : "",
    passwordConfirm: editMode ? defaultValues.password : "",
    userDOB: editMode ? defaultValues.userDOB : new Date("1970-01-01"),
    NIK: editMode ? defaultValues.NIK : "",
    mobilePhone1: editMode ? defaultValues.userPhone.mobile1 : "",
    mobilePhone2: editMode ? defaultValues.userPhone.mobile2 : "",
    workPhone: editMode ? defaultValues.userPhone.work : "",
    userPosition: editMode ? defaultValues.userPosition : "am",
    reportTo: editMode
      ? defaultValues.reportTo
        ? defaultValues.reportTo._id
        : ""
      : "",
    department: editMode ? defaultValues.department._id : "",
    street: editMode ? defaultValues.userAddress.street : "",
    city: editMode ? defaultValues.userAddress.street : "",
    state: editMode ? defaultValues.userAddress.state : "",
    postcode: editMode ? defaultValues.userAddress.postcode : 0,
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [departmentsChoices, setDepartmentsChoices] = useState([]);
  const [usersChoices, setUsersChoices] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData("/departments").then((data) => {
      if (mounted) {
        if (data === null) {
          alert("Err");
        }
        setDepartmentsChoices(
          data.map((department) => {
            return { value: department._id, label: department.departmentName };
          })
        );
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getData("/users").then((data) => {
      if (mounted) {
        if (data === null) { alert("Err");}
        const userFilter = (user) => {
          if (editMode) { 
            return formValues.userPosition === "am" ? user.userPosition !== "am" : user.userPosition === "director"; 
          }
          return true;
        };
        setUsersChoices(
          data.filter(userFilter)
              .map((user) => { 
                return { 
                  value: user._id, 
                  label: `${user.name.firstName} ${user.name.lastName ? "." + user.name.lastName.substring(0, 1) : ""} - ${user.NIK}`
                };
              })
        );
      }
    });
    return () => (mounted = false);
  }, [editMode, formValues.userPosition]);

  useEffect(() => {
    setPasswordMatch(formValues.password === formValues.passwordConfirm);
  }, [formValues.password, formValues.passwordConfirm]);

  const handleSubmit = async (e) => {
    if (passwordMatch) {
      e.preventDefault();
      const formData = {
        name: {
          firstName: formValues.firstName,
          middleName: formValues.middleName ? formValues.middleName : "",
          lastName: formValues.lastName ? formValues.lastName : "",
        },
        userEmail: formValues.userEmail,
        password: formValues.password,
        userDOB: formValues.userDOB,
        NIK: formValues.NIK,
        userPhone: {
          mobile1: formValues.mobilePhone1,
          mobile2: formValues.mobilePhone2,
          work: formValues.workPhone,
        },
        userPosition: formValues.userPosition,
        reportTo: formValues.reportTo,
        department: formValues.department,
        userAddress: {
          street: formValues.street,
          city: formValues.city,
          state: formValues.state,
          postcode: formValues.postcode,
        },
      };
      let response;
      let endpoint;
      if (editMode) {
        endpoint = `/users/${defaultValues._id}`;
        response = await putData(endpoint, formData);
      } else {
        endpoint = "/users";
        response = await postData(endpoint, formData);
      }
      if (response === null) {
        setSuccessOpen(false);
        setErrorOpen(true);
      } else {
        setErrorOpen(false);
        setSuccessOpen(true);
      }
    }
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
                required={true}
                label="Email"
                name="userEmail"
                type="email"
                disabled={editMode}
                defaultValue={editMode ? defaultValues.userEmail : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="NIK"
                name="NIK"
                disabled={editMode}
                defaultValue={editMode ? defaultValues.NIK : ""}
                inputProps={{ maxLength: 11, minLength: 11 }}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                error={!passwordMatch}
                helperText={passwordMatch ? "" : "Passwords do not match"}
                label="Password"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                error={!passwordMatch}
                helperText={passwordMatch ? "" : "Passwords do not match"}
                label="Password (Confirm)"
                name="passwordConfirm"
                type="password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="First Name"
                name="firstName"
                defaultValue={editMode ? defaultValues.name.firstName : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Middle Name"
                name="middleName"
                defaultValue={editMode ? defaultValues.name.middleName : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                name="lastName"
                defaultValue={editMode ? defaultValues.name.lastName : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateField 
                required={true}
                label="D.O.B"
                name="userDOB"
                value={formValues.userDOB}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                required={true}
                label="Department"
                name="department"
                defaultValue={editMode ? defaultValues.department._id : ""}
                onChange={handleInputChange}
                items={departmentsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                required={true}
                label="User Position"
                name="userPosition"
                defaultValue={formValues.userPosition}
                onChange={handleInputChange}
                items={userPositionsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                label="Report To"
                name="reportTo"
                disabled={formValues.userPosition === "director"}
                defaultValue={formValues.reportTo}
                onChange={handleInputChange}
                items={usersChoices}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="Mobile Phone 1"
                name="mobilePhone1"
                defaultValue={editMode ? defaultValues.userPhone.mobile1 : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Mobile Phone 2"
                name="mobilePhone2"
                defaultValue={editMode ? defaultValues.userPhone.mobile2 : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Work Phone"
                name="workPhone"
                defaultValue={editMode ? defaultValues.userPhone.work : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="Street"
                name="street"
                defaultValue={editMode ? defaultValues.userAddress.street : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="City"
                name="city"
                defaultValue={editMode ? defaultValues.userAddress.city : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required={true}
                label="State"
                name="state"
                defaultValue={editMode ? defaultValues.userAddress.state : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required={true}
                label="Postcode"
                name="postcode"
                defaultValue={
                  editMode ? defaultValues.userAddress.postcode : ""
                }
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
          />
          <div style={{ textAlign: "center" }}>
            Or
            <br />
            <Link to="/user">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
