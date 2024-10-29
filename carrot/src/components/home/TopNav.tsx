import React from "react";
import "@/assets/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const TopNav: React.FC = () => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-white z-50 shadow-md">
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div>중림동</div>
          <div className="ml-2">
            <FontAwesomeIcon icon="chevron-down" />
          </div>
        </div>
        <div className="flex space-x-6">
          <div>
            <FontAwesomeIcon icon="magnifying-glass" />
          </div>
          <div>
            <Link to="/chat/rooms">
              <FontAwesomeIcon icon={faComments} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
