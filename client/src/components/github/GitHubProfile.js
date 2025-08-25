import React from 'react';

const GitHubProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-white text-black p-4 group shadow-lg border border-gray-200 rounded-2xl active:shadow-xl transition-all duration-300">
      <div className="text-center">
        <img
          src={profile.avatar_url}
          alt={`${profile.name || profile.login}'s avatar`}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-black/20 active:scale-105 active:border-blue-400/40 transition-all duration-200"
        />
        <h1 className="font-bold text-xl mb-2 text-black/90 active:text-blue-600 active:scale-105 transition-all duration-200">{profile.name}</h1>
        <p className="text-black/70 text-sm mb-3 active:text-black/90 transition-colors duration-200">@{profile.login}</p>
        {profile.bio && (
          <p className="text-black/80 text-sm leading-relaxed mb-4 active:text-black/90 active:font-medium transition-all duration-200">{profile.bio}</p>
        )}
        
        {profile.location && (
          <div className="flex items-center justify-center gap-2 text-black/60 text-sm mb-4 active:text-blue-600 active:scale-105 transition-all duration-200">
            <svg className="w-4 h-4 active:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {profile.location}
          </div>
        )}

        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-button inline-flex items-center justify-center px-4 py-2 text-black text-sm font-medium rounded-md uppercase tracking-wide active:scale-105 active:shadow-2xl transition-all duration-200 focus:ring-2 focus:ring-black/20 focus:ring-offset-2 group/btn touch-manipulation"
        >
          <svg className="w-4 h-4 mr-2 active:scale-110 active:rotate-6 transition-all duration-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default GitHubProfile;