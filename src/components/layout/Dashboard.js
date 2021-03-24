import React, { useState, useEffect } from "react";
import { Tabs, Tab, makeStyles, Paper, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import MyListings from "../profile/MyListings";
import ListingFormWrapper from "../profile/ListingFormWrapper";
import HomePage from "../home/HomePage";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import About from "../about/About";
import AuthTab from "../auth/AuthTab";
import LazyLoad from "react-lazyload";

const useStylesDashboard = makeStyles((theme) => ({
  tab: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 100,  
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: 35, 
      paddingLeft: 10, 
      paddingRight: 10, 
      fontSize: 12,
    },
  },
  name: {
    marginTop: 11,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  }
}));

export const AuthContext = React.createContext();
export const CacheContext = React.createContext();


function Dashboard() {
  const classes = useStylesDashboard();
  const [cacheReset, setCacheReset] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const currentTab = () => {
    const path = window.location.pathname;
    if (path === "/my-listings") return 1;
    else if (path === "/auth") return 1;
    else if (path === "/add-listing") return 2;
    else if (path === "/about" && !token) return 2;
    else if (path === "/about" && token) return 3;
    else return 0;
  };
  const [selectedTab, setSelectedTab] = useState(currentTab);

  useEffect(() => {
    const popStateListener = () => {
      const path = window.location.pathname
      if (path === "/my-listings") setSelectedTab(1);
      else if (path === "/auth") setSelectedTab(1);
      else if (path === "/add-listing") setSelectedTab(2);
      else if (path === "/about" && !token) setSelectedTab(2);
      else if (path === "/about" && token) setSelectedTab(3);
      else setSelectedTab(0);
    };
    window.addEventListener("popstate", popStateListener);

    return () => {
      window.removeEventListener("popstate", popStateListener);
    }
  }, [])
    
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogOut = () => {
    axios
    .post("/logout/", null, {
      headers: {
        "Authorization": `Token ${token}`,
      }})
    .then(response => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setSelectedTab(0);
    })
    .catch(error => {
        console.log(error);
    });
  };

  return (
    <Router>
      <Paper square elevation={4} id="dashboard"> 
        <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary" style={{ display: "flex" }}>
            <Tab className={classes.tab}  icon={<Home />} component={Link} to="/real-home" />
            {token && <Tab className={classes.tab} label="MY LISTINGS" component={Link}  to="/my-listings" />}
            {token && <Tab className={classes.tab}  label="ADD"  component={Link} to="/add-listing"/>}
            {token === null && <Tab className={classes.tab} label="Sign In / Up" component={Link}  to="/auth" />}   
            <Tab className={classes.tab} label="ABOUT" component={Link} to="/about" />
            <div style={{ flexGrow: 1 }} ></div>
            {user && <Typography className={classes.name} >Hi, {user.first_name}</Typography>}
            {token && <Tab className={classes.tab} label="LOG OUT" onClick={handleLogOut} component={Link} to="/log-out"/>}
        </Tabs>  
      </Paper>
        
      <Switch>
        <CacheContext.Provider value={{ cacheReset, setCacheReset }}>
          <Route path="/real-home">
            <HomePage user={user && user.first_name}/>
          </Route> 
          <Route exact path="/" render={() => (<Redirect exact from="/" to="/real-home" />)} /> 
          <Route exact path="/log-out" render={() => (<Redirect exact from="/log-out" to="/real-home" />)} />
          <Route path="/my-listings">
            <LazyLoad>
              <MyListings />
            </LazyLoad>
          </Route>
          <Route path="/add-listing">
            <ListingFormWrapper newListing={true} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          {token && <Route path="/auth" render={() => ( <Redirect exact from="/auth" to="/real-home" />)}/>}
          <Route path="/auth" >
            <AuthContext.Provider value={{ setSelectedTab }}>
              <AuthTab />
            </AuthContext.Provider>
          </Route>
        </CacheContext.Provider>
      </Switch>
    </Router>
  );
}

export default Dashboard;
