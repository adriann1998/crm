import React, { useState, useContext } from 'react';
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
  FormHelperText
} from '@material-ui/core';
import TextField from '../inputFields/TextField';
import Button from "../Button";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useFormStyles, useForm } from '../../utils/FormUtil';
import { UserContext } from "../../utils/Context";

export default function AccountForm( props ) {

  const { addOrEdit, defaultValues } = props;
  const { user } = useContext(UserContext);

  const editMode = defaultValues !== undefined;
  const editAccess = (!editMode || user._id === defaultValues.accHolder._id);

  const classes = useFormStyles();

  const [errorOpen, setErrorOpen] = useState(false);

  const initialFormValues = {
    accName: editMode ? defaultValues.accName : "",
    accAlias: editMode ? defaultValues.accAlias : ""
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formValues.accHolder = user._id;
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
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="Account Name"
                name="accName"
                defaultValue={formValues.accName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Alias"
                name="accAlias"
                defaultValue={formValues.accAlias}
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
            {editAccess ? '' : 'No Edit Access - You do not own this Account'}
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}