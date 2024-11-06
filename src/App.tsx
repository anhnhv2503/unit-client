import NotFound from "@/components/error/NotFound";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import { Toaster } from "@/components/ui/sonner";
import UserRoute from "@/routes/UserRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { PostDetail } from "./components/pages/PostDetail";
import { UserProfile } from "./components/pages/UserProfile";

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
      <Toaster position="top-center" />
    </>
  );
}

export default App;
