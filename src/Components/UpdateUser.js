import React,{Component}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, FormControl, Typography,InputLabel, NativeSelect, FormHelperText } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import authService from '../services/auth.service';
import userService from '../services/user.Service';


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

export default class updateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      username: "",
      email: "",
      UserArr: [],
      roles: "",
      password: "",
      message: null,
      successful: false
    };
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
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  
componentDidMount() {
    const id = this.props.match.params.id;
    // this.setState({id: id})
    if(id){
        this.loadUser(id);
    }
  }

 loadUser =(id) =>{
     userService.getUserById(id)
     
     .then((res) =>{
      console.log(res)
         let User = res.data;
         this.setState({
             id:User.id,
             username:User.username,
             email:User.email,
            //  password:User.password,
             //roles:User.roles,
             //roles:submitRole,
         })
         {
          User.roles.map(role =>(
            role.name.includes("ROLE_USER") && (
              this.setState({roles:'user'})
            ),
            role.name.includes("ROLE_ADMIN") && (
              this.setState({roles:'admin'})
            )
          ))
        }
     })

     
 }

 updateUser = (e) =>{
     e.preventDefault();
     let UserBody ={
        id:this.state.id,
         username:this.state.username,
         email:this.state.email,
         //password:this.password,
         updateroles:[this.state.roles]
     };
     console.log(UserBody)
     userService.updateUser(UserBody)
     .then(res => {
       console.log(res)
         this.setState({
           message:'User Updated successfully.',
           snackbaropen:true,
          });
          // setTimeout(()=> this.UpdateProduct(), 3000) 
        //  this.props.history.push('/UserDetails')
        window.location.reload();

      });
 }
 reset(){
  window.location.reload();
}
  render() {
    return (
        <Grid container spacing={1}>
        <Grid item xs={4}/>
        <Grid item xs={5} style={{backgroundColor:"black",marginTop:150}}>
          <Card className={style.root} style={{margin:20 ,boxShadow:"10px 20px 25px black", border: "2px 5px 8px",marginTop:30,borderRadius:50,backgroundColor:"#e0e0e0"}}>
           <CardContent>
           <Paper variant="outlined" style={{borderRadius:50,backgroundColor:"#e0e0e0"}}>
             <form className={style.root} noValidate autoComplete="off" style={{width:'150'}}onSubmit={this.handleAddUser}>
                  {!this.state.successful && (
             <Grid container spacing={1}>
                      <Grid item xs={11}>
                       
                             <h5 style={{fontSize:30}}><AddBoxIcon Style={{fontSize:10}}/>Update User</h5>
                      
                       
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                        <TextField  disabled type="text" id="outlined-required" label="Username*" variant="outlined" helperText="Enter Username" style={{width:"120%",marginLeft:20}}value={this.state.username} onChange={this.onChangeUsername} />
                        </FormControl>&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; 
                        

                        
                        <FormControl >
                        <TextField type="text" id="outlined-required" label="Email*" variant="outlined" helperText="Enter Email Address"  style={{width:"120%"}} value={this.state.email} onChange={this.onChangeEmail} />
                        </FormControl>
                        &emsp; &emsp; 
                        </Grid>
                         
                        <Grid item xs={12}>
                        <FormControl size="small"style={{marginLeft:20,width:250}}>
                            <InputLabel>Roles</InputLabel>
                            <NativeSelect
                              inputProps={{
                                  name:'Roles',
                                  id: 'Roles',
                                  
                              }}
                              onChange={this.onChangeSelectRoles} value={this.state.roles} 
                            >
                            <option value={"Select Roles"}>Select Roles</option>
                            <option value={"user"}>ROLE_USER</option>
                            <option value={"admin"}>ROLE_ADMIN</option>
                            </NativeSelect>
                            <FormHelperText>Please select your Roles</FormHelperText>
                        </FormControl>&emsp; &emsp;  &emsp; &emsp; &emsp; &emsp;
                       
                      

                      
                        {/* <FormControl>
                        <TextField type="" id="outlined-required" label="Password*" variant="outlined" helperText="Enter  Password" style={{width:"120%"}} value={this.state.password} onChange={this.onChangePassword} />
                        </FormControl> */}
                        </Grid>

                       
                        
                      
                        
                        <Grid item xs={12}>
                        <Button href="/save"  variant="contained" onClick={this.updateUser}style={{backgroundColor:'#1b5e20',marginLeft:280,color:"black" }}> <SaveIcon style={{fontSize:20}}/>Update</Button>&emsp; 
                        <Button  href=""variant="contained" style={{backgroundColor:'#0d47a1',color:"black"}} onClick={this.reset}> <ReplayIcon style={{fontSize:20}}/>RESET</Button>&emsp;
                       <Button href="/userlist" variant="contained" style={{backgroundColor:'#0d47a1'}}><FormatListBulletedIcon style={{fontSize:20}}/>USER LIST</Button> 
                        {/* <Button href="/Save" variant="contained"onClick={this.handleAddUser} style={{backgroundColor:'#1b5e20'}}> <SaveIcon style={{fontSize:20}}/>Save</Button>&emsp; &emsp; 
                        <Button  href="/Reset"variant="contained" style={{backgroundColor:'#0d47a1'}}> <ReplayIcon style={{fontSize:20}}/>RESET</Button>&emsp; &emsp; 
                        <Button href="/userlist" variant="contained" style={{backgroundColor:'#0d47a1'}}><FormatListBulletedIcon style={{fontSize:20}}/>USER LIST</Button> */}
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
                
                </form>
                </Paper>
              </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
    );
                            
}
}