import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import LoginPage from './pages/LoginPage'
import Dasboard from './Dashboard'
import useToken from './utils/SetTokenUtil';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {
  const { token, setToken } = useToken();

  return <Router>
    {!token ? <LoginPage setToken={setToken} /> : <Dasboard />}
  </Router>
}

export default App;
