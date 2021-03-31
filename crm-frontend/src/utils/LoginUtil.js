import { makeStyles } from '@material-ui/core/styles';
import Crypto from 'crypto';

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

export const validateForm = (userEmail, password) => {
  return userEmail.length > 0 && password.length > 0;
}

const appSecret = 'ASDF1341NF351VSD';
export const hash = (string) => {
  return (Crypto
    .createHmac('sha256', appSecret)
    .update(string)
    .digest('hex')
  )
};

export const loginUser = async (credentials) => {
    credentials.password = hash(credentials.password);
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}