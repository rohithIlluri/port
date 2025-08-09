import React, { memo } from 'react';

const Projects = ({ repos, loading, error, selectedRepo, handleRepoClick }) => {
  return (
    <div className="relative overflow-hidden liquid-wave group">
      <div className="glass-card p-8 lg:p-10 relative z-20 hover:glow transition-all duration-500">
          <h2 className="text-2xl font-light mb-8 text-black/90 group-hover:text-black group-hover:scale-105 transition-all duration-300">Recent Work</h2>
          
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

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => handleRepoClick(repo.name)}
                  className="group/project glass-card p-6 cursor-pointer hover:glow hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-black/90 group-hover/project:text-black group-hover/project:scale-105 transition-all duration-300 line-clamp-1">
                      {repo.name}
                    </h3>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="opacity-0 group-hover/project:opacity-100 transition-all duration-300 p-2 hover:bg-black/10 hover:scale-110 rounded hover:shadow-lg"
                    >
                      <svg className="w-4 h-4 text-black/60 hover:text-black transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  
                  <p className="text-black/70 text-sm leading-relaxed mb-4 line-clamp-3 group-hover/project:text-black/80 group-hover/project:font-medium transition-all duration-300">
                    {repo.description || "No description provided."}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-black/60">
                    <div className="flex items-center space-x-3">
                      {repo.language && (
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-black/60 rounded-full mr-1"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedRepo && (
            <div className="mt-8 glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black/90">
                  {selectedRepo.name}
                </h3>
                <div className="flex items-center space-x-3">
                  <a
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-black/70 hover:text-black transition-all duration-200 px-4 py-2 rounded-md border border-black/10 hover:border-black/20 hover:bg-black/5 group"
                  >
                    <span className="mr-2">View on GitHub</span>
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button
                    onClick={() => handleRepoClick('')}
                    className="p-2 text-black/60 hover:text-black hover:bg-black/5 rounded-md transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <p className="text-black/80 leading-relaxed mb-4">
                {selectedRepo.description || "No description provided."}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-black/70 pt-4 border-t border-black/10">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-black/60 rounded-full mr-2"></span>
                  {selectedRepo.language || "N/A"}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {selectedRepo.stargazers_count} stars
                </span>
                <span className="flex items-center">
                  <span className="mr-2 text-black/50">Updated:</span>
                  {new Date(selectedRepo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
   
  );
};

export default memo(Projects); 