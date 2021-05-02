// components
import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
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
  Menu,
  MenuItem,
  ListItemIcon,
  Box,
  makeStyles,
} from "@material-ui/core";
import Copyright from "./components/Copyright";
import {
  primaryList,
  secondaryList,
  tertiaryList,
} from "./components/NavigationList";
import { Route, Switch, useHistory } from "react-router-dom";
// icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Pages
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/primary/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/primary/AccountPage";
import ContactPage from "./pages/primary/ContactPage";
import DepartmentPage from "./pages/primary/DepartmentPage";
import ProspectPage from "./pages/primary/ProspectPage";
import QuotePage from "./pages/primary/QuotePage";
import UserPage from "./pages/primary/UserPage";
import RevenuePage from "./pages/secondary/RevenuePage";
import SalesPage from "./pages/secondary/SalesPage";
import CompanyTreePage from "./pages/secondary/CompanyTreePage";
import ChatPage from "./pages/tertiary/ChatPage";

// utils
import { UserContext } from "./utils/Context";
import { logout } from "./utils/DashboardUtil";

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
    paddingTop: theme.spacing(10),
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  mainDiv: { 
    width: "98%", 
    margin: "auto" 
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
  logo: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

export default function Dashboard() {
  const styles = useStyles();
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [isAdmin, setIsAdmin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(null);

  useEffect(() => {
    setIsAdmin(user === "admin");
  }, [user]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAvatarMenuOpen(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarMenuOpen(null);
  };

  const AvatarMenuList = () => {
    return (
      <Menu
        anchorEl={avatarMenuOpen}
        keepMounted
        open={Boolean(avatarMenuOpen)}
        onClose={handleAvatarClose}
      >
        <Typography fontWeight="fontWeightBold">
          <Box fontWeight="fontWeightBold" m={1}>
            Signed in as
          </Box>
          <Box fontWeight="fontWeightLight" m={1}>
            {isAdmin ? 'admin' : user && user.userEmail}
          </Box>
        </Typography>  
        <Divider />
        {!isAdmin && 
          <MenuItem onClick={(e) => {history.push('/profile'); handleAvatarClose(e)}}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Your Porfile</Typography>
          </MenuItem>
        }
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    )
  }

  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(styles.appBar, drawerOpen && styles.appBarShift)}
      >
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              styles.menuButton,
              drawerOpen && styles.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={styles.title}
          >
            {user ? user.userEmail : ""}
          </Typography>
          <IconButton color="inherit" onClick={handleAvatarClick}>
            <Badge color="secondary">
              <Avatar
                alt={isAdmin || !user ? 'user' : `${user.userEmail}`}
                src="/images/kitten.jpg"
              />
            </Badge>
            <ArrowDropDownIcon />
          </IconButton>
          <AvatarMenuList />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            styles.drawerPaper,
            !drawerOpen && styles.drawerPaperClose
          ),
        }}
        open={drawerOpen}
      >
        <div className={styles.toolbarIcon}>
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
      <main className={styles.content}>
        <div className={styles.mainDiv}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/profile" exact component={ProfilePage} />
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
}
