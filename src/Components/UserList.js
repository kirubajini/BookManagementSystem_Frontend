
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

class UserList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
            oi:'',
            users:[],
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
      // this.getAllUsers();
      this.handleChangePage();
      userService.getAllUsersInPage(0,5)
        .then((Response) =>{
          console.log(Response)
          this.setState({
            page:0,
            users:Response.data.data,
            count:Response.data.Totalnoofelements
          })
        })
    }

    handleChangePage=(event,newpage) => {
      this.setState({
        page:newpage
      });
      if(!this.state.search ){
      userService.getAllUsersInPage(newpage,5)
        .then((Response) =>{
          this.setState({
            users:Response.data.data,
            count:Response.data.Totalnoofelements
          })
        })
      }else{
        userService.searchUser(this.state.search,newpage
          )
        .then((Response) => {
          this.setState({
            users:Response.data.data,
            count:Response.data.Total_No_Of_Elements
          })
        })
      }
    };

    

    handleChangeRowsPerPage =(event) =>{
      this.setState ({
        page:1,
        rowsPerPage:event.target.value
      })
    }

     deleteUser = (id) => {
       userService.deleteUserById(id)
            .then(res => {
              this.setState({
                message : 'User deleted successfully.',
                snackbaropen:true,
               })
              //  setTimeout(()=> this.User(), 3000) 
              
               this.setState({
                users: this.state.users.filter(user => user.id !== id),
                snackbaropen:true,
               });
              
          })

               
          
    }
    // User = () =>{
    //   this.props.history.push("/admin")
    // }

    searchUser = (e) =>{
      console.log("hiiiiii")
      this.setState({
        search:e.target.value
      })
      userService.searchUser(e.target.value)
      .then((Response) => {
        this.setState({
          users:Response.data.data,
          count: Response.data.Total_No_Of_Elements
        })
      })
    }
    onClearText = () =>{
      this.setState({
        username:""
      })
      userService.getAllUsersInPage(0,5)
      .then((Response) =>{
        this.setState({
          users:Response.data.data,
          count:Response.data.Totalnoofelements
        })
      })
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
         <h1>View User</h1>
         <div style={style.search}>
             <div style={style.searchIcon} style = {{float: 'right'}}>
            
            
            <TextField onChange={this.searchUser} value={this.state.username}
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
             <TableCell align="left"><b>User Id</b></TableCell>
            <TableCell align="left"><b>username</b></TableCell>
            <TableCell align="left"><b>email</b></TableCell>
           
            <TableCell align="left"><b>roles</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map((row) => 
                <TableRow key={row.id}>
                  
                <TableCell>
                  
                  <IconButton>
                  <DeleteIcon onClick={() => this.deleteUser(row.id)}
                    color="default"
                    align="left"
                    inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                  />
                  </IconButton>
                  <Link to={`/edit/${row.id}`}>

                  <IconButton href="/UpdateUser" >
                    <EditIcon
                    color="default"
                    align="left"
                    inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                  />
                  </IconButton>
                  </Link>
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                
          {/* <TableCell align="left">{row.roles[0].name}<br/>{row.roles.length>1?(row.roles[1].name):(null)}</TableCell> */}
          {row.roles.map(role=>(
            <TableCell>{role.name}</TableCell>
          ))}
              
              </TableRow>
            )
          }          
          
          
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={5}
              // colSpan={3}
              count={this.state.count}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              // SelectProps={{
              //   inputProps: { 'aria-label': 'rows per page' },
              //   native: true,
              // }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

     
    </TableContainer>

            {/* <li>{this.state.oi}</li> */}
    
      </Paper>
    </Grid>
    </div>
            
        );
    }

}

export default UserList;
	




