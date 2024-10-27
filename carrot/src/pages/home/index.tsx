import React from "react";
import TopNav from "../../components/home/TopNav";
import PostList from "../../components/home/PostList";
import BottomNav from "../../components/common/BottomNav";

const HomePage: React.FC = () => {
  return (
    <div>
      <TopNav />
      <div className="pt-10">
        <PostList />
      </div>
      <BottomNav />
    </div>
  );
};

export default HomePage;
