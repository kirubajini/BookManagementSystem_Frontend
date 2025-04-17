import React, { Component } from "react";

import { Card, CardContent, Grid, FormControl } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AuthService from "../services/auth.service";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

const style = {
  root: {
    minWidth: 20,
    backgroundColor: "#212121",
    marginTop: 200,
    color: "blue",
  },
  button: {
    fontSize: "20px",
  },
};
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      message: "",
      snackbaropen: false,
      loading: false,
    };
  }
  snackbarclose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    this.setState({ snackbaropen: false });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isName", (value) => {
      if (this.state.username.length > 3 && this.state.username.length < 30) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule("isPassword", (value) => {
      if (this.state.password.length > 4 && this.state.password.length < 35) {
        return true;
      }
      return false;
    });
  }

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = (event) => {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(this.state.username, this.state.password).then(
      (response) => {
        console.log("response");
        console.log(response);
        localStorage.setItem("userid", response.id);
        this.setState({
          message: "User  Login Successfully",
          successful: true,
          snackbaropen: true,
          severity: "success",
        });
        setTimeout(() => this.User(), 3000);
      },

      (error) => {
        console.log(error.response.status);

        const resMessage =
          (error.response.status === "401" && " Username/Password is wrong") ||
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
          snackbaropen: true,
          severity: "error",
        });
      }
    );
  };
  User = () => {
    this.props.history.push("/Home");
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarclose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={this.snackbarclose}
            variant="filled"
            severity={this.state.severity}
            style={{
              position: "fixed",
              right: "100px",
              width: "550px",
              zIndex: 3,
              color: "black",
            }}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4} />
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Card style={style.root}>
              <CardContent>
                <Paper
                  variant="outlined"
                  style={{ borderRadius: 50, backgroundColor: "#e0e0e0" }}
                >
                  <ValidatorForm onSubmit={this.handleLogin}>
                    <Grid container spacing={1}>
                      <Grid item xs={11}>
                        <strong>
                          <h1
                            style={{
                              color: "blue",
                              fontFamily: "Raleway",
                              fontSize: 40,
                              marginLeft: 10,
                            }}
                          >
                            Login to Books Shop
                          </h1>
                        </strong>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <TextValidator
                            style={{ width: 250, marginLeft: 10 }}
                            type="text"
                            helperText="Please enter your username"
                            label="Username"
                            id="outlined-size-small"
                            variant="outlined"
                            backgroundColor="blue"
                            size="small"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validators={["required", "isName"]}
                            errorMessages={[
                              "This field is not Empty",
                              " Username must be more than 4 characters",
                            ]}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <TextValidator
                            style={{ width: 250, marginLeft: 10 }}
                            type="password"
                            helperText="Please enter password"
                            label="Password"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validators={["required", "isPassword"]}
                            errorMessages={[
                              "This field is not Empty",
                              "Password must be more than 4 characters",
                            ]}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <button
                            style={{
                              backgroundColor: "blue",
                              marginLeft: 50,
                              fontSize: "20px",
                            }}
                          >
                            Login
                          </button>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </div>
    );
  }
}
