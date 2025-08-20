import React from 'react';

const GitHubAchievements = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="bg-white p-4 group shadow-lg border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-500">
      <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-4 group-hover:text-black group-hover:scale-105 transition-all duration-300">GitHub Achievements</h4>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="group/achievement flex items-center gap-3 p-3 bg-black/5 rounded-lg hover:bg-black/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer hover:shadow-lg">
            <div className="flex-shrink-0">
              <span className="text-2xl group-hover/achievement:scale-125 group-hover/achievement:rotate-12 transition-all duration-300" role="img" aria-label={achievement.title}>{achievement.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-medium text-sm text-black/90 group-hover/achievement:text-black group-hover/achievement:font-bold transition-all duration-300">{achievement.title}</div>
                {achievement.tier && (
                  <span className="px-2 py-1 bg-black/10 text-xs font-medium text-black/70 rounded-md uppercase tracking-wide group-hover/achievement:bg-black/20 group-hover/achievement:text-black group-hover/achievement:scale-110 transition-all duration-300">
                    {achievement.tier}
                  </span>
                )}
              </div>
              <div className="text-xs text-black/60 leading-relaxed group-hover/achievement:text-black/80 group-hover/achievement:font-medium transition-all duration-300">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubAchievements;