import React from "react";

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-[4rem] text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you’re looking for cannot be found.
      </p>
    </div>
  );
};

export default NotFound;
