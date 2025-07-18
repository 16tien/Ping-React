import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DevicePage from "../pages/DevicePage";
import PingDetailPage from "../pages/PingDetailPage"

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
            element: <DevicePage />,
          },
          {
            path: "home",
            element: <HomePage/>
          },
          {
            path: "/devices/:id",
            element: <PingDetailPage/>
          }
        ],
      },
    ],
  },
]);
