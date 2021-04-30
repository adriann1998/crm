import React, { useState, useEffect, useContext } from "react";
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
  FormHelperText
} from "@material-ui/core";
import TextField from "../inputFields/TextField";
import SelectField from "../inputFields/SelectField";
import Button from "../Button";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useFormStyles, useForm } from "../../utils/FormUtil";
import { getData } from "../../utils/CRUDUtil";
import { UserContext } from "../../utils/Context";

export default function ContactForm( props ) {

  const { addOrEdit, defaultValues } = props;
  const {user} = useContext(UserContext)
  
  const editMode = defaultValues !== undefined;
  const editAccess = (!editMode || user._id === defaultValues.account.accHolder._id);

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
    getData("/accounts").then((data) => {
      if (data === null) {alert("Err");}
      // const accFilter = (acc) => user && acc.accHolder._id === user._id;
      setAccountsChoices(data.map((acc) => {
        return {value: acc._id, label: acc.accName}
      }))
    });
  }, [user]);

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
                defaultValue={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                defaultValue={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Contact Title"
                name="contactTitle"
                defaultValue={formValues.contactTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Contact Email"
                name="contactEmail"
                type="email"
                defaultValue={formValues.contactEmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                required
                label="Account"
                name="account"
                defaultValue={formValues.account}
                disabled={accountsChoices.length === 0}
                onChange={handleInputChange}
                items={accountsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Mobile PhoneNumber"
                name="mobilePhone"
                defaultValue={formValues.mobilePhone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Work Phone Number"
                name="workPhone"
                defaultValue={formValues.workPhone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Office Phone"
                name="officePhone"
                defaultValue={formValues.officePhone}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
            disabled={!editAccess}
          />
          <FormHelperText style={{color: 'red'}}>
            {editAccess ? '' : 'No Edit Access - You do not own this Contact'}
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}
