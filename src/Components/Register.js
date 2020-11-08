import React, { Component } from "react";


import { Card, CardContent, Grid, FormControl, Typography, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import authService from "../services/auth.service";

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";



const style = {
  root: {
    minWidth: 250,
    backgroundColor:'#212121',
   
    color: '#e0f7fa'
  },
  button: {
    fontSize: '20px'
  },
}

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      message: "",
      snackbaropen: false,
      successful: false
    };
  }
  snackbarclose = (event,reason) =>{
    if(reason ==="clickway"){
      return;
    }
    this.setState({snackbaropen: false});
    this.props.history.push("/login");
  }

componentDidMount(){
  ValidatorForm.addValidationRule('isName',(value)=> {
    if((this.state.username.length >3) && (this.state.username.length <30)){
      return true;
    }
    return false;
  });
  ValidatorForm.addValidationRule('isEmail',(value)=> {
    if((this.state.email.length >6) && (this.state.email.length <20)){
      return true;
    }
    return false;
  });
  ValidatorForm.addValidationRule('isPassword',(value)=> {
    if((this.state.password.length >4) && (this.state.password.length <20)){
      return true;
    }
    return false;
  });
}  

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  handleRegister = (event) => {
    event.preventDefault();
     
  this.setState({
    message:"",
    successful:false
  });

  authService.signup(
    this.state.username,
    this.state.email,
    this.state.password,
   
  ).then(
    response => {
      this.setState({
        message:response.data.message,
        successful: true,
        snackbaropen:true,
        severity:'success',
      });
      // setTimeout(()=> this.login(), 3000) 
    },
    error => {
      const resMessage = 
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

      this.setState({
        successful: false,
        message: resMessage,
        snackbaropen:true,
        severity:'error',
      });
    }
    
  );

  }

  render() {
    return (
      <div>
         <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.snackbarclose}anchorOrigin={{vertical:'top',horizontal:'right'}} >
        <Alert onClose={this.snackbarclose}  variant="filled"severity={this.state.severity}style={{position:"fixed",right:"100px",width:'550px',zIndex:3,color:"black"}}>                                                                                                                                                                                                                                                                     
          {this.state.message}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        </Alert>
      </Snackbar>
      <Grid container style={{margin:40,borderRadius:50}}>
        <Grid item xs={4}/>
        <Grid item xs={4} style={{backgroundColor:"black",marginTop:130,borderRadius:50}}>
          <Card style={style.root} >
              <CardContent>
              <Paper variant="outlined" style={{borderRadius:50,backgroundColor:"#e0e0e0" }}>
                <ValidatorForm onSubmit={this.handleRegister}>
                  {!this.state.successful && (
                  <Grid container spacing={1}>
                      <Grid item xs={11}>
                        <h1 style={{color:"blue",fontFamily: 'Raleway',fontSize:40,marginLeft:10}}>Register Account at Books Shop</h1>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                        <TextValidator
                        style={{marginLeft:150}}
                        id="filled-helperText" 
                        label="Username" 
                        defaultValue="text" 
                        helperText="please enter username" 
                        variant="outlined"
                         value={this.state.username}
                         onChange={this.onChangeUsername}
                         validators={['required',"isName"]}
                          errorMessages={["This field is not empty","Enter a valid user name"]}
                         />
                            
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                        <TextValidator
                        style={{marginLeft:150}}
                         id="filled-helperText"
                          label="Email"
                           defaultValue="text" 
                           helperText="please enter email"
                            variant="outlined" 
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            validators={['required',"isEmail"]}
                            errorMessages={["This field is not empty","Enter a valid  email"]}
                            />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                        <TextValidator
                        style={{marginLeft:150}}
                        id="filled-helperText"
                         label="Password" 
                         defaultValue="text"
                          helperText="please enter password"
                           variant="outlined" 
                           value={this.state.password}
                            onChange={this.onChangePassword}
                            validators={['required',"isPassword"]}
                          errorMessages={["This field is not empty","Enter a valid password"]}
                            />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <button   type="submit"style={{backgroundColor:"blue",marginLeft:180,fontSize:"20px"}}>Sign Up</button>
                        </FormControl>
                      </Grid>
                      </Grid>
                  )}
                      {this.state.message && (
                    <div>
                      <Typography color='error' variant="overline" display="block" gutterBottom>
                          <strong>{this.state.message}</strong>
                      </Typography>
                    </div>
                  )}
                </ValidatorForm>
                </Paper>
              </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
      </div>
    );
  }
}