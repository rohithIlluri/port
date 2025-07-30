import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '../Projects';

const mockRepos = [
  {
    id: 1,
    name: 'test-repo-1',
    description: 'A test repository',
    html_url: 'https://github.com/test/repo1',
    language: 'JavaScript',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'test-repo-2',
    description: 'Another test repository',
    html_url: 'https://github.com/test/repo2',
    language: 'Python',
    updated_at: '2023-02-01T00:00:00Z'
  }
];

const mockProps = {
  repos: mockRepos,
  loading: false,
  error: null,
  selectedRepo: null,
  handleRepoClick: jest.fn()
};

describe('Projects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders project title', () => {
    render(<Projects {...mockProps} />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  test('renders select dropdown with repositories', () => {
    render(<Projects {...mockProps} />);
    
    const select = screen.getByLabelText('Select a Project');
    expect(select).toBeInTheDocument();
    
    expect(screen.getByText('Choose a repository...')).toBeInTheDocument();
    expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    expect(screen.getByText('test-repo-2')).toBeInTheDocument();
  });

  test('calls handleRepoClick when repository is selected', () => {
    render(<Projects {...mockProps} />);
    
    const select = screen.getByLabelText('Select a Project');
    fireEvent.change(select, { target: { value: 'test-repo-1' } });
    
    expect(mockProps.handleRepoClick).toHaveBeenCalledWith('test-repo-1');
  });

  test('displays loading state', () => {
    render(<Projects {...mockProps} loading={true} />);
    
    expect(screen.getByText('Loading projects...')).toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('displays error state', () => {
    const errorMessage = 'Failed to load repositories';
    render(<Projects {...mockProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('displays selected repository details', () => {
    const selectedRepo = mockRepos[0];
    render(<Projects {...mockProps} selectedRepo={selectedRepo} />);
    
    expect(screen.getByRole('heading', { name: 'test-repo-1' })).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('12/31/2022')).toBeInTheDocument();
    
    const githubLink = screen.getByRole('link', { name: /view on github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/repo1');
  });

  test('handles repository with no description', () => {
    const repoWithoutDescription = { ...mockRepos[0], description: null };
    render(<Projects {...mockProps} selectedRepo={repoWithoutDescription} />);
    
    expect(screen.getByText('No description provided.')).toBeInTheDocument();
  });

  test('handles repository with no language', () => {
    const repoWithoutLanguage = { ...mockRepos[0], language: null };
    render(<Projects {...mockProps} selectedRepo={repoWithoutLanguage} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});