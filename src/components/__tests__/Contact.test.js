import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../Contact';

describe('Contact Component', () => {
  test('renders section title and description', () => {
    render(<Contact />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Have a question or want to collaborate/)).toBeInTheDocument();
  });

  test('renders email link with correct href', () => {
    render(<Contact />);
    
    const emailLink = screen.getByRole('link', { name: /say hello/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:rohith.illuri@gmail.com');
  });

  test('renders GitHub link with correct attributes', () => {
    render(<Contact />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rohithIlluri');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('has proper semantic structure', () => {
    render(<Contact />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'contact');
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('buttons have hover and focus styles', () => {
    render(<Contact />);
    
    const emailButton = screen.getByRole('link', { name: /say hello/i });
    const githubButton = screen.getByRole('link', { name: /github/i });
    
    expect(emailButton).toHaveClass('hover:bg-black/80');
    expect(githubButton).toHaveClass('hover:bg-black');
  });

  test('renders SVG icons', () => {
    render(<Contact />);
    
    const svgs = document.querySelectorAll('svg');
    expect(svgs).toHaveLength(2); // One for email, one for GitHub
  });
});