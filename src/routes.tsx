import React from "react";

import { MdLock } from "react-icons/md";
import SignUp from "view/auth/SignUp";
import Home from "view/home/Home";
import SignIn from "./view/auth/SignIn";

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
];
export default routes;
