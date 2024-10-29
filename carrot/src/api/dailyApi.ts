import axiosInstance from "./axiosInstance";

export const fetchDailyPosts = async () => {
  const response = await axiosInstance.get("/api/daily/posts");
  return response.data;
};