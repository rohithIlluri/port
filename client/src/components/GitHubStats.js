import React, { useState, useEffect } from 'react';
import GitHubProfile from './GitHubProfile';
import GitHubAchievements from './GitHubAchievements';
import GitHubStatsGrid from './GitHubStatsGrid';
// Import badge images
import badge1 from '../badges/1750429963920.png';
import badge2 from '../badges/1750430228955.png';
import badge3 from '../badges/1750430366630.png';
import badge4 from '../badges/image-1.png';
import badge5 from '../badges/image.png';

const CertificationBadges = () => {
  const badges = [
    { 
      src: badge1, 
      alt: 'Certification Badge 1',
      url: 'https://www.credly.com/badges/e1806a87-eb8a-4af6-afeb-96c8616bb19f'
    },
    { 
      src: badge2, 
      alt: 'Certification Badge 2',
      url: 'https://www.credly.com/badges/425f4473-3607-4f15-bd00-24603e4fd68a'
    },
    { 
      src: badge3, 
      alt: 'Certification Badge 3',
      url: 'https://www.credly.com/badges/b6b4c668-1553-4747-9dbc-106c9b227b68'
    },
    { 
      src: badge4, 
      alt: 'Certification Badge 4',
      url: 'https://www.credly.com/badges/0f3eeb62-a422-43b8-82e1-bbbc570f0e4c'
    },
    { 
      src: badge5, 
      alt: 'Certification Badge 5',
      url: 'https://www.credly.com/badges/e8faf7e9-4bdb-4572-ae0f-5b548854c07b'
    },
  ];

  const handleBadgeClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white p-8 border border-black/10 rounded-none shadow-minimal">
      <h4 className="text-sm font-medium uppercase tracking-wide text-black/80 mb-6">Certifications & Achievements</h4>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <div 
            key={index}
            onClick={() => handleBadgeClick(badge.url)}
            className="bg-gradient-to-br from-black/5 to-black/10 p-4 rounded-none hover:from-black/10 hover:to-black/15 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
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
  );
};

const GitHubStats = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
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

        // Fetch repositories for additional stats
        const reposResponse = await fetch('https://api.github.com/users/rohithIlluri/repos?per_page=100');
        if (!reposResponse.ok) {
          throw new Error(`GitHub repos API error: ${reposResponse.status}`);
        }
        const reposData = await reposResponse.json();
        
        // Calculate stats
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
        const languages = reposData.map(repo => repo.language).filter(Boolean);
        const uniqueLanguages = [...new Set(languages)];
        
        // Calculate account age
        const accountAge = Math.floor((new Date() - new Date(profileData.created_at)) / (1000 * 60 * 60 * 24 * 365));
        
        // Get recent activity
        const recentRepos = reposData.filter(repo => {
          const updated = new Date(repo.updated_at);
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return updated > sixMonthsAgo;
        });

        setStats({
          totalStars,
          totalForks,
          totalRepos: reposData.length,
          uniqueLanguages: uniqueLanguages.length,
          accountAge,
          recentActivity: recentRepos.length
        });

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
      <div className="bg-white p-8 border border-black/10 rounded-none shadow-minimal">
        <div className="animate-pulse space-y-6">
          <div className="h-20 w-20 bg-black/10 rounded-full mx-auto"></div>
          <div className="h-4 bg-black/10 rounded-none"></div>
          <div className="h-3 bg-black/10 rounded-none w-3/4 mx-auto"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-black/10 rounded-none"></div>
            <div className="h-16 bg-black/10 rounded-none"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-black/10 rounded-none"></div>
            <div className="h-16 bg-black/10 rounded-none"></div>
          </div>
          <div className="h-12 bg-black/10 rounded-none"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 border border-red-200 rounded-none shadow-minimal">
        <div className="text-center">
          <div className="text-red-500 text-sm mb-4">⚠️ Error</div>
          <p className="text-black/70 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 text-sm bg-black text-black rounded-none hover:bg-black/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GitHubProfile profile={profile} />
      <CertificationBadges />
      <GitHubStatsGrid profile={profile} stats={stats} />
      <GitHubAchievements achievements={achievements} />
      
      {/* GitHub Badges */}
      <div className="bg-white p-8 border border-black/10 rounded-none shadow-minimal">
        <h4 className="text-sm font-medium uppercase tracking-wide text-black/80 mb-6">Live Statistics</h4>
        <div className="space-y-6">
          <img
            src="https://github-readme-stats.vercel.app/api?username=rohithIlluri&show_icons=true&theme=default&hide_border=true&count_private=true"
            alt="GitHub Stats"
            className="w-full hover-lift"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=rohithIlluri&theme=default&hide_border=true"
            alt="GitHub Streak"
            className="w-full hover-lift"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=rohithIlluri&layout=compact&theme=default&hide_border=true"
            alt="Top Languages"
            className="w-full hover-lift"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;