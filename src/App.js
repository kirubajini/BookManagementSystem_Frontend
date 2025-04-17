import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import { Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MenuBook";

import AddBook from "./Components/AddBook";

import AddUser from "./Components/AddUser";
import Admin from "./Components/Admin";
import UserList from "./Components/UserList";
import AuthService from "./services/auth.service";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UpdateUser from "./Components/UpdateUser";
import ViewBook from "./Components/ViewBook";
import UpdateBook from "./Components/UpdateBook";

const Style = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    spacing: 2,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "black",
    spacing: 3,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      successful: false,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  //   menuToggle = () =>{
  //     this.setState({toggle: !this.state.toggle})
  // }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    var Adminlog;
    if (localStorage.getItem("roles") === "ROLE_ADMIN") {
      Adminlog = true;
    }

    return (
      <div Style={Style.root}>
        <Router>
          <AppBar
            position="static"
            style={{ backgroundColor: "black", spacing: 3 }}
          >
            <Toolbar>
              {/* <img src ={Logo1} height='40' width='50'/> */}

              <Grid item xs={12}>
                <MenuIcon />
                <Button href="/" color="inherit">
                  <Typography>
                    <strong>Books Shop</strong>
                  </Typography>
                </Button>
                <Button href="/home" color="inherit">
                  <strong>Home</strong>
                </Button>
                {Adminlog ? (
                  <Button href="/admin" color="inherit">
                    <strong>Admin Board</strong>
                  </Button>
                ) : (
                  <>
                    {/* {currentUser && (
                 
                )} */}
                  </>
                )}
                {showAdminBoard ? (
                  <Button href="/admin" color="inherit">
                    <strong>Admin Board</strong>
                  </Button>
                ) : (
                  <>
                    {currentUser && (
                      <div>
                        <Button
                          href="/addBook"
                          color="inherit"
                          onClick={this.AddBook_veiw}
                        >
                          <strong>ADD BOOK</strong>
                        </Button>

                        <Button href="/ViewBook" color="inherit">
                          <strong>BOOK LIST</strong>
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </Grid>

              {/* <span>{cart.length}</span>
                        <Link to="/cart"> </Link>
              <Button href="/Cart" color="inherit"  ><strong><ShoppingCartIcon style={{"fontSize":30}}>Addtocard</ShoppingCartIcon></strong></Button> */}
              {/* <Button href="Profile" color="inherit"><strong> <AccountCircleIcon style={{"fontSize":30}}>Profile</AccountCircleIcon></strong></Button>

               <Button href="/Login" color="inherit"><strong>Login</strong></Button>
               <Button href="/signup" color="inherit"><strong>Signup</strong></Button> */}

              {currentUser ? (
                <div style={{ display: "flex" }}>
                  <AccountCircleIcon
                    style={{ fontSize: 30 }}
                  ></AccountCircleIcon>{" "}
                  <Button href="Profile" color="inherit">
                    <strong>{currentUser.username}</strong>
                  </Button>
                  <Button href="/Home" color="inherit" onClick={this.logOut}>
                    <strong>LogOut</strong>
                  </Button>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <Button href="/Login" color="inherit">
                    <strong>Login</strong>
                  </Button>
                  <Button href="/register" color="inherit">
                    <strong>Signup</strong>
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>

          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/addbook" component={AddBook} />
              {/* <Route exact path="/booklist" component={BookList} /> */}
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/adduser" component={AddUser} />
              <Route exact path="/UserList" component={UserList} />
              {/* <Route exact path="/userlist" component={UserList} /> */}
              <Route exact path="/edit/:id" component={UpdateUser} />
              <Route exact path="/UpdateBook/:id" component={UpdateBook} />
              <Route exact path="/ViewBook" component={ViewBook} />
            </Switch>
          </div>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
