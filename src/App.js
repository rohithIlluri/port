import React, { useEffect, useState, useCallback } from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Playlist from "./components/Playlist";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";

// Moved outside component to prevent re-creation on every render
const showcaseRepos = ["Nnets", "toronto-project", "cryptoapp"];

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/rohithIlluri/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories from GitHub API.");
        }
        return response.json();
      })
      .then((data) => {
        const filteredRepos = data.filter((repo) =>
          showcaseRepos.includes(repo.name)
        );
        setRepos(filteredRepos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array is correct here

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
          <div className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-2xl overflow-y-auto border-l border-black/10" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 pt-20">
              <ErrorBoundary>
                <Sidebar />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      )}

      <main className="py-8 xl:py-12 relative" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <div className="hidden xl:block sticky top-8 self-start">
              <ErrorBoundary>
                <Sidebar />
              </ErrorBoundary>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl xl:max-w-4xl mx-auto xl:mx-0 space-y-12">
              <ErrorBoundary>
                <Hero />
              </ErrorBoundary>
              <ErrorBoundary>
                <Skills />
              </ErrorBoundary>
              
              {/* Projects & Music Section */}
              <section className="py-4" aria-label="Projects and Music">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ErrorBoundary>
                    <Projects 
                      repos={repos}
                      loading={loading}
                      error={error}
                      selectedRepo={selectedRepo}
                      handleRepoClick={handleRepoClick}
                    />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <Playlist />
                  </ErrorBoundary>
                </div>
              </section>

              <ErrorBoundary>
                <Contact />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;