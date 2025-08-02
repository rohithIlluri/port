import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollaborativeText from '../CollaborativeText';

// Mock Solana Web3.js
jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn().mockImplementation(() => ({
    requestAirdrop: jest.fn().mockResolvedValue('mock-signature'),
    confirmTransaction: jest.fn().mockResolvedValue({}),
    getBalance: jest.fn().mockResolvedValue(1000000000), // 1 SOL
    getSignaturesForAddress: jest.fn().mockResolvedValue([]),
    getLatestBlockhash: jest.fn().mockResolvedValue({ blockhash: 'mock-blockhash' }),
    sendTransaction: jest.fn().mockResolvedValue('mock-tx-signature'),
  })),
  PublicKey: jest.fn().mockImplementation((key) => ({ toString: () => key })),
  Transaction: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
    recentBlockhash: '',
    feePayer: null,
    sign: jest.fn(),
  })),
  SystemProgram: {
    transfer: jest.fn().mockReturnValue({}),
  },
  LAMPORTS_PER_SOL: 1000000000,
  Keypair: {
    generate: jest.fn().mockReturnValue({
      publicKey: { toString: () => 'mock-public-key' },
    }),
  },
}));

// Mock crypto-js
const mockWordArray = {
  toString: () => 'mock-key'
};

jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn().mockReturnValue({ toString: () => 'mock-encrypted' }),
    decrypt: jest.fn().mockReturnValue({ toString: () => 'mock-decrypted' }),
  },
  lib: {
    WordArray: {
      random: jest.fn().mockReturnValue(mockWordArray),
    },
  },
  enc: {
    Utf8: 'utf8',
  },
}));

describe('CollaborativeText', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  test('renders the launcher button', () => {
    render(<CollaborativeText />);
    expect(screen.getByText('🔐 Solana Text')).toBeInTheDocument();
    expect(screen.getByText('🚀 Open Editor')).toBeInTheDocument();
  });

  test('opens modal when launcher button is clicked', () => {
    render(<CollaborativeText />);
    const button = screen.getByText('🚀 Open Editor');
    fireEvent.click(button);
    
    expect(screen.getByText('Solana Text Space')).toBeInTheDocument();
    expect(screen.getByText('Decentralized Text Editor')).toBeInTheDocument();
  });

  test('closes modal when close button is clicked', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Solana Text Space')).not.toBeInTheDocument();
  });

  test('displays session ID in modal', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    expect(screen.getByText(/Session:/)).toBeInTheDocument();
  });

  test('handles text input', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Start typing/);
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    
    expect(textarea.value).toBe('Hello World');
  });

  test('copies session link to clipboard', async () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    const copyButton = screen.getByText('📋 Copy Link');
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  test('clears text when clear button is clicked', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Start typing/);
    fireEvent.change(textarea, { target: { value: 'Test text' } });
    expect(textarea.value).toBe('Test text');
    
    const clearButton = screen.getByText('🗑️ Clear');
    fireEvent.click(clearButton);
    
    expect(textarea.value).toBe('');
  });

  test('shows loading state', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    // The component should show loading state initially
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  test('displays character and word count', () => {
    render(<CollaborativeText />);
    const openButton = screen.getByText('🚀 Open Editor');
    fireEvent.click(openButton);
    
    const textarea = screen.getByPlaceholderText(/Start typing/);
    fireEvent.change(textarea, { target: { value: 'Hello World Test' } });
    
    expect(screen.getByText(/Characters: 15/)).toBeInTheDocument();
    expect(screen.getByText(/Words: 3/)).toBeInTheDocument();
  });
}); 