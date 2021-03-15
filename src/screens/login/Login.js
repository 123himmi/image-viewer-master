import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';

import {
  Card,
  FormControl,
  Input,
  InputLabel,
  Button
} from "@material-ui/core";



class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      validateCredentials: true,
      emptyUsername: false,
      emptyPassword: false
    };
  }


  handleChange(e, type) {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
  }
  handleClick = () => {
    const user = "user";
    const pwd = "user";
    const { username, password } = this.state;
    if (username !== "" || password !== "") {
      this.setState({
        emptyUsername: false,
        emptyPassword: false,
        validateCredentials: true
      });
      if (username === "") {
        this.setState({ emptyUsername: true });
        return;
      }
      if (password === "") {
        this.setState({ emptyPassword: true });
        return;
      }
    } else {
      this.setState({ emptyUsername: true, emptyPassword: true });
      return;
    }
    if (username === user && password === pwd) {
      console.log("test");
      this.setState({ validateCredentials: true });
      sessionStorage.setItem(
        "accessToken",
        "IGQVJWRklhbEtkeUhwQmFyUHhzZAnFKUDlDdXhaQU9aLVJ4YnRMbWhmd05NOFBUYWw3TWJzc2RfaXl3ZA1pNN3RXd0VFTWtnQk5LTms5UVJNdTdFRjdzczVNTVcyS2dsQXdDMExFakhXYmxZAZAUVRRzFEYwZDZD"
      );
      console.log("testtt");

      console.log(sessionStorage.getItem('access_token'));
      window.location = "/home";
    } else {
      console.log("test");
      this.setState({ validateCredentials: false });
    }
  };

  render() {
    const { validateCredentials, emptyUsername, emptyPassword } = this.state;

    return (
      <div className="login-wrapper">
        <Header />
        <Card className="login-card">
          <h3 className="login-heading">Login</h3>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel htmlFor="username">Username *</InputLabel>
            <Input id="username" onChange={e => this.handleChange(e, "username")} />
            {emptyUsername ? <span className="error">required</span> : null}
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel htmlFor="password">Password *</InputLabel>
            <Input id="password" type="password" onChange={e => this.handleChange(e, "password")} />
            {emptyPassword ? <span className="error">required</span> : null}
            {!validateCredentials ? (
              <span className="error">Incorrect username and/or password</span>
            ) : null}
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            className="login-btn m1"
            onClick={this.handleClick}>LOGIN</Button>
        </Card>
      </div>
    );
  }
}

export default Login;