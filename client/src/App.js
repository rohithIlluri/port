import React, { useEffect, useState, useCallback } from "react";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import RightSidebar from "./components/layout/RightSidebar";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { fetchGitHubRepos } from "./utils/api";

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            className="group relative p-4 bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl text-black rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-gray-300/60 focus:outline-none focus:ring-2 focus:ring-gray-400/30 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Toggle GitHub stats"
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
        <div className="lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Glass morphism background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/10"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-white/15 to-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>
            
            {/* Header with back button */}
            <div className="relative z-10 flex items-center justify-between p-6 pt-12 border-b border-white/20 bg-white/10 backdrop-blur-xl">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsGithubStatsOpen(false)}
                  className="group p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 hover:border-white/50 shadow-lg"
                >
                  <svg className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center border border-white/30 shadow-lg backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">GitHub Dashboard</h2>
                    <p className="text-white/80 text-sm drop-shadow-sm">Repository stats and activity</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 bg-white/5 backdrop-blur-sm" style={{height: 'calc(100vh - 120px)'}}>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 h-full overflow-y-auto">
              <ErrorBoundary>
                <Sidebar />
              </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Music Player Modal */}
      {isMobilePlayerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-black/20 to-purple-500/10 backdrop-blur-2xl overflow-hidden">
            {/* Dynamic background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-red-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-purple-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-orange-500/10 to-red-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>
            
            {/* Header with minimize button */}
            <div className="relative z-10 flex items-center justify-between p-4 pt-8 bg-black/20 backdrop-blur-xl border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/40 to-red-600/60 rounded-xl flex items-center justify-center border border-red-400/30 shadow-lg backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">YouTube Music</h2>
                    <p className="text-white/80 text-sm drop-shadow-sm">Full screen player</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsMobilePlayerOpen(false)}
                className="group p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 hover:border-white/50 shadow-lg"
              >
                <svg className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Pull-down indicator */}
            <div className="relative z-10 flex justify-center py-2 bg-black/10 backdrop-blur-sm">
              <div className="w-12 h-1 bg-white/40 rounded-full"></div>
            </div>
            
            {/* Video player area */}
            <div className="relative z-10 flex-1 overflow-hidden" style={{height: 'calc(100vh - 120px)'}}>
              <ErrorBoundary>
                <RightSidebar hideHeader={true} />
              </ErrorBoundary>
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
                <ErrorBoundary>
                  <Sidebar />
                </ErrorBoundary>
              </div>
            </div>

            {/* Main Content - Mobile first, centered with max width */}
            <div className="flex-1 max-w-4xl mx-auto xl:mx-0">
              <ErrorBoundary>
                <Hero />
              </ErrorBoundary>
              
              {/* Enhanced Mobile GitHub Stats Quick View */}
              <div className="lg:hidden relative bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-100/60 backdrop-blur-sm rounded-3xl border border-gray-200/60 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group mt-2 sm:mt-3 lg:mt-4">
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
                      className="group/button px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 text-blue-700 hover:text-blue-800 font-semibold rounded-xl border border-blue-200/50 hover:border-blue-300/60 shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
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

              <ErrorBoundary>
                <Skills />
              </ErrorBoundary>
              
              {/* Projects Section */}
              <section id="projects" className="scroll-offset" aria-label="Projects">
                <ErrorBoundary>
                  <Projects 
                    repos={repos}
                    loading={loading}
                    error={error}
                    selectedRepo={selectedRepo}
                    handleRepoClick={handleRepoClick}
                  />
                </ErrorBoundary>
              </section>

              <ErrorBoundary>
                <Contact />
              </ErrorBoundary>
            </div>

            {/* Right Desktop Sidebar - Video Player */}
            <div className="hidden xl:block w-[800px] flex-shrink-0">
              <div className="sticky top-8 h-[calc(80vh-2.2rem)]">
                <ErrorBoundary>
                  <RightSidebar />
                </ErrorBoundary>
              </div>
            </div>
          </div>

          {/* Tablet GitHub Stats Section (lg to xl breakpoint) */}
          <div className="hidden lg:block xl:hidden mt-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
                {/* GitHub Stats Tab */}
                <button 
                  onClick={() => setIsGithubStatsOpen(!isGithubStatsOpen)}
                  className={`w-full p-6 text-left hover:bg-gradient-to-r hover:from-gray-50/70 hover:to-gray-100/50 transition-all duration-300 ${isGithubStatsOpen ? 'bg-gradient-to-r from-gray-50 to-gray-100/80' : ''}`}
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
                <div className="mt-4 bg-gradient-to-br from-white/90 via-white/95 to-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl p-6">
                  <ErrorBoundary>
                    <Sidebar />
                  </ErrorBoundary>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Sticky Bottom Music Player Bar for Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        <button 
          onClick={() => setIsMobilePlayerOpen(true)}
          className="relative w-full p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50/70 hover:to-gray-100/50 active:from-gray-100/80 active:to-gray-150/60 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-red-400/30">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              {/* Animated pulse ring */}
              <div className="absolute inset-0 bg-red-500/20 rounded-xl animate-ping opacity-30 group-hover:opacity-50"></div>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">YouTube Music Player</p>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Tap to open full experience
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Live indicator */}
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-xs font-medium text-red-600">LIVE</span>
            </div>
            {/* Expand arrow */}
            <div className="p-2 rounded-lg bg-gray-100/50 group-hover:bg-gray-200/70 transition-colors duration-300">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default App;