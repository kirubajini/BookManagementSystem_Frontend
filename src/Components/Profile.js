import React, { Component } from "react";
import { Typography, Card, CardContent, Paper, Grid } from '@material-ui/core';
import authService from "../services/auth.service";

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'#e0e0e0',
    marginTop: 20,
    height: 400,
    color: 'black'
  },
  title: {
    fontSize: 14,
  },
  paper: {
    spacing: 2,
    textAlign: 'left',
    backgroundColor: '#e0e0e0',
    color: 'black',
    
  },
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <Paper style={{marginTop:200,borderRadius:50,border:"50px"}}>
              <Card style={style.root} variant="outlined">
                <CardContent>
                  <Typography style={style.title} gutterBottom>
                    {console.log(currentUser.username)}
                    <h1>Profile : {currentUser.username}</h1>
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Role : </strong>
                        
                        {currentUser.roles}
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4}/>
        </Grid>
      </React.Fragment>
    );
  }
}