import React, { useState } from 'react';
import { 
  Avatar, 
  Button, 
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
  Collapse
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { useStyles, postData, putData } from '../../utils/FormUtil';
import { useHistory, useLocation, Link } from "react-router-dom";

export default function DepartmentFormPage ( ) {

  const location = useLocation();
  const defaultValues = location.state ? location.state.defaultValues : undefined;
  const editMode = defaultValues !== undefined;
  
  const classes = useStyles();
  const history = useHistory();

  const [departmentName, setDepartmentName] = useState(editMode ? defaultValues.departmentName : "");
  const [directorId, setDirectorId] = useState(editMode ? (defaultValues.director ? defaultValues.director._id : "") : "");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      departmentName: departmentName,
      director: directorId ? directorId : null
    };
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `/departments/${defaultValues._id}`;
      response = await putData(endpoint, formData);
    }
    else {
      endpoint = '/departments';
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

  const handleSuccessAlertClose = () => {
    history.push("/department");
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HomeWorkIcon />
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
        {editMode ? "Edit Department" : "New Department"} 
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="departmentName"
                label="Department Name"
                name="departmentName"
                autoFocus
                defaultValue={editMode ? defaultValues.departmentName : ''}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="Director ID"
                label="Director ID"
                name="directorId"
                defaultValue={editMode ? (defaultValues.director ? defaultValues.director._id : '') : ''}
                onChange={(e) => setDirectorId(e.target.value)}
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
          <Link to="/department">Cancel</Link>
          </div>
        </form>
      </div>
    </Container>
  );
}