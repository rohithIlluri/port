import React, { useState, useEffect, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { COMPONENT_STYLES } from './constants/theme';

// Lazy load components for better performance
const Hero = lazy(() => import("./components/sections/Hero"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Sidebar = lazy(() => import("./components/layout/Sidebar"));

// Enhanced features components
const Music = lazy(() => import("./components/sections/Music"));
const FavoriteMovies = lazy(() => import("./components/sections/FavoriteMovies"));
const GitHubStats = lazy(() => import("./components/sections/GitHubStats"));
const Stats = lazy(() => import("./components/sections/Stats"));

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubContributions, setGithubContributions] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/rohithilluri/repos?sort=updated&per_page=100');
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const reposData = await reposResponse.json();
        setRepos(reposData);
        
        // Fetch real GitHub contribution data using GraphQL
        const fetchContributions = async () => {
          try {
            const token = process.env.REACT_APP_GITHUB_TOKEN;
            
            if (!token) {
              console.warn('GitHub token not found. Using fallback data.');
              return generateFallbackContributions();
            }

            const query = `
              query {
                user(login: "rohithilluri") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `;

            const response = await fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query })
            });

            if (!response.ok) {
              throw new Error('Failed to fetch contribution data');
            }

            const data = await response.json();
            
            if (data.errors) {
              console.error('GitHub API errors:', data.errors);
              throw new Error(data.errors[0].message);
            }

            const contributionCalendar = data.data.user.contributionsCollection.contributionCalendar;
            const weeks = contributionCalendar.weeks;
            
            // Flatten weeks into individual days
            const contributions = [];
            weeks.forEach(week => {
              week.contributionDays.forEach(day => {
                contributions.push({
                  date: day.date,
                  count: day.contributionCount
                });
              });
            });

            // Sort by date (oldest first)
            contributions.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            return contributions;
          } catch (error) {
            console.error('Error fetching contributions:', error);
            return generateFallbackContributions();
          }
        };

        // Fallback function for when token is not available
        const generateFallbackContributions = () => {
          const today = new Date();
          const contributions = [];
          
          // Use a consistent seed for reproducible results
          let seed = 42;
          const seededRandom = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
          };
          
          // Generate contributions for the last year
          for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const month = date.getMonth();
            
            // Base contribution probability (higher on weekdays)
            let baseProbability = isWeekend ? 0.25 : 0.5;
            
            // Seasonal adjustments based on real developer patterns
            if (month === 11 || month === 0) { // December/January (holidays)
              baseProbability *= 0.6;
            } else if (month >= 5 && month <= 7) { // Summer (higher activity)
              baseProbability *= 1.3;
            } else if (month === 8 || month === 9) { // September/October (back to school/work)
              baseProbability *= 1.1;
            }
            
            // Generate contribution count
            let contributionCount = 0;
            if (seededRandom() < baseProbability) {
              // Distribution based on real GitHub patterns
              const rand = seededRandom();
              if (rand < 0.65) {
                contributionCount = Math.floor(rand * 3) + 1; // 1-3 (most common)
              } else if (rand < 0.88) {
                contributionCount = Math.floor(rand * 2) + 4; // 4-5 (moderate)
              } else {
                contributionCount = Math.floor(rand * 3) + 6; // 6-8 (rare, high-activity days)
              }
            }
            
            contributions.push({
              date: date.toISOString().split('T')[0],
              count: contributionCount
            });
          }
          
          return contributions;
        };
        
        const contributions = await fetchContributions();
        setGithubContributions(contributions);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);



  return (
    <div className="min-h-screen bg-white">
      <main className="py-6 xl:py-8 relative pb-12 sm:pb-16 lg:pb-8 xl:pb-12" role="main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation */}
          <nav className="flex justify-end mb-8">
            <div className="flex space-x-4">
              <a href="#" className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium">home</a>
              <a href="#projects" className="px-4 py-2 text-gray-800 hover:text-gray-600 text-sm font-medium">projects</a>
              {/* <a href="#" className="px-4 py-2 text-gray-800 hover:text-gray-600 text-sm font-medium">blogs</a>
              <a href="#" className="px-4 py-2 text-gray-800 hover:text-gray-600 text-sm font-medium">components</a> */}
            </div>
          </nav>

          {/* Main Content - Centered layout */}
          <div className="space-y-8">
            <Suspense fallback={
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            }>
              <ErrorBoundary>
                <Hero />
              </ErrorBoundary>
            </Suspense>

            {/* Projects Section - Moved here after Hero */}
            <section id="projects" className="scroll-offset" aria-label="Projects">
              <Suspense fallback={
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading projects...</p>
                </div>
              }>
                <ErrorBoundary>
                  <Projects
                    repos={repos}
                    loading={loading}
                    error={error}
                  />
                </ErrorBoundary>
              </Suspense>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="mb-12">
              <h2 className={COMPONENT_STYLES.section.heading}>Certifications</h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <ErrorBoundary>
                  <Sidebar />
                </ErrorBoundary>
              </div>
            </section>

            <Suspense fallback={
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading skills...</p>
              </div>
            }>
              <ErrorBoundary>
                <Skills />
              </ErrorBoundary>
            </Suspense>

            {/* GitHub Stats Section */}
            <Suspense fallback={
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading GitHub stats...</p>
              </div>
            }>
              <ErrorBoundary>
                <GitHubStats contributions={githubContributions} />
              </ErrorBoundary>
            </Suspense>

            {/* Music Section */}
            <Suspense fallback={
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading music...</p>
              </div>
            }>
              <ErrorBoundary>
                <Music />
              </ErrorBoundary>
            </Suspense>

            {/* Favorite Movies Section */}
            <Suspense fallback={
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading movies...</p>
              </div>
            }>
              <ErrorBoundary>
                <FavoriteMovies />
              </ErrorBoundary>
            </Suspense>

            {/* Stats Section */}
            <Suspense fallback={
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading stats...</p>
              </div>
            }>
              <ErrorBoundary>
                <Stats />
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </main>

      <Suspense fallback={
        <div className="bg-white p-8 text-center border-t border-gray-200">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading footer...</p>
        </div>
      }>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;