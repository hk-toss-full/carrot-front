// import Footer from "@/components/common/Footer";
// import NavHeader from "@/components/common/NavHeader";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="bg-black h-full">
      <div className="max-w-[600px]  min-h-screen m-auto bg-white h-full overflow-x-hidden scrollbar-hide">
        {/* <NavHeader /> */}
        {/* <div className="relative p-7 h-full"> */}
        <Outlet />
        {/* </div> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default GlobalLayout;
