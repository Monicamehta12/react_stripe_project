import Index from "./Views/Index";
import Login from "./Views/Authentication/Login";
import Register from "./Views/Authentication/Register";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Index,
    layout: "/user",
  },
  {
    path: "/login",
    name: "Login",
    icon: "uil uil-key-skeleton-alt",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "uil uil-user-circle",
    component: Register,
    layout: "/auth",
  }
]

export default routes;