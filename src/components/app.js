import React from "react";
import ReactDOM from "react-dom";
import Home from "./home/home";
import Header from "./home/header";
import Product from "./product/product";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Cart from "./cart/cart";
import { loggedUser, getUser, logOutUser } from "../modal/user";
import Dialog, { dialogstate } from "./dialog/dialog";
import Order from "./orders/order";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    };
    this.setUserState = this.setUserState.bind(this);
    const loggeduser = loggedUser();
    if (loggeduser) this.setUserState(loggeduser);
  }
  openDialog() {
    console.log(this, "el");
    dialogstate.openDialog();
  }
  setUserState(user, val) {
    if (val && val == "logout") {
      logOutUser();
      this.setState({ user: false });
      return
    }
    console.log("statechange", user);
    getUser("username", user).then((resp) => {
      console.log(resp, "ulist");
      if (resp.length > 0) {
        user = resp[0];
        loggedUser(user.username);
        this.setState({ user: user });
      } else {
        alert("User not found!");
      }
    });
  }
  render() {
    return (
      <div>
        <Router>
          <Header
            user={this.state.user}
            setUser={this.setUserState}
            openDialog={this.openDialog}
          />
          <Switch>
            <Route
              path="/ubuy/dist/product/:slug"
              component={(props) => (
                <Product
                  {...props}
                  user={this.state.user}
                  setUser={this.setUserState}
                />
              )}
            />
            <Route
              path="/ubuy/dist/cart"
              component={(props) => <Cart {...props} user={this.state.user} />}
            />
            <Route
              path="/ubuy/dist/orders"
              component={(props) => <Order {...props} user={this.state.user} />}
            />
            <Route
              path="/ubuy/dist/"
              exact
              component={(props) => <Home {...props} user={this.state.user} />}
            />
          </Switch>
          <Dialog setUser={this.setUserState} />
        </Router>
      </div>
    );
  }
}

export default App;
