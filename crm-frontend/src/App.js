import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import LoginPage from './pages/LoginPage'
import Dasboard from './Dashboard'
import useToken from './utils/SetTokenUtil';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <Dasboard />
  );
}

export default App;
