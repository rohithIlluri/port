import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GitHubProfile from '../github/GitHubProfile';

const mockProfile = {
  name: 'John Doe',
  login: 'johndoe',
  avatar_url: 'https://github.com/avatar.jpg',
  bio: 'Software developer passionate about open source',
  location: 'San Francisco, CA',
  html_url: 'https://github.com/johndoe'
};

describe('GitHubProfile Component', () => {
  test('renders profile information correctly', () => {
    render(<GitHubProfile profile={mockProfile} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Software developer passionate about open source')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('renders avatar with proper alt text', () => {
    render(<GitHubProfile profile={mockProfile} />);
    
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', 'https://github.com/avatar.jpg');
    expect(avatar).toHaveAttribute('alt', "John Doe's avatar");
  });

  test('renders GitHub link with correct attributes', () => {
    render(<GitHubProfile profile={mockProfile} />);
    
    const githubLink = screen.getByRole('link', { name: /view on github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('handles profile without bio', () => {
    const profileWithoutBio = { ...mockProfile, bio: null };
    render(<GitHubProfile profile={profileWithoutBio} />);
    
    expect(screen.queryByText('Software developer passionate about open source')).not.toBeInTheDocument();
  });

  test('handles profile without location', () => {
    const profileWithoutLocation = { ...mockProfile, location: null };
    render(<GitHubProfile profile={profileWithoutLocation} />);
    
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument();
  });

  test('handles profile without name (uses login as fallback for alt text)', () => {
    const profileWithoutName = { ...mockProfile, name: null };
    render(<GitHubProfile profile={profileWithoutName} />);
    
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('alt', "johndoe's avatar");
  });

  test('returns null when no profile provided', () => {
    const { container } = render(<GitHubProfile profile={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('has proper styling classes', () => {
    render(<GitHubProfile profile={mockProfile} />);
    
    const container = document.querySelector('.bg-gradient-to-br.from-black.to-black\\/80');
    expect(container).toBeInTheDocument();
  });
});