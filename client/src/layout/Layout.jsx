import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex gap-[60px] items-center w-full min-h-[100vh] py-10 px-10">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
