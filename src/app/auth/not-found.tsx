// src/app/not-found.tsx
import React from "react";
import Link from "next/link";
import BaseButton from "../components/ui/BaseButton";

export default function NotFound() {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-[4rem] text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you’re looking for cannot be found.
      </p>
      <Link href="/auth/login">
        <BaseButton>Go Home</BaseButton>
      </Link>
    </div>
  );
}
