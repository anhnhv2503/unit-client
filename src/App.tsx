import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import Header from "@/components/common/Header";
import { PostDetail } from "./components/pages/PostDetail";
import NotFound from "@/components/error/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
