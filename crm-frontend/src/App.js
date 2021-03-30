import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import Components
import NavigationBar from './components/NavigationBar';

// import Pages
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import DepartmentPage from './pages/DepartmentPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProspectPage from './pages/ProspectPage';
import QuotePage from './pages/QuotePage';
import UserPage from './pages/UserPage';

// import Utils
import useToken from './utils/SetTokenUtil';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div id="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/account" component={AccountPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/department" component={DepartmentPage} />
            <Route path="/prospect" component={ProspectPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/quote" component={QuotePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
