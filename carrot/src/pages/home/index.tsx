import React from "react";
import TopNav from "../../components/home/TopNav";
import PostList from "../../components/home/PostList";

const HomePage: React.FC = () => {
  return (
    <div>
      <TopNav />
      <div className="pt-10">
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
