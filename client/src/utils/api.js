import { GITHUB_API_BASE, GITHUB_USERNAME, SHOWCASE_REPOS } from '../constants/github';

/**
 * Sleep utility for delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after the delay
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch GitHub repositories for the user with retry logic
 * @param {number} retries - Number of retry attempts (default: 3)
 * @returns {Promise<Array>} Array of repositories
 */
export const fetchGitHubRepos = async (retries = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle different HTTP status codes
        switch (response.status) {
          case 403:
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          case 404:
            throw new Error("GitHub user not found. Please check the username.");
          case 500:
          case 502:
          case 503:
            throw new Error("GitHub API is temporarily unavailable. Please try again later.");
          default:
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();

      // Validate response structure
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format from GitHub API");
      }

      // Filter and validate repositories
      const filteredRepos = data.filter((repo) => {
        return SHOWCASE_REPOS.includes(repo.name) && repo && typeof repo === 'object';
      });

      return filteredRepos;

    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (error.name === 'AbortError') {
        throw new Error("Request timeout. Please check your internet connection.");
      }

      if (error.message.includes('rate limit') || error.message.includes('not found')) {
        throw error; // Don't retry these errors
      }

      // If this is the last attempt, throw the error
      if (attempt === retries) {
        break;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await sleep(delay);
    }
  }

  // If we get here, all retries failed
  throw new Error(
    lastError?.message ||
    "Failed to fetch repositories from GitHub API after multiple attempts. Please try again later."
  );
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

 