import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage'
import Dasboard from './Dashboard'
import useToken from './utils/SetTokenUtil';
import { UserContext } from './utils/UserContext';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        {!token ? <LoginPage setToken={setToken} /> : <Dasboard />}
      </Router>
    </UserContext.Provider>
  )
}

export default App;
