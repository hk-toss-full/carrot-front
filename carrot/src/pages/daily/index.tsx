import React from "react";
import BottomNav from "../../components/common/BottomNav";
import DailyBoard from "../../components/daily/DailyBoard";

const DailyLife: React.FC = () => {
  return (
    <div>
      <DailyBoard />
      <BottomNav />
    </div>
  );
};

export default DailyLife;
