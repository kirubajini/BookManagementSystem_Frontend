import React, { Component } from "react";
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
import { Style } from '@material-ui/icons';
import BookService from "../services/Book.Service";
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

export default class UpdateBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      url: "",
      isbn: "",
      price: "",
      language: "",
      genre: "",
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
  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  onChangeAuthor = (event) => {
    this.setState({
      author: event.target.value
    });
  }

  onChangeCoverPhotoURL = (event) => {
    this.setState({
      url: event.target.value
    });
  }

  onChangeISBNNumber = (event) => {
    this.setState({
      isbn: event.target.value
    });
  }

  onChangePrice = (event) => {
    this.setState({
      price: event.target.value
    });
  }

  onChangeSelectLangue = (event) => {
    this.setState({
      language: event.target.value
    });
  }

  onChangeSelectGenre = (event) => {
    this.setState({
      genre: event.target.value
    });
  }

  componentDidMount() {
    const BookId = this.props.match.params.id;
    // console.log(productId);
    if (BookId) {
        this.loadBook(BookId);
    }
      
  }

  


  loadBook = (BookId) => {
    // console.log("hoooooooooo");
    BookService.getBookById(BookId)
          .then((res) => {
              console.log(res)
              let Book = res.data;
              console.log(Book)
              this.setState({
                  id: Book.id,
                  title: Book.title,
                  author: Book.author,
                  url: Book.url,
                  isbn:Book.isbn,
                  price:Book.price,
                  language:Book.language,
                  genre:Book.genre
                  
                
              })
          });
  }


  //update user api
  updateBookById = (e) => {
            e.preventDefault();
            let BookBody = {
                  id: this.state.id,
                  Title: this.state.title,
                  Author: this.state.author,
                  Url: this.state.url,
                  Isbn:this.state.isbn,
                  Price:this.state.price,
                  Language:this.state.language,
                  Genre:this.state.genre
                
                  
                };
                console.log(BookBody)
                BookService.updateBookById(BookBody)
                
                .then(res => {
                  
                    this.setState({
                      message : 'Book updated successfully.',
                      snackbaropen:true,
                    });
                    setTimeout(()=> this.UpdateBook(), 3000) 

                    // this.props.history.push('/ViewProduct');
                });
          }
          UpdateBook = () =>{
            this.props.history.push("/ViewBook");
            window.location.reload();
          }
          reset(){
            window.location.reload();
          }

  render() {
    return (
        <div>
        <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.snackbarclose}anchorOrigin={{vertical:'top',horizontal:'right'}} >
        <Alert onClose={this.snackbarclose}  variant="filled"severity="success"style={{position:"fixed",right:"100px",width:'550px',zIndex:3,color:"black"}}>                                                                                                                                                                                                                                                                     
          {this.state.message}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        </Alert>
      </Snackbar>
        <Grid container spacing={1}>
        <Grid item xs={4}/>
        <Grid item xs={5} style={{backgroundColor:"black"}}>
          <Card className={style.root} style={{margin:20}}>
           <CardContent>
           <Paper variant="outlined">
             <form className={style.root} noValidate autoComplete="off" style={{width:'150%'}}onSubmit={this.updateBookById}>
                  {!this.state.successful && (
             <Grid container spacing={1}>
                      <Grid item xs={11}>
                        
                            <h5 style={{fontSize:30}}><AddBoxIcon Style={{fontSize:10}}/>Update  Book</h5>
                        
                       
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                        <TextField type="text" id="outlined-required" label="Title*" variant="outlined" helperText="Enter Book Title" style={{width:"100%"}} onChange={this.onChangeTitle} value={this.state.title} />
                        </FormControl>&emsp; &emsp; &emsp; 
                        

                        
                        <FormControl >
                        <TextField type="text" id="outlined-size-small" label="Author*" variant="outlined" helperText="Enter Book Author" onChange={this.onChangeAuthor} value={this.state.author} />
                        </FormControl>
                        </Grid>
                         
                        <Grid item xs={12}>
                        <FormControl>
                        <TextField type="text" id="outlined-required" label="Cover photo URL*" variant="outlined" helperText="Enter Book cover photo URL" onChange={this.onChangeCoverPhotoURL}value={this.state.url} />
                        </FormControl>&emsp; &emsp; &emsp; 
                        
                      

                      
                        <FormControl>
                        <TextField type="" id="outlined-required" label="ISBN Number*" variant="outlined" helperText="Enter Book ISBAN Number" onChange={this.onChangeISBNNumber} value={this.state.isbn} />
                        </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                        <FormControl >
                        <TextField type= "" id="outlined-required" label="price*" variant="outlined" helperText="Enter Book Price " size="small" onChange={this.onChangePrice} value={this.state.price}/>
                        </FormControl> &emsp; &emsp; 
                        

                        
                        <FormControl size="small"onChange={this.onChangeSelectLangue} value={this.state.language}>
                            <InputLabel>Language</InputLabel>
                            <NativeSelect
                              inputProps={{
                                  name:'Language',
                                  id: 'Language',
                                  
                              }}
                            >
                            <option value={"Select Language"}>Select Language</option>
                            <option value={"Tamil"}>Tamil</option>
                            <option value={"English"}>English</option>
                            <option value={"Science"}>Science</option>
                            </NativeSelect>
                            <FormHelperText>Please select your Language</FormHelperText>
                        </FormControl>&emsp; &emsp; 
                        
                        
                      
                        <FormControl size="small" onChange={this.onChangeSelectGenre} value={this.state.genre}>
                            <InputLabel>Genre</InputLabel>
                            <NativeSelect
                              inputProps={{
                                  name:'Genre',
                                  id: 'Genre',
                              }}
                            >
                            <option value={"Select Genre"}>Select Genre</option>
                            <option value={"Fantasy"}>Fantasy</option>
                            <option value={"Romance"}>Romance</option>
                            <option value={"Mystery"}>Mystery</option>
                            
                            </NativeSelect>
                            <FormHelperText>Please select your Genre</FormHelperText>

                        </FormControl>&emsp; &emsp; 
                        </Grid>
                        <Paper variant="outlined">
                        <Button href="/Save" variant="contained"onClick={this.updateBookById} style={{backgroundColor:'#1b5e20'}}> <SaveIcon style={{fontSize:20}}/>Save</Button>&emsp; &emsp; 
                        <Button  href="/Reset"variant="contained"onClick={this.reset} style={{backgroundColor:'#0d47a1'}}> <ReplayIcon style={{fontSize:20}}/>RESET</Button>&emsp; &emsp; 
                        <Button href="/ViewBook" variant="contained" style={{backgroundColor:'#0d47a1'}}><FormatListBulletedIcon style={{fontSize:20}}/>BOOK LIST</Button>
                        </Paper>
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




                        


                        
     
        
        
        
     