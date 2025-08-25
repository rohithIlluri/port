import React from 'react';

const GitHubAchievements = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="bg-white p-4 group shadow-lg border border-gray-200 rounded-2xl active:shadow-xl transition-all duration-300">
      <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-4 active:text-blue-600 active:scale-105 transition-all duration-200">GitHub Achievements</h4>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="group/achievement flex items-center gap-3 p-3 bg-black/5 rounded-lg active:bg-blue-100/20 active:scale-[1.02] active:-translate-y-1 transition-all duration-200 cursor-pointer active:shadow-lg touch-manipulation">
            <div className="flex-shrink-0">
              <span className="text-2xl active:scale-125 active:rotate-12 transition-all duration-200" role="img" aria-label={achievement.title}>{achievement.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-medium text-sm text-black/90 active:text-blue-600 active:font-bold transition-all duration-200">{achievement.title}</div>
                {achievement.tier && (
                  <span className="px-2 py-1 bg-black/10 text-xs font-medium text-black/70 rounded-md uppercase tracking-wide active:bg-blue-200/30 active:text-blue-700 active:scale-110 transition-all duration-200">
                    {achievement.tier}
                  </span>
                )}
              </div>
              <div className="text-xs text-black/60 leading-relaxed active:text-black/80 active:font-medium transition-all duration-200">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubAchievements;