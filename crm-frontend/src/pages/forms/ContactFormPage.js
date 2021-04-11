import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
} from "@material-ui/core";
import TextField from "../../components/formFields/TextField";
import SelectField from "../../components/formFields/SelectField";
import Button from "../../components/Button";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import {
  useFormStyles,
  getData,
  useForm,
} from "../../utils/FormUtil";

export default function ContactFormPage({ addOrEdit, defaultValues }) {
  const editMode = defaultValues !== undefined;

  const classes = useFormStyles();

  const initialFormValues = {
    firstName: editMode ? defaultValues.name.firstName : "",
    lastName: editMode ? defaultValues.name.lastName : "",
    account: editMode ? defaultValues.account._id : "",
    contactTitle: editMode ? defaultValues.contactTitle : "",
    contactEmail: editMode ? defaultValues.contactEmail : "",
    mobilePhone: editMode ? defaultValues.contactPhone.mobile : "",
    workPhone: editMode ? defaultValues.contactPhone.work : "",
    officePhone: editMode ? defaultValues.contactPhone.office : "",
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);
  
  const [errorOpen, setErrorOpen] = useState(false);

  const [accountsChoices, setAccountsChoices] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData("/accounts").then((data) => {
      if (mounted) {
        if (data === null) {alert("Err");}
        setAccountsChoices(data.map((acc) => {
          return {value: acc._id, label: acc.accName}
        }))
      }
    });
    return () => (mounted = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      },
      account: formValues.account,
      contactTitle: formValues.contactTitle ? formValues.contactTitle : "",
      contactEmail: formValues.contactEmail ? formValues.contactEmail : "",
      contactPhone: {
        mobile: formValues.mobilePhone,
        work: formValues.workPhone ? formValues.workPhone : "",
        office: formValues.officePhone ? formValues.officePhone : "",
      },
    };
    const response = await addOrEdit(formData, defaultValues, editMode);
    if (response === null) {
      setErrorOpen(true);
    } else {
      setErrorOpen(false);
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
                label="First Name"
                name="firstName"
                defaultValue={editMode ? defaultValues.name.firstName : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                defaultValue={editMode ? defaultValues.name.lastName : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Contact Title"
                name="contactTitle"
                defaultValue={editMode ? defaultValues.contactTitle : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Contact Email"
                name="contactEmail"
                type="email"
                defaultValue={editMode ? defaultValues.contactEmail : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                required={true}
                label="Account"
                name="account"
                defaultValue={editMode ? defaultValues.account._id : null}
                onChange={handleInputChange}
                items={accountsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required={true}
                label="Mobile PhoneNumber"
                name="mobilePhone"
                defaultValue={editMode ? defaultValues.contactPhone.mobile : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Work Phone Number"
                name="workPhone"
                defaultValue={editMode ? defaultValues.contactPhone.work : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Office Phone"
                name="officePhone"
                defaultValue={editMode ? defaultValues.contactPhone.office : ""}
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
