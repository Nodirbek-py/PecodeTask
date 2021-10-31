import { Spacer } from "@nextui-org/react";
import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { Navbar } from "../components/layout";
import Characters from "./characters";
import Episode from "./episodes";
import Home from "./home";
import Locations from "./locations";
import Watchlist from "./watchlist";
const Main = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <NavLink activeClassName="nav-active" exact to="/">
          Home
        </NavLink>
        <NavLink activeClassName="nav-active" exact to="/characters">
          Characters
        </NavLink>
        <NavLink activeClassName="nav-active" exact to="/episodes">
          Episodes
        </NavLink>
        <NavLink activeClassName="nav-active" exact to="/locations">
          Locations
        </NavLink>
        <NavLink activeClassName="nav-active" exact to="/watchlist">
          My Watchlist
        </NavLink>
      </Navbar>
      <Spacer y={2} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/episodes" component={Episode} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/watchlist" component={Watchlist} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
