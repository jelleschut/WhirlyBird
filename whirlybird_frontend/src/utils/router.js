import React from "react";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Register from "../components/Register";
import Forecast from "../components/Forecast";

const Routes = {
  "/": () => <Home />,
  "/profile": () => <Profile />,
  "/register": () => <Register />,
  "/login": () => <Login />,
  "/forecast/:id": ({id}) => <Forecast id={id}/>
};
export default Routes;