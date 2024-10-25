import "@/assets/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] border-t">
      <nav className="flex justify-between">
        <div className="text-center w-1/3 mx-7 my-2">
          <Link to="/daily">
            <div>
              <FontAwesomeIcon icon="building-user" size="xl" />
            </div>
            <div className="text-xs mt-1">동네생활</div>
          </Link>
        </div>
        <div className="text-center w-1/3 mx-7 my-2">
          <Link to="/">
            <div>
              <FontAwesomeIcon icon="house" size="xl" />
            </div>
            <div className="text-xs mt-1">홈</div>
          </Link>
        </div>
        <div className="text-center w-1/3 mx-7 my-2">
          <Link to="/users">
            <div>
              <FontAwesomeIcon icon="user" size="xl" />
            </div>
            <div className="text-xs mt-1">나의 당근</div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
