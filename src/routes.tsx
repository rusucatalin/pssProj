import React from "react";

import { MdBarChart, MdLock, MdNfc } from "react-icons/md";
import SignUp from "view/auth/SignUp";
import Home from "view/home/Home";
import SignIn from "./view/auth/SignIn";
import DataTables from "view/tables";
import Portfolio from "view/portfolio";
import Tax from "view/tax";

const routes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "signIn",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "signUp",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
  {
    name: "Home",
    layout: "/home",
    path: "homePage",
    icon: <MdLock className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Data Tables",
    layout: "/home",
    path: "data-tables",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DataTables />,
  },
  {
    name: "Potrfolio",
    layout: "/home",
    path: "data-portfolio",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Portfolio />,
  },
  {
    name: "Tax calculator",
    layout: "/home",
    path: "tax-calc",
    icon: <MdNfc className="h-6 w-6" />,
    component: <Tax />,
  },
];
export default routes;
