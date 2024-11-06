import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Outlet } from "react-router-dom";

const UserRoute = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex-col h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 p-6 bg-black overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserRoute;
