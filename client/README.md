# Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring GitHub integration, Spotify music posters, TMDB movie posters, and consistent design theming.

## Features

- **Responsive Design**: Mobile-first approach with consistent theming
- **GitHub Integration**: Real-time repository data and contribution graphs
- **Spotify Integration**: Music artist posters and direct links to Spotify
- **TMDB Integration**: Movie posters and direct links to movie details
- **Modern UI**: Clean, minimalist design with smooth animations
- **Performance**: Lazy-loaded components and optimized rendering
- **Accessibility**: ARIA labels and keyboard navigation support

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### API Keys Setup

#### GitHub API
To enable real-time GitHub stats, you need to create a GitHub Personal Access Token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `read:user` - Read user profile data
   - `read:email` - Read email addresses
4. Copy the generated token

#### Spotify API
To enable music artist posters, you need Spotify API credentials:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the Client ID and Client Secret

#### TMDB API
To enable movie posters, you need a TMDB API key:

1. Go to [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Copy the API key

### Environment Variables

Create a `.env` file in the `client` directory with your API keys:

```env
# GitHub API
REACT_APP_GITHUB_TOKEN=your_github_token_here

# Spotify API
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback

# TMDB API
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

### Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/
│   ├── sections/          # Main content sections
│   ├── layout/            # Layout components
│   ├── github/            # GitHub-specific components
│   └── ui/                # Reusable UI components
├── constants/
│   ├── theme.js           # Design system and theme constants
│   ├── spotify.js         # Spotify API configuration
│   ├── tmdb.js            # TMDB API configuration
│   └── github.js          # GitHub API configuration
└── utils/                  # Utility functions
    ├── spotify.js          # Spotify API utilities
    └── tmdb.js            # TMDB API utilities
```

## Design System

The portfolio uses a consistent design system defined in `src/constants/theme.js`:

- **Typography**: Inter font family with consistent sizing
- **Colors**: Black/white theme with gray accents
- **Spacing**: Consistent margin and padding values
- **Components**: Standardized button, card, and section styles

## Customization

### Adding New Music Artists

Edit `src/constants/spotify.js` to add new artists:

```javascript
export const MUSIC_ARTISTS = [
  {
    id: 'spotify_artist_id',
    name: 'Artist Name',
    description: 'Artist description',
    initials: 'AN',
    spotifyUrl: 'https://open.spotify.com/artist/...'
  }
];
```

### Adding New Movies

Edit `src/constants/tmdb.js` to add new movies:

```javascript
export const FAVORITE_MOVIES = [
  {
    id: tmdb_movie_id,
    name: 'Movie Title',
    description: 'Movie description',
    initials: 'MT',
    tmdbUrl: 'https://www.themoviedb.org/movie/...',
    year: 2023
  }
];
```

### Modifying the Theme

Edit `src/constants/theme.js` to customize:
- Color palette
- Typography scales
- Component styles
- Spacing values

## Performance

- Components are lazy-loaded for better initial load times
- Images are optimized and compressed
- CSS is purged in production builds
- API calls are cached and optimized
- Fallback data when APIs are unavailable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this code for your own portfolio!
