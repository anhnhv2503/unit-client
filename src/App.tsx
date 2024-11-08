import NotFound from "@/components/error/NotFound";
import Chat from "@/components/pages/Chat";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import Notification from "@/components/pages/Notification";
import Register from "@/components/pages/Register";
import Search from "@/components/pages/Search";
import UserRoute from "@/routes/UserRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { PostDetail } from "./components/pages/PostDetail";
import { UserProfile } from "./components/pages/UserProfile";
import ConfirmEmail from "@/components/pages/ConfirmEmail";
import { ResetPassword } from "./components/pages/ResetPassword";
import { ForgotPassword } from "./components/pages/ForgotPassword";

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
      element: <UserRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/post/:id",
          element: <PostDetail />,
        },
        {
          path: "/user-profile/:id",
          element: <UserProfile />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/notify",
          element: <Notification />,
        },
        {
          path: "/chat",
          element: <Chat />,
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
