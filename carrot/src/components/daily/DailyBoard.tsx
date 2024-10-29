import React, { useState, useEffect } from "react";
import DailyList from "./DailyList";
import axios from "axios";

const DailyBoard: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dailies, setDailies] = useState([]);

  useEffect(() => {
    // 처음 로드 시 전체 게시글을 가져옵니다.
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("/api/v1/daily/posts");
        setDailies(response.data);
      } catch (error) {
        console.error("전체 게시물을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {
    // 카테고리 목록을 가져옵니다.
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/daily/categories");
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory("전체"); // 전체 보기 기본 선택
        }
      } catch (error) {
        console.error("카테고리 목록을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // 선택된 카테고리에 맞춰 게시물을 가져옵니다.
    const fetchPostsByCategory = async () => {
      try {
        const endpoint =
          selectedCategory === "전체"
            ? "/api/v1/daily/posts" // 전체 게시글
            : `/api/v1/daily/category?categoryName=${selectedCategory}`; // 특정 카테고리 게시글

        const response = await axios.get(endpoint);
        setDailies(response.data);
      } catch (error) {
        console.error("게시물을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchPostsByCategory();
  }, [selectedCategory]);

  return (
    <div className="max-w-[600px] mx-auto">
      <div
        className="flex overflow-x-auto space-x-4 border-b justify-center"
        style={{ paddingBottom: "0.8rem", marginBottom: "7px" }} // 패딩을 0.8rem으로 설정
      >
        <button
          onClick={() => setSelectedCategory("전체")}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === "전체" ? "bg-orange text-white" : "bg-gray-200"
          }`}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.name ? "bg-orange text-white" : "bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <DailyList dailies={dailies} />
    </div>
  );
};

export default DailyBoard;
