import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Authenticated1 from "./Authenticated1";
import Authenticated2 from "./Authenticated2";
import Logout from "./Logout";

class App extends Component {
  state = { user: null };

  setUser = user => {
    this.setState({ user: user });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Link to="/">Home</Link>
          {!this.state.user ? <Link to="/Login">Login</Link> : ""}
          {!this.state.user ? <Link to="/Register">Register</Link> : ""}
          {this.state.user ? (
            <Link to="/Authenticated1">Authenticated1</Link>
          ) : (
            ""
          )}
          {this.state.user ? (
            <Link to="/Authenticated2">Authenticated2</Link>
          ) : (
            ""
          )}
          {this.state.user ? <Link to="/Logout">Logout</Link> : ""}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/Login"
              render={() => <Login setUser={this.setUser} />}
            />
            <Route
              exact
              path="/Register"
              render={() => <Register setUser={this.setUser} />}
            />
            <Route exact path="/Authenticated1" component={Authenticated1} />
            <Route exact path="/Authenticated2" component={Authenticated2} />
            <Route
              exact
              path="/Logout"
              render={() => <Logout setUser={this.setUser} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
