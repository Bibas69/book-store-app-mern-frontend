import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/book/CartPage";
import Checkout from "../pages/book/Checkout";
import SingleBook from "../pages/book/SingleBook";
import PrivateRoute from "./PrivateRoute";
import { Orders } from "../pages/home/Orders";
import Dashboard from "../pages/admin/Dashboard";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import DashboardLayout from "../pages/admin/DashboardLayout";
import ManageBooks from "../pages/admin/ManageBook";
import UpdateBooks from "../pages/admin/UpdateBooks";
import AddBook from "../pages/admin/AddBook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/profile", element: <h1>Profile</h1>},
      {path: "/favourite", element: <h1>Favourite</h1>},
      {path: "/cart", element: <CartPage/>},
      {path: "/login", element: <Login/>},
      {path: "/register", element: <Register/>},
      {path: "/checkout", element: <PrivateRoute><Checkout/></PrivateRoute>},
      {path: "/book/:id", element: <SingleBook/>},
      {path: "/orders", element: <PrivateRoute><Orders/></PrivateRoute>}
    ],
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <AdminLogin />
      },
      {
        path: "dashboard",
        element: <AdminRoute><DashboardLayout /></AdminRoute>
      },
      {
        path: "create-new-book",
        element: <AdminRoute><AddBook /></AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute><UpdateBooks /></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><ManageBooks /></AdminRoute>
      }
    ]
  }
]);

export default router;