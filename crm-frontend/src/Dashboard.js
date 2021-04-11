// import components
import React from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Copyright from './components/Copyright';
import { mainListItems, secondaryListItems } from './components/NavigationList';
import {
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import { logout } from './utils/DashboardUtil';

// import Pages
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import DepartmentPage from './pages/DepartmentPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProspectPage from './pages/ProspectPage';
import QuotePage from './pages/QuotePage';
import UserPage from './pages/UserPage';
import AccountFormPage from './pages/forms/AccountFormPage';
import ContactFormPage from './pages/forms/ContactFormPage';
import DepartmentFormPage from './pages/forms/DepartmentFormPage';
import ProspectFormPage from './pages/forms/ProspectFormPage';
import UserFormPage from './pages/forms/UserFormPage';
import QuoteFormPage from './pages/forms/QuoteFormPage';

const drawerWidth = 210;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingTop: theme.spacing(10)
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  }
}));

export default function Dashboard() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [pageTitle, setPageTitle] = React.useState("Dashboard");

  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let newTitle = "Dashboard";

    switch(location.pathname) {
      case "/account": newTitle = "Acount"; break;
      case "/contact": newTitle = "Contact"; break;
      case "/department": newTitle = "Departement"; break;
      case "/prospect": newTitle = "Prospect"; break;
      case "/quote": newTitle = "Quote"; break;
      case "/user": newTitle = "User"; break;
      default: newTitle = "Dashboard";

    };
    setPageTitle(newTitle);
  }, [location]);

  return (
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
            {pageTitle}
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
        <div style={{width: '98%', margin:"auto"}}>
          <Switch>
            <Route path="/" exact component={HomePage}  />
            <Route path="/accounts" component={AccountPage} />
            <Route path="/contacts" component={ContactPage} />
            <Route path="/departments" component={DepartmentPage} />
            <Route path="/prospects" component={ProspectPage} />
            <Route path="/quotes" component={QuotePage} />
            <Route path="/users" component={UserPage} />
            <Route path="/form/accounts" component={AccountFormPage}></Route>
            <Route path="/form/contacts" component={ContactFormPage}></Route>
            <Route path="/form/departments" component={DepartmentFormPage}></Route>
            <Route path="/form/prospects" component={ProspectFormPage}></Route>
            <Route path="/form/quotes" component={QuoteFormPage}></Route>
            <Route path="/form/users" component={UserFormPage}></Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <Copyright />
      </main>
    </div>
  );
};