import React, { useState, useEffect } from 'react';

import GitHubProfile from './GitHubProfile';
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
      alt: 'Python for Data Science',
      title: 'Python for Data Science',
      issuer: 'IBM - Coursera',
      url: 'https://www.credly.com/badges/b6b4c668-1553-4747-9dbc-106c9b227b68'
    },
    { 
      src: badge4, 
      alt: 'Cloud Computing Enterprise',
      title: 'Getting Started with Cloud for Enterprise',
      issuer: 'IBM SkillsBuild',
      url: 'https://www.credly.com/badges/0f3eeb62-a422-43b8-82e1-bbbc570f0e4c'
    },
    { 
      src: badge5, 
      alt: 'Enterprise Data Science',
      title: 'Enterprise Data Science in Practice',
      issuer: 'IBM SkillsBuild',
      url: 'https://www.credly.com/badges/e8faf7e9-4bdb-4572-ae0f-5b548854c07b'
    },
  ];

  const handleBadgeClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Mobile Enhanced Style */}
      <div className="lg:hidden relative bg-white p-8 overflow-hidden group shadow-lg border border-gray-200 rounded-2xl">
        {/* Background decoration */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tl from-green-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 tracking-tight">Certifications & Achievements</h4>
              <p className="text-sm text-gray-500 mt-1">Professional development & skills validation</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {badges.map((badge, index) => (
              <div 
                key={index}
                onClick={() => handleBadgeClick(badge.url)}
                className="group/badge relative bg-gradient-to-br from-white/80 via-white/90 to-gray-50/80 p-6 rounded-2xl border border-gray-200/50 hover:border-gray-300/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img 
                      src={badge.src} 
                      alt={badge.alt}
                      className="w-20 h-20 object-contain transition-all duration-500 group-hover/badge:scale-110 group-hover/badge:brightness-110"
                    />
                    {/* Badge shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-pulse rounded-full"></div>
                  </div>
                  
                  <h5 className="text-sm font-bold text-gray-800 leading-tight mb-2 group-hover/badge:text-gray-900 transition-colors duration-300">
                    {badge.title}
                  </h5>
                  <p className="text-xs text-gray-500 font-medium bg-gray-100/60 px-3 py-1 rounded-full border border-gray-200/50">
                    {badge.issuer}
                  </p>
                  
                  {/* External link indicator */}
                  <div className="mt-3 flex items-center text-xs text-blue-600 opacity-0 group-hover/badge:opacity-100 transition-all duration-300">
                    <span className="mr-1">View Certificate</span>
                    <svg className="w-3 h-3 group-hover/badge:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats summary */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                {badges.length} Professional Certifications
              </span>
              <span className="text-gray-500 flex items-center">
                Verified on Credly
                <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Simple Style */}
      <div className="hidden lg:block bg-white p-8 shadow-lg border border-gray-200 rounded-2xl">
        <h4 className="text-sm font-medium uppercase tracking-wide text-black/80 mb-6">Certifications & Achievements</h4>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index}
              onClick={() => handleBadgeClick(badge.url)}
              className="bg-gradient-to-br from-black/5 to-black/10 p-4 rounded-lg hover:from-black/10 hover:to-black/15 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
            >
              <img 
                src={badge.src} 
                alt={badge.alt}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const GitHubStats = () => {
  const [profile, setProfile] = useState(null);
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
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile data
        const profileResponse = await fetch('https://api.github.com/users/rohithIlluri');
        if (!profileResponse.ok) {
          throw new Error(`GitHub API error: ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError('Failed to load GitHub data. Please try again later.');
        setLoading(false);
      }
    };

    fetchGitHubData();
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
        <GitHubProfile profile={profile} />
      </div>
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
