import React from "react";
import { useLocation } from "react-router-dom";

const PostDetail: React.FC = () => {
  const location = useLocation();
  const { title, location: postLocation, time, price } = location.state || {};

  return (
    <div>
      <h1>Post Detail</h1>
      <p>Title: {title}</p>
      <p>Location: {postLocation}</p>
      <p>Time: {time}</p>
      <p>Price: {price}</p>
    </div>
  );
};

export default PostDetail;
