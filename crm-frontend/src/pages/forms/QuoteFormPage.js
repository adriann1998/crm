import React, { useState, useEffect } from 'react';
import { 
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse
} from '@material-ui/core';
import TextField from '../../components/formFields/TextField';
import SelectField from '../../components/formFields/SelectField';
import Button from "../../components/Button";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useFormStyles, useForm } from '../../utils/FormUtil';
import { getData } from '../../utils/CRUDUtil';

export default function QuoteFormPage ({ addOrEdit, defaultValues }) {
  const editMode = defaultValues !== undefined;
  
  const classes = useFormStyles();

  const initialFormValues = {
    prospect: editMode ? (defaultValues.prospect ? defaultValues.prospect._id : "") : "",
    user: editMode ? (defaultValues.user ? defaultValues.user._id : "") : "",
    amountQuoted: editMode ? defaultValues.amountQuoted : 0
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [errorOpen, setErrorOpen] = useState(false);

  const [prospectsChoices, setProspectsChoices] = useState([]);
  const [usersChoices, setUsersChoices] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/prospects').then((data) => {
      if (mounted) {
        if (data === null) {alert("Err")};
        setProspectsChoices(data.map((prospect) => {
          return {value: prospect._id, label: prospect.prospectName}
        }));
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getData('/users').then((data) => {
      if (mounted) {
        if (data === null) {alert("Err")};
        setUsersChoices(data.map((user) => {
          return {value: user._id, label: `${user.name.firstName}${user.name.lastName ? '.'+user.name.lastName.substring(0,1) : ''} - ${user.NIK}`}
        }));
      }
    });
    return () => (mounted = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addOrEdit(formValues, defaultValues, editMode);
    if (response === null) {
      setErrorOpen(true);
    }
    else {
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
            <Grid item xs={12} sm={12}>
              <SelectField
                required={true}
                label="Prospect"
                name="prospect"
                defaultValue={editMode ? defaultValues.prospect._id : null}
                onChange={handleInputChange}
                items={prospectsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <SelectField
                required={true}
                label="User"
                name="user"
                defaultValue={editMode ? defaultValues.user._id : null}
                onChange={handleInputChange}
                items={usersChoices}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required={true}
                label="Amount Quoted"
                name="amountQuoted"
                type="Number"
                defaultValue={editMode ? defaultValues.amountQuoted : 0}
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