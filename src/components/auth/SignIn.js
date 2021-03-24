import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, CssBaseline, TextField, Container, Typography } from "@material-ui/core/";
import { AuthContext } from "../layout/Dashboard";

export default function SignIn(props) {
  const classes = props.styles();

  const authContext = useContext(AuthContext);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    const user = { username, password };
    axios
      .post("/login/", null, { auth: user })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        authContext.setSelectedTab(0);
      })
      .catch((error) => {
        setError("Incorrect password or username");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="caption" color="secondary">
          {props.message}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            error={error}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            error={error}
          />

          <Typography variant="caption" color="secondary">
            {error}
          </Typography>
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={loginUser}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
