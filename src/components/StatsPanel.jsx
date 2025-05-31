import React, { memo } from 'react';

export const StatsPanel = memo(({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Tasks</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
        <div className="text-sm text-gray-600">Completion Rate</div>
      </div>
    </div>
  );
});