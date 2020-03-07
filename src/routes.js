// Layout Types
import { DefaultLayout, SignUpPageLayout } from "./layouts";

// Route Views
import Login from "./views/Login";
import Wallet from "./views/Wallet";

export default [
  {
    path: "/",
    exact: true,
    layout: SignUpPageLayout,
    component: Login
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Wallet
  },
];
