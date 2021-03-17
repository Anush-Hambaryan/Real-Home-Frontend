import React, {useState} from 'react';
import {Paper, Tabs, Tab, Link, Typography, makeStyles} from '@material-ui/core/';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{bottom: 0}}>
      {'Copyright © '}
      <Link color="inherit" href="/real-home">
        Real Home
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function AuthTab(props) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [message, setMessage] = useState('')
  const [windowHeight, setwindowHeight] = useState(window.innerHeight)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  window.onresize = function(event) {
    setwindowHeight(window.innerHeight)
  };
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  return (
    <Paper style={{margin: 10, padding: 20}} elevation={6} square>
    <Tabs  value={selectedTab} onChange={handleChange} centered indicatorColor="primary">
      <Tab label="Sign in"/>
      <Tab label="Sign up"/>
    </Tabs>
      <div style={{ display: "flex", minHeight: windowHeight - 176, flexDirection: 'column'}}>
      {selectedTab === 0 ? 
      <SignIn styles={useStyles} message={message} handleClose={props.handleClose} /> : 
      <SignUp styles={useStyles} setSelectedTab={setSelectedTab} setMessage={setMessage}/>}
      </div>
      <Copyright />
    </Paper>
  )
}

export default AuthTab

