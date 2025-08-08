import React, { memo } from 'react';
import Reveal from '../ui/Reveal';

const Projects = ({ repos, loading, error, selectedRepo, handleRepoClick }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] via-white to-black/[0.02] rounded-lg"></div>
      <Reveal className="relative bg-white/70 backdrop-blur-sm border border-black/5 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-8 lg:p-10">
        <div className="relative z-20">
          <Reveal as="h2" delay={50} className="text-2xl font-light mb-8 text-black/90">Projects</Reveal>
          <Reveal delay={120} className="bg-white/80 backdrop-blur-sm border border-black/8 rounded-md p-6 space-y-6 shadow-md hover:shadow-lg transition-all duration-300">
            <div>
              <label htmlFor="project-select" className="block text-sm font-medium text-black/80 mb-4">
                Select a Project
              </label>
              <select
                id="project-select"
                onChange={(e) => handleRepoClick(e.target.value)}
                className="w-full px-4 py-3 border border-black/15 rounded-md focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all duration-200 bg-white text-sm hover:border-black/25 shadow-sm"
              >
                <option value="">Choose a repository...</option>
                {repos.map((repo) => (
                  <option key={repo.id} value={repo.name}>
                    {repo.name}
                  </option>
                ))}
              </select>
            </div>

            {loading && (
              <div className="text-center py-12 bg-white/50 rounded-md border border-black/5">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-black/20 border-t-black"></div>
                <p className="mt-4 text-black/70 text-sm">Loading projects...</p>
              </div>
            )}

            {error && (
              <div className="bg-black/5 border border-black/10 rounded-md p-6 shadow-sm">
                <p className="text-black/80 text-center text-sm">{error}</p>
              </div>
            )}

            {selectedRepo && (
              <Reveal delay={180} className="bg-white/80 backdrop-blur-sm border border-black/10 rounded-md p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-black/90">
                    {selectedRepo.name}
                  </h3>
                  <a
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-black/70 hover:text-black transition-all duration-200 px-4 py-2 rounded-sm border border-black/10 hover:border-black/20 hover:bg-black/5 group"
                  >
                    <span className="mr-2">View on GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                      <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path d="M16 8V2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h2V2h6v6h-2v2h2a2 2 0 0 0 2-2z"/>
                      <path d="M12.5 8.5a.5.5 0 0 1-.5-.5V3.707l-4.146 4.147a.5.5 0 1 1-.708-.708L11.293 3H7.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="space-y-4">
                  <p className="text-black/80 leading-relaxed text-sm">
                    {selectedRepo.description || "No description provided."}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-black/70 pt-4 border-t border-black/5">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-black/60 rounded-full mr-2"></span>
                      {selectedRepo.language || "N/A"}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-2 text-black/50">Updated:</span>
                      {new Date(selectedRepo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Reveal>
            )}
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
};

export default memo(Projects); 