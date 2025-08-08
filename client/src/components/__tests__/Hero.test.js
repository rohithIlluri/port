import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../sections/Hero';

describe('Hero Component', () => {
  test('renders welcome message and title', () => {
    render(<Hero />);
    
    expect(screen.getByText('Welcome to my Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Building the future through')).toBeInTheDocument();
    expect(screen.getByText('Code & Innovation')).toBeInTheDocument();
  });

  test('renders description text', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Graduate student passionate about creating minimalist/)).toBeInTheDocument();
    expect(screen.getByText(/I focus on building scalable, efficient, and elegant solutions/)).toBeInTheDocument();
  });

  test('renders navigation buttons with correct links', () => {
    render(<Hero />);
    
    const exploreWorkButton = screen.getByRole('link', { name: /explore my work/i });
    const connectButton = screen.getByRole('link', { name: /let's connect/i });
    
    expect(exploreWorkButton).toBeInTheDocument();
    expect(exploreWorkButton).toHaveAttribute('href', '#projects');
    
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveAttribute('href', '#contact');
  });

  test('renders quick navigation links', () => {
    render(<Hero />);
    
    expect(screen.getByRole('link', { name: /skills/i })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact');
  });

  test('has proper semantic structure', () => {
    render(<Hero />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'about');
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test('buttons have proper focus styles', () => {
    render(<Hero />);
    
    const buttons = screen.getAllByRole('link');
    buttons.forEach(button => {
      expect(button).toHaveClass('focus:ring-2');
    });
  });
});