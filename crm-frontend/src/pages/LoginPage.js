import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Alert } from 'react-bootstrap';
import crypto from 'crypto';
import '../styles/pages/LoginPage.scss';


const appSecret = 'ASDF1341NF351VSD';
const hash = (string) => {
  return (crypto
    .createHmac('sha256', appSecret)
    .update(string)
    .digest('hex')
  )
};

async function loginUser(credentials) {
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

function LoginPage ( {setToken} ) {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = React.useState("")

    function validateForm() {
      return userEmail.length > 0 && password.length > 0;
    }

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
          setErrorMessage("Incorrect username or password")
        }
    };

    return(
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          {errorMessage.length > 0 &&  
            <Alert variant="danger">{errorMessage}</Alert>
          }
          <Form.Group size="lg" controlId="userEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage;