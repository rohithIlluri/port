import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from '../sections/Skills';

describe('Skills Component', () => {
  test('renders section title and description', () => {
    render(<Skills />);
    
    expect(screen.getByText('Core Competencies')).toBeInTheDocument();
    expect(screen.getByText('Technologies and tools I use to bring ideas to life')).toBeInTheDocument();
  });

  test('renders all skill cards', () => {
    render(<Skills />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  test('renders skill descriptions', () => {
    render(<Skills />);
    
    expect(screen.getByText('ES6+, Async, Modern JS')).toBeInTheDocument();
    expect(screen.getByText('Hooks, Context, Router')).toBeInTheDocument();
    expect(screen.getByText('Utility-first, Responsive')).toBeInTheDocument();
    expect(screen.getByText('Express, APIs, Backend Dev')).toBeInTheDocument();
    expect(screen.getByText('Data Science, ML')).toBeInTheDocument();
    expect(screen.getByText('Version Control, CI/CD')).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Skills />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'skills');
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('skill cards have hover effects', () => {
    render(<Skills />);
    
    const skillCards = document.querySelectorAll('[class*="hover:scale-105"]');
    expect(skillCards.length).toBeGreaterThan(0);
  });

  test('renders skill icons', () => {
    render(<Skills />);
    
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  test('has focus styles for accessibility', () => {
    render(<Skills />);
    
    const focusElements = document.querySelectorAll('[class*="focus-within:ring"]');
    expect(focusElements.length).toBeGreaterThan(0);
  });

  test('uses proper grid layout classes', () => {
    render(<Skills />);
    
    const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    expect(gridContainer).toBeInTheDocument();
  });
});