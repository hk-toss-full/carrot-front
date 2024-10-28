// import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/common/BottomNav";

const GlobalLayout = () => {
  return (
    <div className="bg-black h-full">
      <div className="max-w-[600px] min-h-screen m-auto bg-white h-full overflow-x-hidden scrollbar-hide">
        <div className="relative p-4 h-full">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default GlobalLayout;
