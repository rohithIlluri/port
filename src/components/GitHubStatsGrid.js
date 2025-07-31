import React from 'react';

const GitHubStatsGrid = ({ profile, stats }) => {
  if (!profile || !stats) return null;

  return (
    <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
      <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-6">GitHub Statistics</h4>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-black/5 to-black/10 p-6 rounded-none text-center hover:from-black/10 hover:to-black/15 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
          <div className="font-bold text-3xl text-black/90 mb-2 group-hover:text-black transition-colors">{profile.followers}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs font-medium">Followers</div>
        </div>
        <div className="bg-gradient-to-br from-black/5 to-black/10 p-6 rounded-none text-center hover:from-black/10 hover:to-black/15 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
          <div className="font-bold text-3xl text-black/90 mb-2 group-hover:text-black transition-colors">{stats.totalRepos}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs font-medium">Repositories</div>
        </div>
        <div className="bg-gradient-to-br from-black/5 to-black/10 p-6 rounded-none text-center hover:from-black/10 hover:to-black/15 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
          <div className="font-bold text-3xl text-black/90 mb-2 group-hover:text-black transition-colors">{stats.uniqueLanguages}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs font-medium">Languages</div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsGrid;