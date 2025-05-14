"use client";

import React from "react";

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className=" p-8  text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Internal server error
        </h1>
      </div>
    </div>
  );
}
