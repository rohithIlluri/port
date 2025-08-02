import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollaborativeText from '../CollaborativeText';

// Mock WebSocket
const mockWebSocket = {
  readyState: 1, // OPEN
  send: jest.fn(),
  close: jest.fn(),
  onopen: null,
  onclose: null,
  onerror: null,
  onmessage: null,
};

global.WebSocket = jest.fn(() => mockWebSocket);

describe('CollaborativeText', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    mockWebSocket.readyState = 1;
  });

  test('renders the launcher button', () => {
    render(<CollaborativeText />);
    expect(screen.getByText('💬 Global Chat')).toBeInTheDocument();
    expect(screen.getByText('💬 Open Chat')).toBeInTheDocument();
  });

  test('opens modal when launcher button is clicked', () => {
    render(<CollaborativeText />);
    const button = screen.getByText('💬 Open Chat');
    fireEvent.click(button);
    
    expect(screen.getByText('Global Chat')).toBeInTheDocument();
  });

  test('closes modal when close button is clicked', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Global Chat')).not.toBeInTheDocument();
  });

  test('displays guest ID in modal', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    expect(screen.getByText(/👤 guest_/)).toBeInTheDocument();
  });

  test('handles text input', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Type your message/);
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    
    expect(textarea.value).toBe('Hello World');
  });

  test('sends message when send button is clicked', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Type your message/);
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    expect(mockWebSocket.send).toHaveBeenCalled();
  });

  test('sends message when Enter is pressed', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Type your message/);
    
    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    
    expect(mockWebSocket.send).toHaveBeenCalled();
  });

  test('shows connection status', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    // Should show connection status
    expect(screen.getByText(/Connected/)).toBeInTheDocument();
  });

  test('disables input when disconnected', () => {
    mockWebSocket.readyState = 3; // CLOSED
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Type your message/);
    const sendButton = screen.getByText('Send');
    
    expect(textarea).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  test('displays received messages', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    // Simulate receiving a message
    const testMessage = { guestId: 'guest_abc123', text: 'Hello from another user', timestamp: Date.now() };
    
    // Trigger the onmessage handler
    if (mockWebSocket.onmessage) {
      mockWebSocket.onmessage({ data: JSON.stringify(testMessage) });
    }
    
    expect(screen.getByText('Hello from another user')).toBeInTheDocument();
  });

  test('shows different styling for own messages', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('💬 Open Chat');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Type your message/);
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(textarea, { target: { value: 'My message' } });
    fireEvent.click(sendButton);
    
    // Should show "You" for own messages
    expect(screen.getByText('You')).toBeInTheDocument();
  });
}); 