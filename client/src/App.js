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
      <Route path="/signIn" exact component={SignIn} />
      <Route path="/" exact component={SignUp} />
      <Switch>
        <Auth path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
