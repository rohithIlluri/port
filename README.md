<<<<<<< feature/liquid-glass-hover-effects
# Personal Portfolio Website

A modern, responsive portfolio website built with React, featuring GitHub integration, project showcase, skills display, and an embedded YouTube music player.
=======
#  Shipping one port at a time.
>>>>>>> master

## Project Structure

```
port/
├── client/          # React frontend application
│   ├── src/         # React source code
│   │   ├── components/    # Reusable UI components
│   │   │   ├── sections/ # Main page sections (Hero, Skills, Projects, Contact)
│   │   │   ├── github/   # GitHub integration components
│   │   │   ├── layout/   # Layout components (Sidebar, RightSidebar)
│   │   │   └── ui/       # UI utilities (ErrorBoundary)
│   │   ├── constants/    # Application constants (GitHub, YouTube configs)
│   │   ├── utils/        # Helper functions (API utilities)
│   │   └── assets/       # Static assets and images
│   ├── public/          # Static assets (favicon, manifest, etc.)
│   └── package.json     # Frontend dependencies
└── package.json     # Root scripts and dev dependencies
```

<<<<<<< feature/liquid-glass-hover-effects
## Features

- 🎨 **Modern Design**: Glass-morphism aesthetic with smooth animations
- 📱 **Responsive Layout**: Mobile-first design with tablet and desktop optimizations
- 🐙 **GitHub Integration**: Real-time repository showcase and profile statistics
- 🎵 **YouTube Music Player**: Embedded music player with playlist support
- 📊 **Skills Display**: Interactive tech stack showcase with icons
- 📧 **Contact Section**: Professional contact information
- 🌟 **Achievement Badges**: Certification showcase with verification links
- 🎯 **Performance Optimized**: Lazy loading and optimized components

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### First Time Setup
```bash
# Install all dependencies
npm run setup
# or
npm install && cd client && npm install
```

### Development

**Start the development server**
```bash
npm run dev
# or
npm start
# or
cd client && npm start
```

### Access the Portfolio
- **Portfolio**: http://localhost:3001

## Building for Production

### Create Production Build
```bash
# Build the React application
npm run build
# or
cd client && npm run build
```

### Deploy
The `build` folder in `client/` contains all the static files needed for deployment. Deploy to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables
Create a `.env.local` file in the client directory for any environment-specific variables:
```env
REACT_APP_GITHUB_USERNAME=your-github-username
REACT_APP_YOUTUBE_PLAYLIST_ID=your-playlist-id
```

=======
>>>>>>> master
## Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Simple Icons** - Tech stack icons

<<<<<<< feature/liquid-glass-hover-effects
### APIs & Integrations
- **GitHub API** - Repository and profile data
- **YouTube oEmbed API** - Video information
- **YouTube iFrame Player API** - Embedded music player
=======
>>>>>>> master

## Troubleshooting

### Common Issues

#### Port Conflicts
- **React app** runs on port **3001** (configured to avoid conflicts with Create React App default)
- To resolve conflicts: Close other React apps or change port in package.json scripts

#### GitHub API Issues
- **Rate Limiting**: GitHub API has rate limits for unauthenticated requests (60/hour)
- **Missing Repos**: Ensure repositories are public and exist in the showcase list
- **Network Issues**: Check internet connection and GitHub API status

#### YouTube Player Issues
- **API Loading**: Ensure stable internet connection for YouTube API
- **Playlist Errors**: Verify playlist ID is correct and public
- **Mobile Issues**: Check if YouTube is blocked in your region

### Performance Issues
- **Slow Loading**: Check network connection and GitHub API status
- **Large Bundle Size**: Consider implementing code splitting (future optimization)
- **Memory Issues**: Close unused browser tabs and restart development server

## Future Enhancements

### Planned Features
- **Blog Section** - Add personal blog with markdown support
- **Dark Mode Toggle** - Theme switching capability
- **Contact Form** - Functional contact form with email integration
- **Project Filtering** - Advanced project categorization and search
- **Analytics Integration** - Track visitor engagement and performance

### Technical Improvements
- **TypeScript Migration** - Add type safety and better development experience
- **Testing Suite** - Add unit and integration tests
- **Performance Monitoring** - Implement performance tracking and optimization
- **Accessibility Audit** - Further improve accessibility compliance
- **SEO Optimization** - Enhanced search engine visibility
