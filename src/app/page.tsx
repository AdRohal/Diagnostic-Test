// src/app/page.tsx
"use client"; // Ensure this is at the top

import TestList from './testlist/TestList'; // Correct default import

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-black">Welcome to the Patient Test Management</h1>
        
        {/* Include the TestList component */}
        <TestList />
      </div>
    </div>
  );
}