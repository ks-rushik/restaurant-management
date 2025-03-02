// src/app/auth/error.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';


export default function AuthError() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Invalid Email or Password
        </h1>
        <p className="text-gray-600 mb-6">
          Please check your credentials and try again.
        </p>
        <button
          onClick={handleBackToLogin}
          className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition-colors duration-200"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
