import React from "react";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setAuthToken } from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/userActions";
import store from "./store";
import Home from "./components/Home/Home";
import Auth from "./utils/Auth";

function App() {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signIn" exact component={Auth(SignIn, false)} />
        <Route path="/" exact component={Auth(SignUp, false)} />
        <Route path="/home" exact component={Auth(Home, true)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
