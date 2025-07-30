import React from 'react';

const GitHubAchievements = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
      <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-4">GitHub Achievements</h4>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-black/5 rounded-none hover:bg-black/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="flex-shrink-0">
              <span className="text-2xl" role="img" aria-label={achievement.title}>{achievement.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-medium text-sm text-black/90">{achievement.title}</div>
                {achievement.tier && (
                  <span className="px-2 py-1 bg-black/10 text-xs font-medium text-black/70 rounded-none uppercase tracking-wide">
                    {achievement.tier}
                  </span>
                )}
              </div>
              <div className="text-xs text-black/60 leading-relaxed">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubAchievements;