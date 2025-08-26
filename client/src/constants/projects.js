// ========================================
// PROJECTS CONFIGURATION
// ========================================
// 
// To display your GitHub projects:
// 1. Replace the placeholder names below with your actual GitHub repository names
// 2. Make sure the names exactly match your GitHub repository names (case-sensitive)
// 3. The projects will automatically fetch data from GitHub API
//
// Example: If your GitHub repo is named "my-portfolio", use 'my-portfolio'
// ========================================

export const PROJECT_REPOS = [
  'Nnets',           // Neural Networks implementation
  'toronto-project', // Toronto city data analysis project
  'Blog',            // Personal blog application
  'spotify-UI'       // Spotify UI clone/redesign
];

// ========================================
// CUSTOM PROJECT DESCRIPTIONS
// ========================================
// 
// Custom descriptions that will override GitHub descriptions
// These provide more detailed and engaging project information
// 
// Note: Language field will display with appropriate skill icons
// ========================================

export const CUSTOM_PROJECTS = {
  'Nnets': {
    description: 'A comprehensive neural network implementation featuring backpropagation, multiple activation functions, and gradient descent optimization. Built with Python and NumPy for educational purposes and practical machine learning applications.',
    language: 'Python',
    updated: '2024-01-15'
  },
  
  'toronto-project': {
    description: 'Data analysis project exploring Toronto city datasets including demographics, transportation patterns, and urban development trends. Utilizes pandas, matplotlib, and statistical analysis to uncover insights about the city.',
    language: 'Python',
    updated: '2024-01-10'
  },
  
  'Blog': {
    description: 'A modern, responsive personal blog built with React and Node.js. Features markdown support, SEO optimization, dark/light theme switching, and a clean minimalist design focused on content readability.',
    language: 'JavaScript',
    updated: '2024-01-20'
  },
  
  'spotify-UI': {
    description: 'A beautiful Spotify UI clone built with React and Tailwind CSS. Replicates the core Spotify interface including music player controls, playlist management, and responsive design for desktop and mobile devices.',
    language: 'JavaScript',
    updated: '2024-01-18'
  }
};
