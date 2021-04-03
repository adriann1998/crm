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
    Container
} from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../components/Copyright';

// utils
import PropTypes from 'prop-types';
import { useStyles, validateForm, loginUser } from '../utils/LoginUtil';

export default function Login ( {setToken} ) {

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      userEmail,
      password
    });
    if (token.token) {
      setToken(token);
      setErrorMessage("");
    } 
    else {
      setErrorMessage("Incorrect username or password");
      setPassword("");
    }
  };

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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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