import React from 'react';

const GitHubStatsGrid = ({ profile, stats }) => {
  if (!profile || !stats) {
    return (
      <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-black/10 rounded-none"></div>
            <div className="h-16 bg-black/10 rounded-none"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-black/10 rounded-none"></div>
            <div className="h-16 bg-black/10 rounded-none"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
      <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-6">GitHub Statistics</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-none">
          <div className="text-2xl font-bold text-blue-600 mb-2">{stats.totalRepos}</div>
          <div className="text-xs text-black/70 uppercase tracking-wide">Public Repos</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-none">
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.totalStars}</div>
          <div className="text-xs text-black/70 uppercase tracking-wide">Total Stars</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-none">
          <div className="text-2xl font-bold text-purple-600 mb-2">{stats.totalForks}</div>
          <div className="text-xs text-black/70 uppercase tracking-wide">Total Forks</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-none">
          <div className="text-2xl font-bold text-orange-600 mb-2">{stats.uniqueLanguages}</div>
          <div className="text-xs text-black/70 uppercase tracking-wide">Languages</div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsGrid;