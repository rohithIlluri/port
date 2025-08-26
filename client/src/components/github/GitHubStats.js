import React, { useState, useEffect } from 'react';

import GitHubAchievements from './GitHubAchievements';
// Import badge images
import badge1 from '../../assets/images/1750429963920.png';
import badge2 from '../../assets/images/1750430228955.png';
import badge3 from '../../assets/images/1750430366630.png';
import badge4 from '../../assets/images/image-1.png';
import badge5 from '../../assets/images/image.png';

const CertificationBadges = () => {
  const badges = [
    { 
      src: badge1, 
      alt: 'Machine Learning with Python',
      title: 'Machine Learning with Python',
      issuer: 'IBM - Coursera',
      url: 'https://www.credly.com/badges/e1806a87-eb8a-4af6-afeb-96c8616bb19f'
    },
    { 
      src: badge2, 
      alt: 'Data Analysis with Python',
      title: 'Data Analysis with Python',
      issuer: 'IBM - Coursera',
      url: 'https://www.credly.com/badges/425f4473-3607-4f15-bd00-24603e4fd68a'
    },
    { 
      src: badge3, 
      alt: 'Getting Started with Cloud for the Enterprise',
      title: 'Getting Started with Cloud for the Enterprise',
      issuer: 'IBM - Coursera',
      url: 'https://www.credly.com/badges/b6b4c668-1553-4747-9dbc-106c9b227b68'
    },
    { 
      src: badge4, 
      alt: 'Enterprise Data Science in Practice',
      title: 'Enterprise Data Science in Practice',
      issuer: 'IBM SkillsBuild',
      url: 'https://www.credly.com/badges/0f3eeb62-a422-43b8-82e1-bbbc570f0e4c'
    },
    { 
      src: badge5, 
      alt: 'AWS Cloud Quest: Cloud Practitioner',
      title: 'AWS Cloud Quest: Cloud Practitioner',
      issuer: 'AWS Skill Builder',
      url: 'https://www.credly.com/badges/e8faf7e9-4bdb-4572-ae0f-5b548854c07b'
    },
  ];

  const handleBadgeClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Mobile Enhanced Style */}
      <div className="lg:hidden relative bg-white p-6 overflow-hidden group shadow-lg border border-gray-200 rounded-2xl">
        <div className="relative z-10">

          
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div 
                key={index}
                onClick={() => handleBadgeClick(badge.url)}
                className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <img 
                  src={badge.src} 
                  alt={badge.alt}
                  className="w-12 h-12 object-contain mx-auto mb-2"
                />
                <h5 className="text-xs font-medium text-gray-800 text-center leading-tight">
                  {badge.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Simple Style */}
      <div className="hidden lg:block bg-white p-6 shadow-lg border border-gray-200 rounded-2xl">
        
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => (
            <div 
              key={index}
              onClick={() => handleBadgeClick(badge.url)}
              className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <img 
                src={badge.src} 
                alt={badge.alt}
                className="w-16 h-16 object-contain mx-auto mb-2"
              />
              <h5 className="text-xs font-medium text-gray-800 text-center leading-tight">
                {badge.title}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const GitHubStats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Known achievements for the user - this is more reliable than scraping
  const achievements = [
    {
      title: 'Pull Shark',
      description: 'Opened pull requests that have been merged',
      tier: 'x2',
      icon: '🦈'
    },
    {
      title: 'Quickdraw',
      description: 'Closed issues or pull requests within 5 minutes of opening',
      tier: 'Earned',
      icon: '⚡'
    },
    {
      title: 'YOLO',
      description: 'Merged a pull request without code review',
      tier: 'Earned', 
      icon: '🤠'
    }
  ];

  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        setError('Failed to load GitHub contributions. Please try again later.');
        setLoading(false);
      }
    };

    fetchGitHubContributions();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Mobile Enhanced Loading States */}
        <div className="lg:hidden space-y-8">
          {/* Enhanced loading state for profile */}
          <div className="relative bg-gradient-to-br from-white/90 via-white/95 to-white/90 p-8 border border-gray-200/60 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="animate-pulse space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>
              </div>
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Loading state for certifications */}
          <div className="relative bg-gradient-to-br from-white/90 via-white/95 to-white/90 p-8 border border-gray-200/60 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="animate-pulse space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/3"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="h-20 w-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
                      <div className="h-4 bg-gray-300 rounded-lg w-24"></div>
                      <div className="h-3 bg-gray-300 rounded-full w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Simple Loading States */}
        <div className="hidden lg:block space-y-8">
          <div className="bg-white/80 p-8 border border-black/10 rounded-lg shadow-lg">
            <div className="animate-pulse space-y-6">
              <div className="h-20 w-20 bg-black/10 rounded-full mx-auto"></div>
              <div className="h-4 bg-black/10 rounded-lg"></div>
              <div className="h-3 bg-black/10 rounded-lg w-3/4 mx-auto"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-black/10 rounded-lg"></div>
                <div className="h-16 bg-black/10 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-black/10 rounded-lg"></div>
                <div className="h-16 bg-black/10 rounded-lg"></div>
              </div>
              <div className="h-12 bg-black/10 rounded-lg"></div>
            </div>
          </div>
          
          <div className="bg-white/80 p-8 border border-black/10 rounded-lg shadow-lg">
            <div className="h-4 bg-black/10 rounded-lg w-1/3 mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-black/10 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 p-8 border border-red-200 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-red-500 text-sm mb-4">⚠️ Error</div>
          <p className="text-black/70 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 text-sm bg-black text-black rounded-md hover:bg-black/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <CertificationBadges />
      </div>
      <div>
        <GitHubAchievements achievements={achievements} />
      </div>
    </div>
  );
};

export default GitHubStats;
