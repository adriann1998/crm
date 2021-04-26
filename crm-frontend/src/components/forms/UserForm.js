import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
} from "@material-ui/core";
import TextField from "../inputFields/TextField";
import SelectField from "../inputFields/SelectField";
import DateField from "../inputFields/DateField.js";
import Button from "../Button";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useFormStyles, useForm } from "../../utils/FormUtil";
import { getData } from "../../utils/CRUDUtil";

const userPositionsChoices = [
  { value: "am", label: "Account Manager" },
  { value: "bm", label: "Business Manager" },
  { value: "director", label: "Director" },
];

export default function UserForm( props ) {

  const { addOrEdit, defaultValues } = props;

  const editMode = defaultValues !== undefined;

  const classes = useFormStyles();

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
    reportTo: editMode ? defaultValues.reportTo ? defaultValues.reportTo : "" : "",
    department: editMode ? defaultValues.department._id : "",
    street: editMode ? defaultValues.userAddress.street : "",
    city: editMode ? defaultValues.userAddress.street : "",
    state: editMode ? defaultValues.userAddress.state : "",
    postcode: editMode ? defaultValues.userAddress.postcode : "",
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [errorOpen, setErrorOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [departmentsChoices, setDepartmentsChoices] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersChoices, setUsersChoices] = useState([]);

  useEffect(() => {
    getData("/departments").then((data) => {
      if (data === null) {
        alert("Err");
      }
      data = data.map((department) => ({ value: department._id, label: department.departmentName }))
      setDepartmentsChoices(data);
    });
  }, []);

  useEffect(() => {
    getData("/users").then((data) => {
      if (data === null) { alert("Err");}
      setUsers(data);
    });
  }, [])

  useEffect(() => {
    const userChoicesFilter = (user) => {
      switch (formValues.userPosition){
        case "am":
          return user.userPosition === "bm"
        case "bm":
          return user.userPosition === "director"
        case "director":
          return false
        default:
          return false
      }
    };
    const data = users.filter(userChoicesFilter)
                .map((user) => ({ 
                    value: user._id, 
                    label: `${user.name.firstName} ${user.name.lastName ? "." + user.name.lastName.substring(0, 1) : ""} - ${user.NIK}`
                }))
    setUsersChoices(data);
  }, [editMode, formValues.userPosition, users]);

  useEffect(() => {
    setPasswordMatch(formValues.password === formValues.passwordConfirm);
  }, [formValues.password, formValues.passwordConfirm]);

  const handleSubmit = async (e) => {
    const getUser = (userId) => {
      return users.filter(u => String(u._id) === String(userId))[0]
    }
    const getSuperiorHierarchy = () => {
      const currentUserId = formValues.reportTo;
      if (currentUserId === null) return [];
      let hierarchy = [currentUserId];
      let currentUser = getUser(currentUserId);
      while (currentUser.reportTo !== null){
        console.log(currentUser)
        const superior = getUser(currentUser.reportTo);
        hierarchy.push(superior._id);
        currentUser = superior;
      }
      console.log(hierarchy)
      return hierarchy;
    }
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
        superiorHierarchy: getSuperiorHierarchy(),
        department: formValues.department,
        userAddress: {
          street: formValues.street,
          city: formValues.city,
          state: formValues.state,
          postcode: formValues.postcode,
        },
      };
      const response = await addOrEdit(formData, defaultValues, editMode);
      if (response === null) {
        setErrorOpen(true);
      } else {
        setErrorOpen(false);
      }
    }
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
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
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="Email"
                name="userEmail"
                type="email"
                disabled={editMode}
                defaultValue={formValues.userEmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="NIK"
                name="NIK"
                disabled={editMode}
                defaultValue={formValues.NIK}
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
                defaultValue={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Middle Name"
                name="middleName"
                defaultValue={formValues.middleName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                name="lastName"
                defaultValue={formValues.lastName}
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
                defaultValue={formValues.department}
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
                required={formValues.userPosition !== "director"}
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
                defaultValue={formValues.mobilePhone1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Mobile Phone 2"
                name="mobilePhone2"
                defaultValue={formValues.mobilePhone2}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Work Phone"
                name="workPhone"
                defaultValue={formValues.workPhone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="Street"
                name="street"
                defaultValue={formValues.street}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="City"
                name="city"
                defaultValue={formValues.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required={true}
                label="State"
                name="state"
                defaultValue={formValues.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required={true}
                label="Postcode"
                name="postcode"
                defaultValue={formValues.postcode}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
          />
        </form>
      </div>
    </Container>
  );
}
