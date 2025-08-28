import React from "react";

// Layout de autenticação compartilhado entre Login e Register
export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}