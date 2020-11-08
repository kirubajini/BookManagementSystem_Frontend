
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Typography } from '@material-ui/core';
import authService from '../services/auth.service';

const classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width:600
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
     
    },
   
  }));
  const style = {
    root: {
      minWidth: 275,
      backgroundColor:"#424242",
      marginTop: 20,
      color: 'white'
    },
    title: {
      fontSize: 24,
      textAlign:'center'
    },
}


  class Admin extends Component {
    constructor(){
      super();
      this.state = {
        showAdminBoard:false,
      }
    }
    
    UserAdd = (e) => {
      localStorage.removeItem("isLogin2");
      this.props.history.push('/adduser');
      window.location.reload();
    }
    UserUpdate = (e) => {
      this.props.history.push('/adduser');
      window.location.reload();
    }
    UserView = (e) => {
      this.props.history.push({pathname :'/role_user'});
      window.location.reload();
    }
    componentDidMount() {
      const user = authService.getCurrentUser();
        
      if (user) {
        this.setState({
          currentUser: authService.getCurrentUser(),
          showAdminBoard: user.roles.includes("ROLE_ADMIN")
        });
      }
  
      
    }
  
    render(){
      const{showAdminBoard} = this.state;
    return (
      <div>
        {showAdminBoard ? (
      <div className={classes.root}  style={{ padding: 10 }}>
          <center>
          <Paper style={{width:900}}>
              <Card style={style.root} variant="outlined">
                <div style = {{margin:30} }>
                  <center><h1 style={{fontFamily: 'Raleway',fontSize:60}}><strong>Welcome to Admin Panel</strong></h1></center>
                </div>
                <div style = {{margin:20} }>
                        <div style={{display:"flex"}}> 
                            <Paper className={classes.paper} style = {{backgroundColor : "#795548",marginLeft:50}}>
                            <center>
                                <PeopleIcon style={{ fontSize: 200,width:300 }}/>
                            </center>
                                <br/>
                                <p style = {{color: "white",fontSize:24,fontFamily: 'Raleway',fontStyle: 'bold',marginLeft:30}}>Manage Users</p>
                                <Button href="/AddUser" style={{fontSize:15,backgroundColor:"black",color:"white",marginLeft:13,marginBottom:14,width:120}}>Add user</Button>&emsp; &emsp;
                                <Button  href="/UserList" style={{ float: 'right',backgroundColor:"black",color:"white",marginRight: 13,width:110,marginBottom:0}}>View User</Button>
                            </Paper>
                        <Paper className={classes.paper} style = {{backgroundColor : "#795548",marginLeft:140}}>
                            <center>
                                <MenuBookIcon style={{ fontSize: 200 }}/>
                            </center>
                                <br/>
                                <p style = {{color: "white",fontSize:24,fontFamily: 'Raleway',fontStyle: 'bold',marginLeft:30,width:300}}>Manage Books</p>
                                <Button href="/AddBook" style={{fontSize:15,backgroundColor:"black",color:"white",marginLeft:2}}>Add Book</Button>&emsp;
                                <Button  href="/ViewBook" style={{ float: 'right',backgroundColor:"black",color:"white",marginRight:8 }}>View Books</Button>
                                <br/><br/>
                            </Paper>
                            </div>
                </div>
              </Card>
            </Paper>
            </center>
        </div>
        )
        :(
          <div>
            <Card style={{height:100,width:"100vw",backgroundColor:"wheat",marginTop:"5%",textAlign:"center"}}>
              <Typography style={{fontSize:40}}>Sorry, You don't have access to this page</Typography>
            </Card>
          </div>
          
        )}
        </div>
    )
  }
}

export default Admin