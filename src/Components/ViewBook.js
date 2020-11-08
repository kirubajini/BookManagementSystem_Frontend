
import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Checkbox,  TableContainer,InputAdornment,  Paper, Grid,InputBase,TextField} from '@material-ui/core';
import userService from '../services/user.Service';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";
import BookService from '../services/Book.Service';






const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const style ={
  table: {
        minWidth: 900,
      },
      grid: {
          margin: '35px 150px 20px 50px',
          padding: '10px 10px 10px 10px',
          backgroundColor: "black"
      },
      paper: {
        padding: '10px 10px 10px 10px', 
        margin: '10px 10px 10px 10px',
        position: 'inherit'
      },
      search: {
        position: 'relative',
        align:'left',
        },
}

class ViewBook extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
            
            BookArr:[],
            page:0,
            rowsPerPage:5,
            count:0,
            message: null,
            snackbaropen: false,
            search:""
        }
        
    }

    snackbarclose = (event,reason) =>{
      if(reason ==="clickway"){
        return;
      }
      this.setState({snackbaropen: false});
    }
    componentDidMount(){
        this.reloadBookList();
      }
  
  
      handleChangePage = (event, newPage) => {
        this.setState({
          page:newPage
        });
        BookService.getAllBookInPage(newPage,this.state.rowsPerPage)
        .then((Response) => {
          this.setState({
            BookArr:Response.data.data,
            count:Response.data.TotalNoOfElements
           })
        })
      };
    
      handleChangeRowsPerPage = (event) => {
        //setRowsPerPage(parseInt(event.target.value, 10));
        this.setState ({
          page:0,
          rowsPerPage:event.target.value
        })
        BookService.getAllBookInPage(this.state.page,event.target.value)
        .then((Response) => {
          this.setState({
            BookArr:Response.data.data,
            count:Response.data.TotalNoOfElements
           })
        })
      };
      
    
      reloadBookList = () => {
        BookService.getAllBookInPage(this.state.page,this.state.rowsPerPage)
           .then((Response) => {
             this.setState({
                BookArr:Response.data.data,
               count:Response.data.TotalNoOfElements
              })
           })
      }
       deleteBook = (BookId) => {
        
         
          BookService.deleteBookById(BookId)
             .then(res => {
                 this.setState({
                   message : 'Book deleted successfully.',
                   snackbaropen:true,
                   severity:'error',
                  });
                 this.setState({
                    BookArr: this.state.BookArr.filter(BookArr => BookArr !== BookId),
                   snackbaropen:true,
                   severity:'error',
                  });
             })
            }

            searchedBook =(e) =>{
              this.setState({
                name:e.target.value
              })
              BookService.searchedBook(e.target.value,0)
              .then((Response) =>{
                this.setState({
                  BookArr:Response.data.data,
                })
              })
        
              
         }
   onClearText = () =>{
    this.setState({
      name:"",
    })
    this.reloadBookList();
  }
  
    render() {

        const {users} = this.state;
        console.log(users)

        return (
          <div>
            <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.snackbarclose} anchorOrigin={{vertical:'top',horizontal:'right'}}>
        <Alert onClose={this.snackbarclose}  variant="filled" severity="error"style={{position:"fixed",right:"100px",width:'550px',zIndex:3}}>
          {this.state.message}
        </Alert>
      </Snackbar>
    <Grid style={style.grid}>
       <Paper style = {style.paper}>
         <h1>View book</h1>
         <div style={style.search}>
             <div style={style.searchIcon} style = {{float: 'right'}}>
            
            
              <TextField onChange={this.searchedBook} value={this.state.username}
          id="input-with-icon-textfield"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>this.onClearText()}>
                  <CloseIcon/>
                </IconButton>
              </InputAdornment>
            )
          }}
        />
              
            </div>
        </div>
        
        <TableContainer>
      <Table style={style.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Action</b></TableCell>
             {/* <TableCell align="left"><b>User Id</b></TableCell> */}
            <TableCell align="left"><b>Title</b></TableCell>
            <TableCell align="left"><b>Author</b></TableCell>
            <TableCell align="left"><b>Isbn</b></TableCell>
            <TableCell align="left"><b>Price</b></TableCell>
            <TableCell align="left"><b>Language</b></TableCell>
            <TableCell align="left"><b>Genre</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.BookArr.map((row) => (
                <TableRow key={row.id}>
                  
                <TableCell>
                  
                  <IconButton>
                  <DeleteIcon onClick={() => this.deleteBook(row.id)}
                    color="default"
                    align="left"
                    inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                  />
                  </IconButton>
                  <IconButton href={"/UpdateBook/"+row.id }>
                    <EditIcon
                    color="default"
                    align="left"
                    inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                  />
                  </IconButton>
                  
                </TableCell>
                
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.isbn}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.language}</TableCell>
                <TableCell align="left">{row.genre}</TableCell>      
              </TableRow>
            ))
          }          
          
          
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={5}
             
              count={this.state.count}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

     
    </TableContainer>
      </Paper>
    </Grid>
    </div>
            
        );
    }

}

export default ViewBook;
	




