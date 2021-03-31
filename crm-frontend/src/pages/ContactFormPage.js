import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles, submitForm } from '../utils/FormUtil';
import { useHistory, Link } from "react-router-dom";

export default function ContactFormPage ( ) {
  
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [account, setAccount] = useState("");
  const [contactTitle, setContacTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [officePhone, setOfficePhone] = useState("");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/contacts';
    const formData = {
      name: {
        firstName: firstName,
        lastname: lastName ? lastName : undefined
      },
      account: account,
      contactTitle: contactTitle ? contactTitle : undefined,
      contactEmail: contactEmail ? contactEmail : undefined,
      contactPhone: {
        mobile: mobilePhone,
        work: workPhone ? workPhone : undefined,
        office: officePhone ? officePhone : undefined
      }
    };
    const response = await submitForm(endpoint, formData);
    if (!response._id) {
      setSuccessOpen(false);
      setErrorOpen(true);
    }
    else {
      setErrorOpen(false);
      setSuccessOpen(true);
    }
  };

  const handleSuccessAlertClose = () => {
    history.push("/contact");
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PeopleIcon />
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
          New Contact
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                onChange={(e) => setfirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="contactTitle"
                label="Contact Title"
                name="contactTitle"
                onChange={(e) => setContacTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="contactEmail"
                label="Contact Email"
                name="contactEmail"
                type="email"
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="accountId"
                label="Account ID"
                name="accountId"
                inputProps={{ maxLength: 24, minLength: 24 }}
                onChange={(e) => setAccount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobilePhone"
                label="Mobile PhoneNumber"
                name="mobilePhone"
                onChange={(e) => setMobilePhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="workPhone"
                label="Work Phone Number"
                name="workPhone"
                onChange={(e) => setWorkPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="officePhone"
                label="Office Phone"
                name="officePhone"
                onChange={(e) => setOfficePhone(e.target.value)}
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
          <Link to="/contact">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}