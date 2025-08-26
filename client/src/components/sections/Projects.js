import React, { memo } from 'react';
import { COMPONENT_STYLES } from '../../constants/theme';
import { PROJECT_REPOS, CUSTOM_PROJECTS } from '../../constants/projects';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiGraphql
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// ========================================
// PROJECTS COMPONENT
// ========================================
// 
// This component displays specific GitHub repositories based on the names
// defined in src/constants/projects.js
// 
// To update which projects are displayed:
// 1. Edit src/constants/projects.js
// 2. Replace the placeholder repo names with your actual GitHub repo names
// 3. Make sure the names exactly match your GitHub repository names
// ========================================

const Projects = ({ repos, loading, error }) => {

  // Filter repos to only show the specific ones
  const filteredRepos = repos.filter(repo => PROJECT_REPOS.includes(repo.name));

  // Helper function to get the best description for a repo
  const getRepoInfo = (repo) => {
    const customInfo = CUSTOM_PROJECTS[repo.name];
    if (customInfo) {
      return {
        description: customInfo.description,
        language: customInfo.language || repo.language,
        updated: customInfo.updated || repo.updated_at
      };
    }
    return {
      description: repo.description || "No description provided.",
      language: repo.language,
      updated: repo.updated_at
    };
  };

  // Helper function to get the skill icon for a language
  const getLanguageIcon = (language) => {
    if (!language) return null;
    
    switch (language.toLowerCase()) {
      case "javascript":
        return <SiJavascript className="w-4 h-4 text-yellow-400" />;
      case "typescript":
        return <SiTypescript className="w-4 h-4 text-blue-600" />;
      case "react":
        return <SiReact className="w-4 h-4 text-blue-400" />;
      case "node.js":
      case "nodejs":
        return <SiNodedotjs className="w-4 h-4 text-green-600" />;
      case "python":
        return <SiPython className="w-4 h-4 text-blue-500" />;
      case "java":
        return <FaJava className="w-4 h-4 text-red-600" />;
      case "html":
        return <SiHtml5 className="w-4 h-4 text-orange-500" />;
      case "css":
        return <SiCss3 className="w-4 h-4 text-blue-500" />;
      case "tailwind":
      case "tailwind css":
        return <SiTailwindcss className="w-4 h-4 text-cyan-500" />;
      case "git":
        return <SiGit className="w-4 h-4 text-orange-600" />;
      case "docker":
        return <SiDocker className="w-4 h-4 text-blue-500" />;
      case "mongodb":
        return <SiMongodb className="w-4 h-4 text-green-500" />;
      case "postgresql":
        return <SiPostgresql className="w-4 h-4 text-blue-600" />;
      case "next.js":
      case "nextjs":
        return <SiNextdotjs className="w-4 h-4 text-black" />;
      case "graphql":
        return <SiGraphql className="w-4 h-4 text-pink-500" />;
      default:
        return (
          <div className="w-4 h-4 bg-gray-400 rounded-sm flex items-center justify-center text-white text-xs font-bold">
            {language.charAt(0).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <section id="projects" className={COMPONENT_STYLES.section.base} aria-label="Projects section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={COMPONENT_STYLES.section.heading}>Recent Work</h2>
        
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
            {filteredRepos.map((repo) => {
              const repoInfo = getRepoInfo(repo);
              return (
                <article
                  key={repo.id}
                  onClick={() => window.open(repo.html_url, '_blank')}
                  className="group/project bg-white p-6 shadow-lg border border-gray-200 rounded-2xl hover:shadow-xl hover:scale-105 hover:-translate-y-2 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${repo.name} on GitHub`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(repo.html_url, '_blank');
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`${COMPONENT_STYLES.fontSizes.lg} font-bold text-black/90 group-hover/project:text-black group-hover/project:scale-105 transition-all duration-300 line-clamp-1`}>
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
                    {repoInfo.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-black/60">
                    <div className="flex items-center space-x-3">
                      {repoInfo.language && (
                        <span className="flex items-center">
                          {getLanguageIcon(repoInfo.language)}
                          <span className="ml-2">{repoInfo.language}</span>
                        </span>
                      )}
                    </div>
                    <span>{new Date(repoInfo.updated).toLocaleDateString()}</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <div className="text-center py-12 bg-white/50 rounded-md border border-black/5">
            <p className="text-black/70 text-sm">
              No matching projects found. Update the repo names in <code className="bg-gray-100 px-2 py-1 rounded">src/constants/projects.js</code> to display your projects.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Projects); 