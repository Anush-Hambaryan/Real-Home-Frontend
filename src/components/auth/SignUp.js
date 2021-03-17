import React, {useState} from 'react';
import {Button, CssBaseline, TextField, Grid, Container} from '@material-ui/core/';
import axios from "axios";

export default function SignUp(props) {
  const classes = props.styles();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '', 
    })

  const [errors, setErrors] = useState({})

  const registerUser = (e) => {
    e.preventDefault()
    axios.post('/users/', user)
    .then(response => {
        props.setMessage("Registered successfully! Please sign in.")
        props.setSelectedTab(0)
    })
    .catch(error => {
        if (error) setErrors(error.response.data)
    })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined" required fullWidth
                label="First Name"
                value={user.first_name}
                onChange={e =>{setUser({...user, first_name: e.target.value}); setErrors({...errors, first_name: ""})}}
                error={errors.first_name ? true : null}
                helperText={errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined" required fullWidth
                label="Last Name"
                value={user.last_name}
                onChange={e =>{setUser({...user, last_name: e.target.value}); setErrors({...errors, last_name: ""})}}
                error={errors.last_name ? true: null}
                helperText={errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth
                type="email"
                label="Email Address"
                value={user.email}
                onChange={e =>{setUser({...user, email: e.target.value}); setErrors({...errors, email: ""})}}
                error={errors.email ? true : null}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth
                label="Username"
                value={user.username}
                onChange={e =>{setUser({...user, username: e.target.value}); setErrors({...errors, username: ""})}}
                error = {errors.username ? true : null}
                helperText = {errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth
                label="Password"
                type="password"
                value={user.password}
                onChange={e =>{setUser({...user, password: e.target.value}); setErrors({...errors, password: ""})}}
                error = {errors.password ? true : null}
                helperText = {errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth
                label="Confirm Password"
                type="password"
                value={user.password_confirmation}
                onChange={e =>{setUser({...user, password_confirmation: e.target.value}); setErrors({...errors, password_confirmation: ""})}}
                error = {errors.password_confirmation ? true : null}
                helperText = {errors.password_confirmation}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}