import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import AddDevicePage from "../pages/AddDevicePage";
import DevicePage from "../pages/DevicePage";
import PingDetailPage from "../pages/PingDetailPage"
import { RequireRole } from "../components/RequireRole";
import EditDevicePage from "../pages/EditDevicePage";
import UserTable from "../pages/UserTable";
import AddUserPage from "../pages/AddUserPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "devices",
            element: <DevicePage />
           
          },
          
          {
            path: "devices/add",
            element: <RequireRole allowedRoles={["admin"]}>
              <AddDevicePage />
            </RequireRole>
          },
          {
            path: "devices/edit/:id",
            element: <RequireRole allowedRoles={["admin"]}>
              <EditDevicePage />
            </RequireRole>
          },
          {
            path: "users",
            element: <RequireRole allowedRoles={["admin"]}>
              <UserTable />
            </RequireRole>
          }, {
            path: "/users/add",
            element: <RequireRole allowedRoles={["admin"]}>
              <AddUserPage />
            </RequireRole>
          },
          {
            path: "/devices/:id",
            element: <PingDetailPage />
          }
        ],
      },
    ],
  },
]);
