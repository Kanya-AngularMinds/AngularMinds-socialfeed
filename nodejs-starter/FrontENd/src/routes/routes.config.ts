import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const Signup =lazy(()=>import("../pages/auth/signup/signup"));
const EditProfile = lazy(() => import("../pages/edit/editprofile"));
const ForgotPassword = lazy(() => import("../pages/auth/forgotpassword/forgotpassword"))
const Resetpassword = lazy(() => import("../pages/auth/resetpassword/resetpassword"))
const Bookmarks = lazy(() => import("../pages/bookmarks/bookmarks"))

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  singup:"/auth/singup",
  editprofile:"/editprofile",
  forgotpassword:"/auth/forgotpassword",
  resetpassword:"/auth/resetpassword",
  bookmarks:"/bookmarks",
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.singup,
    component:Signup,
  },
  {
    path: paths.editprofile,
    component: EditProfile,
  },
  {
    path:paths.forgotpassword,
    component:ForgotPassword,
  },
  {
    path:paths.resetpassword,
    component: Resetpassword,
  },
  {
    path:paths.bookmarks,
    component: Bookmarks,
  }
];
