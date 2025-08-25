# Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring GitHub integration and consistent design theming.

## Features

- **Responsive Design**: Mobile-first approach with consistent theming
- **GitHub Integration**: Real-time repository data and contribution graphs
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

### GitHub Token Setup

To enable real-time GitHub stats, you need to create a GitHub Personal Access Token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `read:user` - Read user profile data
   - `read:email` - Read email addresses
4. Copy the generated token
5. Create a `.env` file in the `client` directory:
   ```env
   REACT_APP_GITHUB_TOKEN=your_github_token_here
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
│   └── theme.js           # Design system and theme constants
└── utils/                  # Utility functions
```

## Design System

The portfolio uses a consistent design system defined in `src/constants/theme.js`:

- **Typography**: Inter font family with consistent sizing
- **Colors**: Black/white theme with gray accents
- **Spacing**: Consistent margin and padding values
- **Components**: Standardized button, card, and section styles

## Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and use the theme constants for consistent styling
3. Add the component to `App.js` with proper lazy loading

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
- GitHub API calls are cached and optimized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this code for your own portfolio!
