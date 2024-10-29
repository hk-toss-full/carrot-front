import React from "react";

interface Daily {
  id: number;
  categoryName: string;
  title: string;
  content: string;
  locationId: string;
  createdAt: string;
}

interface DailyListProps {
  dailies: Daily[];
}

const DailyList: React.FC<DailyListProps> = ({ dailies }) => {
  return (
    <div>
      {dailies.map((daily) => (
        <div
          key={daily.id}
          className="border-b py-4"
          style={{ marginLeft: "8px" }} // Exact 8px left margin
        >
          {/* 카테고리 이름 - 회색 배경 뱃지 */}
          <div className="text-xs font-semibold text-gray-600 mb-1">
            <span className="bg-gray-200 px-2 py-1 rounded-full">{daily.categoryName}</span>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-semibold mb-1">{daily.title}</h2>

          {/* 내용 */}
          <p className="text-sm text-gray-700 mb-2 truncate">{daily.content}</p>

          {/* 위치, 시간 */}
          <div className="text-xs text-gray-500 flex items-center space-x-2">
            <span>{daily.locationId}</span>
            <span>{daily.createdAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyList;
