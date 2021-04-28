// import components
import React, { useState, useContext } from 'react';
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
  Avatar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Copyright from './components/Copyright';
import { primaryList, secondaryList, tertiaryList } from './components/NavigationList';
import {
  Route,
  Switch
} from 'react-router-dom';
import { logout } from './utils/DashboardUtil';

// import Pages
import HomePage from './pages/primary/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AccountPage from './pages/primary/AccountPage';
import ContactPage from './pages/primary/ContactPage';
import DepartmentPage from './pages/primary/DepartmentPage';
import ProspectPage from './pages/primary/ProspectPage';
import QuotePage from './pages/primary/QuotePage';
import UserPage from './pages/primary/UserPage';
import RevenuePage from './pages/secondary/RevenuePage';
import SalesPage from './pages/secondary/SalesPage';
import CompanyTreePage from './pages/secondary/CompanyTreePage';
import ChatPage from './pages/tertiary/ChatPage';

// utils
import { UserContext } from './utils/Context';

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
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Dashboard() {

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const {user} = useContext(UserContext)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            {user ? user.userEmail : ''} 
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={(e) => {alert("hello")}}>
            <Badge color="secondary">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
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
        <List>{primaryList}</List>
        <Divider />
        <List>{secondaryList}</List>
        <Divider />
        <List>{tertiaryList}</List>
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
            <Route path="/revenues" component={RevenuePage}></Route>
            <Route path="/sales" component={SalesPage}></Route>
            <Route path="/chat" component={ChatPage}></Route>
            <Route path="/companytree" component={CompanyTreePage}></Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <Copyright />
      </main>
    </div>
  );
};