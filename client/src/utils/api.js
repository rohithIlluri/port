import { GITHUB_API_BASE, GITHUB_USERNAME, SHOWCASE_REPOS } from '../constants/github';

/**
 * Fetch GitHub repositories for the user
 * @returns {Promise<Array>} Array of repositories
 */
export const fetchGitHubRepos = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch repositories from GitHub API.");
    }
    
    const data = await response.json();
    return data.filter((repo) => SHOWCASE_REPOS.includes(repo.name));
  } catch (error) {
    throw new Error(`GitHub API Error: ${error.message}`);
  }
};

/**
 * Fetch GitHub profile data
 * @returns {Promise<Object>} User profile data
 */
export const fetchGitHubProfile = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch profile from GitHub API.");
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API Error: ${error.message}`);
  }
};

/**
 * Load YouTube iframe API script
 * @returns {Promise<boolean>} Promise that resolves when API is ready
 */
export const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(true);
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      // Wait for it to load
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYT);
          resolve(true);
        }
      }, 100);
      return;
    }

    // Load the script
    window.onYouTubeIframeAPIReady = () => {
      resolve(true);
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });
};

 