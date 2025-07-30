import React from 'react';

const GitHubStatsGrid = ({ profile, stats }) => {
  if (!profile || !stats) return null;

  return (
    <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
      <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-4">GitHub Statistics</h4>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-black/5 p-4 rounded-none text-center">
          <div className="font-bold text-xl text-black/90">{profile.followers}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs">Followers</div>
        </div>
        <div className="bg-black/5 p-4 rounded-none text-center">
          <div className="font-bold text-xl text-black/90">{stats.totalRepos}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs">Repositories</div>
        </div>
        <div className="bg-black/5 p-4 rounded-none text-center">
          <div className="font-bold text-xl text-black/90">{stats.totalStars}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs">Stars</div>
        </div>
        <div className="bg-black/5 p-4 rounded-none text-center">
          <div className="font-bold text-xl text-black/90">{stats.uniqueLanguages}</div>
          <div className="text-black/60 uppercase tracking-wide text-xs">Languages</div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsGrid;