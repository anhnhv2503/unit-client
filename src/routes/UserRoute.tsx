import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Outlet } from "react-router-dom";

const UserRoute = () => {
  return (
    <>
      <div className="flex">
        <Header />
        <div className="flex-col h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 bg-black overflow-y-auto h-fit">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserRoute;
