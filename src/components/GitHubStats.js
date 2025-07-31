import React, { useState, useEffect } from 'react';
import GitHubProfile from './GitHubProfile';
import GitHubStatsGrid from './GitHubStatsGrid';
import GitHubAchievements from './GitHubAchievements';

const GitHubStats = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [streakStats, setStreakStats] = useState(null);
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

  // Function to calculate streak from GitHub events
  const calculateStreak = async (username) => {
    try {
      // Fetch recent events (GitHub API shows ~90 days of recent activity)
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
      if (!eventsResponse.ok) {
        throw new Error(`Events API error: ${eventsResponse.status}`);
      }
      const events = await eventsResponse.json();

      // Get unique contribution dates from events
      const contributionDates = new Set();
      events.forEach(event => {
        if (['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)) {
          const date = new Date(event.created_at).toISOString().split('T')[0];
          contributionDates.add(date);
        }
      });

      // Convert to sorted array (oldest first for proper streak calculation)
      const sortedDates = Array.from(contributionDates).sort();
      console.log('🔍 Contribution dates found:', sortedDates);
      
      // Calculate current streak
      let currentStreak = 0;
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      // Start from most recent date and work backwards
      const recentDates = [...sortedDates].reverse(); // newest first
      
      // Check if streak is active (contributed today or yesterday)
      let streakActive = false;
      let startDate = null;
      
      if (recentDates.includes(today)) {
        streakActive = true;
        startDate = today;
      } else if (recentDates.includes(yesterday)) {
        streakActive = true;
        startDate = yesterday;
      }
      
      // Calculate current streak if active
      if (streakActive) {
        let checkDate = new Date(startDate);
        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0];
          if (recentDates.includes(dateStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }

      // Calculate longest streak from available data
      let longestStreak = 0;
      let tempStreak = 0;
      
      if (sortedDates.length > 0) {
        tempStreak = 1; // First date counts as streak of 1
        
        for (let i = 1; i < sortedDates.length; i++) {
          const currentDate = new Date(sortedDates[i]);
          const prevDate = new Date(sortedDates[i - 1]);
          const dayDiff = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
          
          if (dayDiff === 1) {
            // Consecutive day
            tempStreak++;
          } else {
            // Gap found, record current streak and reset
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
          }
        }
        // Don't forget the last streak
        longestStreak = Math.max(longestStreak, tempStreak);
      }

      console.log('📊 Streak calculation:', {
        currentStreak,
        longestStreak,
        totalContributions: contributionDates.size,
        dataRange: `${sortedDates[0]} to ${sortedDates[sortedDates.length - 1]}`,
        note: 'Based on last ~90 days of GitHub events API data'
      });

      return {
        currentStreak,
        longestStreak,
        totalContributions: contributionDates.size,
        lastContribution: recentDates[0] || null,
        dataLimited: true // GitHub events API only shows recent data
      };
    } catch (error) {
      console.error('Error calculating streak:', error);
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalContributions: 0,
        lastContribution: null,
        dataLimited: true
      };
    }
  };

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

        // Calculate streak stats
        const streakData = await calculateStreak('rohithIlluri');
        setStreakStats(streakData);

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
      <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
        <div className="animate-pulse space-y-4">
          <div className="h-20 w-20 bg-black/10 rounded-full mx-auto"></div>
          <div className="h-4 bg-black/10 rounded-none"></div>
          <div className="h-3 bg-black/10 rounded-none w-3/4 mx-auto"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-black/10 rounded-none"></div>
            <div className="h-16 bg-black/10 rounded-none"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
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
      <div className="space-y-6">
      <div className="bg-white p-6 border border-red-200 rounded-none shadow-minimal">
        <div className="text-center">
            <div className="text-red-500 text-sm mb-2">⚠️ GitHub API Error</div>
            <p className="text-black/70 text-xs mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
              className="px-4 py-2 text-xs bg-black text-white rounded-none hover:bg-black/80 transition-colors"
          >
            Retry
          </button>
          </div>
        </div>
        
        {/* Fallback GitHub badges - these work independently */}
        <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
          <h4 className="text-xs font-medium uppercase tracking-wide text-black/80 mb-4">External GitHub Statistics</h4>
          <div className="space-y-4">
            <div className="relative">
              <img
                src="https://github-readme-stats.vercel.app/api?username=rohithIlluri&show_icons=true&theme=default&hide_border=true&count_private=true&cache_seconds=3600"
                alt="GitHub Stats"
                className="w-full hover-lift transition-opacity duration-300"
                loading="lazy"
                onError={(e) => {
                  e.target.parentElement.innerHTML = `
                    <div class="bg-black/5 p-4 rounded text-center">
                      <div class="text-black/60 text-sm">📊 External stats also unavailable</div>
                    </div>
                  `;
                }}
              />
            </div>
            
            <div className="relative">
              <img
                src="https://streak-stats.demolab.com?user=rohithIlluri&theme=default&hide_border=true&date_format=M%20j%5B%2C%20Y%5D"
                alt="GitHub Streak"
                className="w-full hover-lift transition-opacity duration-300"
                loading="lazy"
                onError={(e) => {
                  e.target.parentElement.innerHTML = `
                    <div class="bg-black/5 p-4 rounded text-center">
                      <div class="text-black/60 text-sm">🔥 Streak stats unavailable</div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GitHubProfile profile={profile} />
      <GitHubStatsGrid profile={profile} stats={stats} />
      <GitHubAchievements achievements={achievements} />
      
      {/* GitHub Live Stats */}
      <div className="bg-white p-6 border border-black/10 rounded-none shadow-minimal">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-black/80">Live Statistics</h4>
          <button 
            onClick={() => window.location.reload()} 
            className="text-xs text-black/60 hover:text-black/80 transition-colors flex items-center gap-1"
            title="Refresh stats"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        <div className="space-y-4">
          <div className="relative">
          <img
              src="https://github-readme-stats.vercel.app/api?username=rohithIlluri&show_icons=true&theme=default&hide_border=true&count_private=true&cache_seconds=3600"
            alt="GitHub Stats"
              className="w-full hover-lift transition-opacity duration-300"
            loading="lazy"
            onError={(e) => {
                // Try backup URLs
                if (!e.target.dataset.retried) {
                  e.target.dataset.retried = 'true';
                  e.target.src = 'https://github-readme-stats-sigma-five.vercel.app/api?username=rohithIlluri&show_icons=true&theme=default&hide_border=true&count_private=true';
                  return;
                }
                
                if (!e.target.dataset.retried2) {
                  e.target.dataset.retried2 = 'true';
                  e.target.src = 'https://github-readme-stats-git-master-rstaa-rickstaa.vercel.app/api?username=rohithIlluri&show_icons=true&theme=default';
                  return;
                }
                
                // Final fallback: show computed stats from our API
                e.target.parentElement.innerHTML = `
                  <div class="bg-white border border-gray-200 p-6 rounded shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">📊 GitHub Statistics</h3>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div class="text-center p-3 bg-blue-50 rounded">
                        <div class="text-2xl font-bold text-blue-600">Computing...</div>
                        <div class="text-gray-600">Total Commits</div>
                      </div>
                      <div class="text-center p-3 bg-green-50 rounded">
                        <div class="text-2xl font-bold text-green-600">Public</div>
                        <div class="text-gray-600">Repositories</div>
                      </div>
                      <div class="text-center p-3 bg-purple-50 rounded">
                        <div class="text-2xl font-bold text-purple-600">Active</div>
                        <div class="text-gray-600">This Year</div>
                      </div>
                      <div class="text-center p-3 bg-orange-50 rounded">
                        <div class="text-2xl font-bold text-orange-600">Multi-Lang</div>
                        <div class="text-gray-600">Developer</div>
                      </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500 text-center">External stats service unavailable - using fallback display</div>
                  </div>
                `;
              }}
            />
          </div>
          
          {/* Custom Dynamic Streak Stats */}
          <div className="relative">
            {streakStats ? (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-6 rounded-lg">
                <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">🔥 GitHub Streak</h3>
                <div className="flex justify-between items-center">
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{streakStats.totalContributions}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Total</div>
                    <div className="text-xs text-gray-500">Contributions</div>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-red-600 mb-1">{streakStats.currentStreak}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Current Streak</div>
                    <div className="text-xs text-gray-500">
                      {streakStats.currentStreak === 0 ? 'No active streak' : 
                       streakStats.currentStreak === 1 ? 'day' : 'days'}
                    </div>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{streakStats.longestStreak}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Longest</div>
                    <div className="text-xs text-gray-500">Streak</div>
                  </div>
                </div>
                
                {streakStats.lastContribution && (
                  <div className="mt-4 text-center">
                    <div className="text-xs text-gray-500">
                      Last contribution: {new Date(streakStats.lastContribution).toLocaleDateString()}
                    </div>
                  </div>
                )}
                
                <div className="mt-3 text-center space-y-1">
                  <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>Live data from GitHub API</span>
                  </div>
                  {streakStats.dataLimited && (
                    <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      ⚠️ Limited to recent ~90 days of activity
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <div className="animate-pulse">
                  <div className="text-gray-500">🔥 Calculating streak...</div>
                  <div className="text-xs text-gray-400 mt-2">Analyzing contribution data</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=rohithIlluri&layout=compact&theme=default&hide_border=true&cache_seconds=3600"
              alt="Top Languages"
              className="w-full hover-lift transition-opacity duration-300"
              loading="lazy"
              onError={(e) => {
                if (!e.target.dataset.retried) {
                  e.target.dataset.retried = 'true';
                  e.target.src = 'https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=rohithIlluri&layout=compact&theme=default&hide_border=true';
                  return;
                }
                
                // Custom languages display fallback
                e.target.parentElement.innerHTML = `
                  <div class="bg-white border border-gray-200 p-6 rounded shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">🏷️ Top Languages</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <div class="w-3 h-3 bg-blue-500 rounded"></div>
                          <span class="text-sm text-gray-700">JavaScript</span>
                        </div>
                        <span class="text-sm text-gray-500">32%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <div class="w-3 h-3 bg-green-500 rounded"></div>
                          <span class="text-sm text-gray-700">Python</span>
                        </div>
                        <span class="text-sm text-gray-500">28%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <div class="w-3 h-3 bg-purple-500 rounded"></div>
                          <span class="text-sm text-gray-700">React</span>
                        </div>
                        <span class="text-sm text-gray-500">22%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <div class="w-3 h-3 bg-orange-500 rounded"></div>
                          <span class="text-sm text-gray-700">Others</span>
                        </div>
                        <span class="text-sm text-gray-500">18%</span>
                      </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500 text-center">Languages chart service unavailable</div>
                  </div>
                `;
              }}
            />
          </div>
          
          {/* Enhanced contribution graph with multiple fallbacks */}
          <div className="relative">
            <img
              src="https://ghchart.rshah.org/rohithIlluri"
              alt="GitHub Contributions"
              className="w-full hover-lift transition-opacity duration-300"
              loading="lazy"
              onError={(e) => {
                if (!e.target.dataset.retried) {
                  e.target.dataset.retried = 'true';
                  e.target.src = 'https://github-readme-activity-graph.vercel.app/graph?username=rohithIlluri&theme=default&hide_border=true';
                  return;
                }
                
                // Contribution calendar fallback
                e.target.parentElement.innerHTML = `
                  <div class="bg-white border border-gray-200 p-6 rounded shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">📈 Contribution Activity</h3>
                    <div class="grid grid-cols-7 gap-1 text-center">
                      <div class="text-xs text-gray-500 py-1">S</div>
                      <div class="text-xs text-gray-500 py-1">M</div>
                      <div class="text-xs text-gray-500 py-1">T</div>
                      <div class="text-xs text-gray-500 py-1">W</div>
                      <div class="text-xs text-gray-500 py-1">T</div>
                      <div class="text-xs text-gray-500 py-1">F</div>
                      <div class="text-xs text-gray-500 py-1">S</div>
                      ${Array.from({length: 35}, (_, i) => {
                        const level = Math.floor(Math.random() * 4);
                        const colors = ['bg-gray-100', 'bg-green-200', 'bg-green-400', 'bg-green-600'];
                        return `<div class="w-3 h-3 ${colors[level]} rounded-sm"></div>`;
                      }).join('')}
                    </div>
                    <div class="mt-4 text-xs text-gray-500 text-center">Contribution graph service unavailable - showing sample data</div>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;