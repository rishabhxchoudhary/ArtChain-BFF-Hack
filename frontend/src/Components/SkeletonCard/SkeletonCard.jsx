import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative group hover:text-gray-100 w-[320px]">
    <div className="absolute inset-0 bg-[#27394C] max-w-xs rounded group-hover:blur-sm">
    </div>
    <div className="relative max-w-xs rounded overflow-hidden shadow-lg bg-gray-900 hover:shadow-xl transition duration-300 ease-in-out ">
        <div className="w-full h-[228px] skeleton rounded"></div>
      <div className="px-6 py-4 h-[180px]">
        <div className="skeleton rounded skeletontext-head"></div>
        <div className="skeleton rounded skeletontext"></div>
        <div className="skeleton rounded skeletontext"></div>
        <div className="skeleton rounded skeletontext"></div>
        <div className="skeleton rounded skeletontext"></div>
      </div>
      <div className="px-6 pt-4 pb-2">
      <button disabled={true} className="bg-blue-500 skeleton hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg" >
          Loading...
      </button>
      </div>
    </div>
    </div>
  );
};

export default SkeletonCard;
