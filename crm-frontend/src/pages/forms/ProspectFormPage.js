import React, { useState, useEffect } from 'react';
import { 
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  IconButton,
  Collapse,
  TextField as MuiTextField
} from '@material-ui/core';
import TextField from '../../components/formFields/TextField';
import SelectField from '../../components/formFields/SelectField';
import Button from "../../components/Button";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useFormStyles, getData, postData, putData, useForm } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function ProspectFormPage ( ) {

  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;
  const classes = useFormStyles();
  const history = useHistory();

  const initialFormValues = {
    prospectName: editMode ? defaultValues.prospectName : "",
    account: editMode ? defaultValues.account._id : "",
    endUser: editMode ? defaultValues.endUser : "",
    GPM: editMode ? defaultValues.GPM : 0,
    expectedDuration: editMode ? defaultValues.expectedDuration : 0,
    desc: editMode ? defaultValues.desc : ""
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [successOpen, setSuccessOpen] = useState(false);
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
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `/prospects/${defaultValues._id}`;
      response = await putData(endpoint, formValues);
    }
    else {
      endpoint = '/prospects';
      response = await postData(endpoint, formValues);
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
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="Prospect Name"
                name="prospectName"
                defaultValue={editMode ? defaultValues.prospectName : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} variant="outlined">
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
                label="End User"
                name="endUser"
                defaultValue={editMode ? defaultValues.endUser : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="GPM"
                name="GPM"
                type="Number"
                defaultValue={editMode ? defaultValues.GPM : 0}
                inputProps={{ min: 0, max:100}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Expected Duration"
                name="expectedDuration"
                type="Number"
                defaultValue={editMode ? defaultValues.GPM : 0}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MuiTextField
                variant="outlined"
                fullWidth
                id="desc"
                label="Descriptions"
                name="desc"
                multiline
                rows={4}
                defaultValue={editMode ? defaultValues.desc : ''}
                inputProps={{ maxLength: 500}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{border: '3 px solid #000000'}}></Grid>
            <Grid item xs={12} sm={12}>
              <h6><u>Payment Mehtod</u></h6>
            </Grid>
            <Grid item xs={12} sm={2}>
              <h6>Down Payment</h6>
            </Grid>
            
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
          />
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