/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `page` value is used for a page routing. 
  4. The `type` key with the `divider` value is used for a divider between Sidenav items.
  5. The `name` key is used for the name of the route on the Sidenav.
  6. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  7. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  8. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  9. The `route` key is used to store the route location which is used for the react router.
  10. The `href` key is used to store the external links location.
  11. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  12. The `component` key is used to store the component of its route.
*/

// layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import ResetPassword from "layouts/authentication/reset-password";
import ForgotPassword from "layouts/authentication/forgot-password";
import Configuration from "layouts/configuration";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Configuration",
    key: "configuration",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/configuration",
    component: <Configuration />,
  },
  {
    type: "page",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">SignIn</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "page",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">Forgot Password</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "page",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">Reset Password</Icon>,
    route: "/authentication/reset-password/:id/:token",
    component: <ResetPassword />,
  },
];

export default routes;
