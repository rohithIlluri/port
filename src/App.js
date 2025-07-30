import React, { useEffect, useState, useCallback } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Playlist from "./components/Playlist";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Moved outside component to prevent re-creation on every render
const showcaseRepos = ["Nnets", "toronto-project", "cryptoapp"];

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-8">
          <Hero />
          <Skills />
          
          {/* Projects & Music Section */}
          <section className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Projects 
                repos={repos}
                loading={loading}
                error={error}
                selectedRepo={selectedRepo}
                handleRepoClick={handleRepoClick}
              />
              <Playlist />
            </div>
          </section>

          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;