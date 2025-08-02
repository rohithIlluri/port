import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

// Mock the components to avoid complex dependencies
jest.mock('../Hero', () => () => <div data-testid="hero">Hero Component</div>);
jest.mock('../Skills', () => () => <div data-testid="skills">Skills Component</div>);
jest.mock('../Projects', () => ({ repos, loading, error, selectedRepo, handleRepoClick }) => (
  <div data-testid="projects">
    Projects Component
    {loading && <span data-testid="projects-loading">Loading</span>}
    {error && <span data-testid="projects-error">{error}</span>}
  </div>
));
jest.mock('../Playlist', () => () => <div data-testid="playlist">Playlist Component</div>);
jest.mock('../Contact', () => () => <div data-testid="contact">Contact Component</div>);
jest.mock('../Footer', () => () => <div data-testid="footer">Footer Component</div>);
jest.mock('../Sidebar', () => () => <div data-testid="sidebar">Sidebar Component</div>);

// Mock fetch for GitHub API
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders all main components', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: 'Nnets', description: 'Test repo' },
        { id: 2, name: 'toronto-project', description: 'Another repo' },
        { id: 3, name: 'cryptoapp', description: 'Crypto app' }
      ]
    });

    render(<App />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByTestId('playlist')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('shows mobile menu button on small screens', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    
    render(<App />);
    
    const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
    expect(menuButton).toBeInTheDocument();
    
    // Check that the mobile menu button container has the xl:hidden class
    const mobileMenuContainer = menuButton.parentElement;
    expect(mobileMenuContainer).toHaveClass('xl:hidden');
  });

  test('toggles mobile menu when button is clicked', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    
    render(<App />);
    
    const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
    
    // Initially, mobile menu should not be visible
    expect(screen.queryByTestId('sidebar')).toBeInTheDocument(); // Desktop sidebar
    
    // Click to open mobile menu
    fireEvent.click(menuButton);
    
    // Mobile menu should now be visible
    const mobileSidebars = screen.getAllByTestId('sidebar');
    expect(mobileSidebars).toHaveLength(2); // Desktop + Mobile
  });

  test('closes mobile menu when overlay is clicked', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    
    render(<App />);
    
    const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
    fireEvent.click(menuButton);
    
    // Find and click the overlay
    const overlay = document.querySelector('.fixed.inset-0.z-40.bg-black\\/50');
    expect(overlay).toBeInTheDocument();
    
    fireEvent.click(overlay);
    
    // Mobile menu should be closed
    expect(screen.getAllByTestId('sidebar')).toHaveLength(1); // Only desktop sidebar
  });

  test('fetches GitHub repositories on mount', async () => {
    const mockRepos = [
      { id: 1, name: 'Nnets', description: 'Test repo' },
      { id: 2, name: 'toronto-project', description: 'Another repo' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos
    });

    render(<App />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/rohithIlluri/repos');
    });
  });

  test('handles GitHub API error', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('projects-error')).toBeInTheDocument();
    });
  });

  test('has proper semantic structure', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    
    render(<App />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    const section = screen.getByRole('region', { name: /projects and music/i });
    expect(section).toBeInTheDocument();
  });

  test('has responsive layout classes', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    
    render(<App />);
    
    const gridContainer = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });
});