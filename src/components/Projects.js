import React from 'react';

const Projects = ({ repos, loading, error, selectedRepo, handleRepoClick }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative z-20">
        <h2 className="text-2xl font-light mb-6 text-black/90">Projects</h2>
        <div className="bg-white/95 backdrop-blur-sm border border-black/10 p-4 space-y-4 shadow-sm">
          <div>
            <label htmlFor="project-select" className="block text-xs font-medium text-black/80 mb-2">
              Select a Project
            </label>
            <select
              id="project-select"
              onChange={(e) => handleRepoClick(e.target.value)}
              className="w-full px-3 py-2 border border-black/20 focus:border-black focus:outline-none transition-colors duration-200 bg-white text-xs"
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
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-3 border-black border-t-transparent"></div>
              <p className="mt-3 text-black/70 text-xs">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="bg-black/5 border border-black/10 p-4">
              <p className="text-black/80 text-center text-xs">{error}</p>
            </div>
          )}

          {selectedRepo && (
            <div className="bg-white/90 backdrop-blur-sm border border-black/10 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-black/90">
                  {selectedRepo.name}
                </h3>
                <a
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-black/70 hover:text-black transition-colors duration-200"
                >
                  <span className="mr-1">View on GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 8V2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h2V2h6v6h-2v2h2a2 2 0 0 0 2-2z"/><path d="M12.5 8.5a.5.5 0 0 1-.5-.5V3.707l-4.146 4.147a.5.5 0 1 1-.708-.708L11.293 3H7.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5z"/></svg>
                </a>
              </div>
              
              <div className="space-y-3">
                <p className="text-black/80 leading-relaxed text-xs">
                  {selectedRepo.description || "No description provided."}
                </p>
                <div className="flex items-center space-x-4 text-xs text-black/70">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black mr-1.5"></span>
                    {selectedRepo.language || "N/A"}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1.5">Updated:</span>
                    {new Date(selectedRepo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects; 