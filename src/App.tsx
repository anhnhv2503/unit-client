import NotFound from "@/components/error/NotFound";
import ConfirmEmail from "@/components/pages/ConfirmEmail";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import Notification from "@/components/pages/Notification";
import Register from "@/components/pages/Register";
import Search from "@/components/pages/Search";
import UserRoute from "@/routes/UserRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { ForgotPassword } from "./components/pages/ForgotPassword";
import { PostDetail } from "./components/pages/PostDetail";
import { ResetPassword } from "./components/pages/ResetPassword";
import { UserProfile } from "./components/pages/UserProfile";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/confirm",
      element: <ConfirmEmail />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <UserRoute />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/post",
              element: <PostDetail />,
            },

            {
              path: "/search",
              element: <Search />,
            },
            {
              path: "/user-profile/:id",
              element: <UserProfile />,
            },
            {
              path: "/notify",
              element: <Notification />,
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
