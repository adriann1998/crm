// components
import React, { useState } from 'react';
import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
    makeStyles
} from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../components/Copyright';

// utils
import PropTypes from 'prop-types';
import { validateForm, loginUser } from '../utils/LoginUtil';


export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login ( {setToken} ) {

  const [userEmail, setUserEmail] = useState(localStorage.userEmail ? localStorage.userEmail : "");
  const [password, setPassword] = useState(localStorage.password ? localStorage.password : "");
  const [rememberMe, setRememberMe] = useState(localStorage.userEmail && localStorage.password ? true: false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      userEmail,
      password
    });
    if (response.token) {
      setToken(response);
      if (rememberMe) {
        localStorage.userEmail = userEmail;
        localStorage.password = password;
      }
      else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("password");
      }
      setErrorMessage("");
    } 
    else {
      setErrorMessage("Incorrect username or password");
      setPassword("");
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {errorMessage.length > 0 &&  
            <Alert variant="danger">{errorMessage}</Alert>
          }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            autoFocus
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox 
                value="remember"
                color="primary" 
                checked={rememberMe}
              />}
            label="Remember me"
            onChange={handleRememberMe}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm(userEmail, password)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
    </Container>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};