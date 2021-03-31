// import components
import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Copyright from './components/Copyright';
import { mainListItems, secondaryListItems } from './components/NavigationList';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { useStyles, logout } from './utils/DashboardUtil';

// import Pages
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import DepartmentPage from './pages/DepartmentPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProspectPage from './pages/ProspectPage';
import QuotePage from './pages/QuotePage';
import UserPage from './pages/UserPage';
import AccountFormPage from './pages/AccountFormPage';
import ContactFormPage from './pages/ContactFormPage';
import DepartmentFormPage from './pages/DepartmentFormPage';
import ProspectFormPage from './pages/ProspectFormPage';
import UserFormPage from './pages/UserFormPage';
import QuoteFormPage from './pages/QuoteFormPage';

export default function Dashboard() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/account" component={AccountPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/department" component={DepartmentPage} />
            <Route path="/prospect" component={ProspectPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/quote" component={QuotePage} />
            <Route path="/form-account" component={AccountFormPage}></Route>
            <Route path="/form-contact" component={ContactFormPage}></Route>
            <Route path="/form-department" component={DepartmentFormPage}></Route>
            <Route path="/form-prospect" component={ProspectFormPage}></Route>
            <Route path="/form-user" component={UserFormPage}></Route>
            <Route path="/form-quote" component={QuoteFormPage}></Route>
            <Route component={NotFoundPage} />
          </Switch>
        <Copyright />
      </main>
    </div>
    </Router>
  );
};