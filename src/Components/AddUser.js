import React,{Component}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, FormControl, Typography,InputLabel, NativeSelect, FormHelperText, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import authService from '../services/auth.service';
import userService from '../services/user.Service';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'#212121',
    marginTop: 50,
    color: '#e0f7fa'
  },
  button: {
    fontSize: '20px'
  },
}

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      username: "",
      email: "",
      UserArr: [],
      roles: "",
      password: "",
      message: null,
      snackbaropen: false,
      successful: false
    };
  }
  snackbarclose = (event,reason) =>{
    if(reason ==="clickway"){
      return;
    }
    this.setState({snackbaropen: false});
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

  onChangeSelectRoles = (event) => {
    this.setState({
      roles: event.target.value
    });
    console.log(this.state.roles);
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  
  componentDidMount(){
    this.reloadUserList();
}
reloadUserList = () => {
  console.log("Hiiiiiiiiiiiiiiiiii")
  userService.getAllUsers()
    
    .then((Response) => {
        this.setState({UserArr:Response.data})
    })
   }

 
  handleAddUser = (event) => {
    event.preventDefault();

    authService.signup(
      this.state.username,
      this.state.email,
      this.state.password,
      [this.state.roles]
     
    ).then(
      response => {
        this.setState({
          message:response.data.message,
          successful: true,
          snackbaropen:true,
          severity:'success',
        });
         setTimeout(()=> this.User(), 3000) 
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
  User = () =>{
    this.props.history.push("/admin");
    window.location.reload();
  }
  reset(){
    window.location.reload();
  }


  render() {
    return (
      <div>
        <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.snackbarclose}anchorOrigin={{vertical:'top',horizontal:'right'}} >
        <Alert onClose={this.snackbarclose}  variant="filled"severity={this.state.severity}style={{position:"fixed",right:"100px",width:'550px',zIndex:3,color:"black"}}>                                                                                                                                                                                                                                                                     
          {this.state.message}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        </Alert>
      </Snackbar>
        <Grid container spacing={1}>
        <Grid item xs={4}/>
        <Grid item xs={5} style={{backgroundColor:"black",marginTop:160}}>
          <Card className={style.root} style={{margin:20 ,boxShadow:"10px 20px 25px black", border: "2px 5px 8px",marginTop:30,borderRadius:50,backgroundColor:"#e0e0e0"}}>
           <CardContent>
           <Paper variant="outlined" style={{borderRadius:50,backgroundColor:"#e0e0e0"}}>
             <form className={style.root} noValidate autoComplete="off" style={{width:'150'}}onSubmit={this.handleAddUser}>
                  {!this.state.successful && (
             <Grid container spacing={1}>
                      <Grid item xs={11}>
                       
                             <h5 style={{fontSize:30}}><AddBoxIcon Style={{fontSize:10}}/>Add New User</h5>
                      
                       
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                        <TextField type="text" id="outlined-required" label="Username*" variant="outlined" helperText="Enter Username" style={{width:"120%",marginLeft:20}}value={this.state.username} onChange={this.onChangeUsername} />
                        </FormControl>&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; 
                        

                        
                        <FormControl >
                        <TextField type="text" id="outlined-required" label="Email*" variant="outlined" helperText="Enter Email Address"  style={{width:"120%"}} value={this.state.email} onChange={this.onChangeEmail} />
                        </FormControl>
                        &emsp; &emsp; 
                        </Grid>
                         
                        <Grid item xs={12}>
                        <FormControl size="small"onChange={this.onChangeSelectRoles} value={this.state.roles} style={{marginLeft:20,width:250}}>
                            <InputLabel>Roles</InputLabel>
                            <NativeSelect
                              inputProps={{
                                  name:'Roles',
                                  id: 'Roles',
                                  
                              }}
                            >
                            <option value={"Select Roles"}>Select Roles</option>
                            <option value={"ROLE_USER"}>ROLE_USER</option>
                            <option value={"admin"}>ROLE_ADMIN</option>
                            </NativeSelect>
                            <FormHelperText>Please select your Roles</FormHelperText>
                        </FormControl>
                    
                       
                      

                       &emsp; &emsp;  &emsp; &emsp; &emsp; &emsp;
                        <FormControl>
                        <TextField type="" id="outlined-required" label="Password*" variant="outlined" helperText="Enter  Password" style={{width:"120%"}} value={this.state.password} onChange={this.onChangePassword} />
                        </FormControl>
                        </Grid>

                       
                        
                      
                        
                        <Grid item xs={12}>
                        <Button href="/save"  variant="contained" onClick={this.handleAddUser}style={{backgroundColor:'#1b5e20',marginLeft:320,color:"black" }}> <SaveIcon style={{fontSize:20}}/>Add</Button>&emsp; 
                        <Button  href=""variant="contained"onClick={this.reset} style={{backgroundColor:'#0d47a1',color:"black"}} onClick={this.reset}> <ReplayIcon style={{fontSize:20}}/>RESET</Button>&emsp;
                       <Button href="/userlist" variant="contained" style={{backgroundColor:'#0d47a1'}}><FormatListBulletedIcon style={{fontSize:20}}/>USER LIST</Button> 
                       
                        </Grid>
                 </Grid>   
                 )}
                
                </form>
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