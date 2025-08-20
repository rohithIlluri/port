import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { fetchGitHubRepos } from "./utils/api";

// Lazy load components for better performance
const Hero = lazy(() => import("./components/sections/Hero"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Sidebar = lazy(() => import("./components/layout/Sidebar"));
const RightSidebar = lazy(() => import("./components/layout/RightSidebar"));

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);
  const [isGithubStatsOpen, setIsGithubStatsOpen] = useState(false);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGitHubRepos();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  const handleRepoClick = useCallback((repoName) => {
    const repo = repos.find((r) => r.name === repoName);
    setSelectedRepo(repo);
  }, [repos]);

  return (
    <div className="min-h-screen liquid-bg text-black font-sans antialiased selection:bg-black/10 relative">
      {/* Liquid Glass Overlay */}
      <div className="app-liquid-overlay">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
            {/* Enhanced Mobile GitHub Stats Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <div className="relative">
        <button
            onClick={() => setIsGithubStatsOpen(!isGithubStatsOpen)}
            className="group relative p-4 bg-white text-black rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Toggle GitHub statistics modal"
            aria-expanded={isGithubStatsOpen}
            aria-controls="github-stats-modal"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-gray-700/5 rounded-2xl pointer-events-none"></div>
            
            <div className="relative flex items-center space-x-2">
              <div className="relative">
                <svg className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
                {/* Activity indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
              <span className="text-xs font-bold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">GitHub</span>
            </div>
        </button>
          
          {/* Subtle floating shadow */}
          <div className="absolute inset-0 bg-gray-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
      </div>





      {/* Full-Screen GitHub Stats Modal */}
      {isGithubStatsOpen && (
        <div
          id="github-stats-modal"
          className="lg:hidden fixed inset-0 z-50 bg-black"
          role="dialog"
          aria-modal="true"
          aria-labelledby="github-modal-title"
        >
          <div className="absolute inset-0 bg-gray-800 border border-gray-600 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gray-700"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-white/15 to-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>
            
            {/* Header with back button */}
            <div className="relative z-10 flex items-center justify-between p-6 pt-12 border-b border-gray-600 bg-gray-700">
              <div className="flex items-center space-x-4">
                                  <button
                    onClick={() => setIsGithubStatsOpen(false)}
                    className="group p-3 hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-500 hover:border-gray-400 shadow-lg"
                    aria-label="Close GitHub statistics modal"
                  >
                  <svg className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center border border-gray-500 shadow-lg">
                    <svg className="w-7 h-7 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 id="github-modal-title" className="text-2xl font-bold text-white drop-shadow-lg">GitHub Dashboard</h2>
                    <p className="text-white/80 text-sm drop-shadow-sm">Repository stats and activity</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 bg-gray-700" style={{height: 'calc(100vh - 120px)'}}>
              <div className="bg-gray-600 rounded-2xl border border-gray-500 shadow-2xl p-6 h-full overflow-y-auto">
              <ErrorBoundary>
                <Sidebar />
              </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Full-Screen Mobile Music Player Modal */}
      {isMobilePlayerOpen && (
        <div
          id="music-player-modal"
          className="lg:hidden fixed inset-0 z-50 bg-black"
          role="dialog"
          aria-modal="true"
          aria-labelledby="music-modal-title"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
            {/* Enhanced dynamic background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-red-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-purple-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-orange-500/10 to-red-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
              <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-blue-500/15 rounded-full blur-xl animate-pulse delay-1500"></div>
            </div>
            
            {/* Enhanced header with better controls */}
            <div className="relative z-10 flex items-center justify-between p-4 pt-12 bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border-b border-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center border border-red-400 shadow-2xl">
                    <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 id="music-modal-title" className="text-2xl font-bold text-white drop-shadow-lg">YouTube Music</h2>
                    <p className="text-white/80 text-sm drop-shadow-sm">Premium mobile experience</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced control buttons */}
              <div className="flex items-center space-x-2">
                {/* Mini player toggle */}
                <button
                  onClick={() => setIsMobilePlayerOpen(false)}
                  className="group p-3 hover:bg-gray-700/80 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-500 hover:border-gray-400 shadow-lg backdrop-blur-sm"
                  aria-label="Minimize to mini player"
                >
                  <svg className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Enhanced pull-down indicator with text and gesture hint */}
            <div className="relative z-10 flex flex-col items-center py-3 bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md">
              <div className="w-12 h-1 bg-white/40 rounded-full mb-2"></div>
              <p className="text-xs text-white/60 font-medium">Swipe down to minimize</p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
            
            {/* Enhanced video player area with better spacing */}
            <div className="relative z-10 flex-1 overflow-hidden px-2" style={{height: 'calc(100vh - 140px)'}}>
              <ErrorBoundary>
                <RightSidebar hideHeader={true} />
              </ErrorBoundary>
            </div>
            
            {/* Enhanced bottom controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
              <div className="flex items-center justify-center space-x-6">
                {/* Previous track */}
                <button className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                
                {/* Play/Pause */}
                <button className="p-4 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/40 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/40 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                
                {/* Next track */}
                <button className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="py-6 xl:py-8 relative pb-12 sm:pb-16 lg:pb-8 xl:pb-12" role="main">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 lg:gap-8 justify-center">
            {/* Left Desktop Sidebar - Fixed width for consistency */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <Suspense fallback={
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading sidebar...</p>
                  </div>
                }>
                  <ErrorBoundary>
                    <Sidebar />
                  </ErrorBoundary>
                </Suspense>
              </div>
            </div>

            {/* Main Content - Mobile first, centered with max width */}
            <div className="flex-1 max-w-4xl mx-auto xl:mx-0">
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

              {/* Enhanced Mobile GitHub Stats Quick View */}
              <div className="lg:hidden relative bg-white rounded-3xl border border-gray-200 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group mt-2 sm:mt-3 lg:mt-4">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-gray-700/10 pointer-events-none"></div>
                {/* Subtle animated background elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gray-300/20 rounded-full blur-xl animate-pulse opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gray-400/15 rounded-full blur-lg animate-pulse delay-1000 opacity-40"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center group-hover:text-gray-900 transition-colors duration-300">
                      <div className="relative mr-3">
                        <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      </div>
                      GitHub Dashboard
                    </h3>
                    <button
                      onClick={() => setIsGithubStatsOpen(true)}
                      className="group/button px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 font-semibold rounded-xl border border-blue-300 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
                    >
                      <span className="text-sm">View Details</span>
                      <svg className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        Explore detailed GitHub statistics, repository insights, and coding achievements.
                      </p>
                      <p className="text-gray-500 text-xs mt-2 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Interactive full-screen experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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

              {/* Projects Section */}
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
                      selectedRepo={selectedRepo}
                      handleRepoClick={handleRepoClick}
                    />
                  </ErrorBoundary>
                </Suspense>
              </section>

              <Suspense fallback={
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading contact...</p>
                </div>
              }>
                <ErrorBoundary>
                  <Contact />
                </ErrorBoundary>
              </Suspense>
            </div>

            {/* Right Desktop Sidebar - Video Player */}
            <div className="hidden xl:block w-[800px] flex-shrink-0">
              <div className="sticky top-8 h-[calc(80vh-2.2rem)]">
                <Suspense fallback={
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading music player...</p>
                  </div>
                }>
                  <ErrorBoundary>
                    <RightSidebar />
                  </ErrorBoundary>
                </Suspense>
              </div>
            </div>
          </div>

          {/* Tablet GitHub Stats Section (lg to xl breakpoint) */}
          <div className="hidden lg:block xl:hidden mt-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* GitHub Stats Tab */}
                <button 
                  onClick={() => setIsGithubStatsOpen(!isGithubStatsOpen)}
                  className={`w-full p-6 text-left hover:bg-gray-50 transition-all duration-300 ${isGithubStatsOpen ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">GitHub Dashboard</h3>
                        <p className="text-sm text-gray-600">View repositories, stats & activity</p>
                      </div>
                    </div>
                    <svg className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isGithubStatsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Tablet GitHub Content Area */}
              {isGithubStatsOpen && (
                <div className="mt-4 bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
                  <ErrorBoundary>
                    <Sidebar />
                  </ErrorBoundary>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Mobile YouTube Music Player Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-2xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        {/* Mini Player Mode - When not expanded */}
        <div className="relative w-full p-4">
          <div className="flex items-center justify-between">
            {/* Left side - Music info and controls */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              {/* Album art with play/pause overlay */}
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg border border-red-500 relative overflow-hidden">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  {/* Animated pulse ring */}
                  <div className="absolute inset-0 bg-red-500/20 rounded-xl animate-ping opacity-30"></div>
                </div>
                
                {/* Play/Pause button overlay */}
                <button 
                  className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label="Play or pause music"
                >
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </button>
              </div>

              {/* Music info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">YouTube Music</p>
                <p className="text-xs text-gray-500 truncate flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="truncate">Tap to expand • Swipe for controls</span>
                </p>
              </div>
            </div>

            {/* Right side - Controls and expand */}
            <div className="flex items-center space-x-3">
              {/* Quick controls */}
              <div className="flex items-center space-x-2">
                {/* Previous track */}
                <button 
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Previous track"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                
                {/* Next track */}
                <button 
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Next track"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>
              </div>

              {/* Expand button */}
              <button
                onClick={() => setIsMobilePlayerOpen(true)}
                className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Open full-screen YouTube music player"
                aria-expanded={isMobilePlayerOpen}
                aria-controls="music-player-modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-1 rounded-full w-1/3 transition-all duration-300"></div>
          </div>
        </div>
      </div>

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