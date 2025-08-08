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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white text-black font-sans antialiased selection:bg-black/10">
      {/* Mobile Menu Button */}
      <div className="xl:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-white/90 backdrop-blur-sm text-black rounded-lg shadow-lg hover:shadow-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-200 hover:scale-105"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-sm shadow-2xl overflow-y-auto border-l border-black/10" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 pt-20 space-y-8">
              <ErrorBoundary>
                <Sidebar />
              </ErrorBoundary>
              <ErrorBoundary>
                <RightSidebar />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      )}

      <main className="py-10 xl:py-16 relative" role="main">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 justify-center">
            {/* Left Desktop Sidebar - Fixed width for consistency */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <ErrorBoundary>
                  <Sidebar />
                </ErrorBoundary>
              </div>
            </div>

            {/* Main Content - Centered with max width */}
            <div className="flex-1 max-w-4xl mx-auto xl:mx-0 space-y-16">
              <ErrorBoundary>
                <Hero />
              </ErrorBoundary>
              <ErrorBoundary>
                <Skills />
              </ErrorBoundary>
              
              {/* Projects Section */}
              <section id="projects" className="py-4 scroll-offset" aria-label="Projects">
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
            <div className="hidden xl:block w-96 flex-shrink-0">
              <div className="sticky top-8 h-[calc(100vh-4rem)]">
                <ErrorBoundary>
                  <RightSidebar />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;