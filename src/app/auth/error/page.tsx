"use client";

import React from "react";

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Invalid Email or Password
        </h1>
      </div>
    </div>
  );
}
