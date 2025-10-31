import React from 'react';

export default function StatsCard({ title, value, icon, color = 'blue', loading = false }) {
  if (loading) {
    return (
      <div className="bg-gray-100 border-l-4 border-gray-300 text-gray-500 p-4 rounded shadow-md animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 rounded shadow-md`}>
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
