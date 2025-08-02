import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';
import CryptoJS from 'crypto-js';

const CollaborativeText = () => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const encryptionKey = useRef(CryptoJS.lib.WordArray.random(256/8).toString());
  const typingTimeoutRef = useRef(null);
  const lastSentText = useRef('');
  
  // Solana connection with fallback
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Generate session ID and wallet on component mount
  useEffect(() => {
    const newSessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
    
    // Create a new keypair for this session
    const newWallet = Keypair.generate();
    setWallet(newWallet);
    
    console.log('🔐 CollaborativeText: Session initialized', { sessionId: newSessionId, wallet: newWallet.publicKey.toString() });
    
    // Request airdrop for demo purposes
    const requestAirdrop = async () => {
      try {
        setIsLoading(true);
        console.log('💰 Requesting SOL airdrop...');
        const signature = await connection.requestAirdrop(newWallet.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        const bal = await connection.getBalance(newWallet.publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
        setError('');
        console.log('✅ Airdrop successful, balance:', bal / LAMPORTS_PER_SOL, 'SOL');
      } catch (error) {
        console.log('❌ Airdrop failed:', error);
        setError('Failed to get demo SOL. Some features may be limited.');
      } finally {
        setIsLoading(false);
      }
    };
    
    requestAirdrop();
  }, []);

  // Debounced text change handler
  const debouncedTextChange = useCallback((newText) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (newText !== lastSentText.current) {
        sendToBlockchain(newText);
        lastSentText.current = newText;
      }
    }, 1000); // Wait 1 second after user stops typing
  }, []);

  // Monitor blockchain for updates
  useEffect(() => {
    if (!wallet || !sessionId) return;

    const interval = setInterval(async () => {
      try {
        // Get recent transactions for this wallet
        const signatures = await connection.getSignaturesForAddress(wallet.publicKey, { limit: 5 });
        
        for (const sig of signatures) {
          const tx = await connection.getTransaction(sig.signature);
          if (tx && tx.meta && tx.meta.logMessages) {
            // Look for our encrypted text in transaction logs
            const logs = tx.meta.logMessages.join(' ');
            if (logs.includes(`collab-${sessionId}`)) {
              // Extract encrypted data from transaction
              const encryptedData = extractEncryptedData(tx);
              if (encryptedData) {
                try {
                  const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey.current).toString(CryptoJS.enc.Utf8);
                  if (decrypted && decrypted !== text && decrypted !== lastSentText.current) {
                    setText(decrypted);
                    setLastUpdate(new Date());
                  }
                } catch (error) {
                  console.error('Failed to decrypt message:', error);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error monitoring blockchain:', error);
        setError('Connection issues. Retrying...');
      }
    }, 3000); // Check every 3 seconds

    setIsConnected(true);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [wallet, sessionId, text]);

  const extractEncryptedData = (transaction) => {
    try {
      const logs = transaction.meta.logMessages.join(' ');
      const match = logs.match(/collab-([a-zA-Z0-9]+):([a-zA-Z0-9+/=]+)/);
      return match ? match[2] : null;
    } catch (error) {
      return null;
    }
  };

  const sendToBlockchain = async (newText) => {
    if (!wallet || !newText) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      console.log('📤 Sending text to blockchain:', newText.substring(0, 50) + '...');
      
      // Encrypt the text
      const encrypted = CryptoJS.AES.encrypt(newText, encryptionKey.current).toString();
      
      // Create a transaction with encrypted data in memo
      const transaction = new Transaction();
      
      // Add a small SOL transfer with encrypted data in memo
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: wallet.publicKey, // Send to self for demo
          lamports: 1, // Minimal amount
        })
      );
      
      // Add memo with encrypted data
      const memo = `collab-${sessionId}:${encrypted}`;
      transaction.add({
        keys: [],
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWrMygqXzQpK7sLdw1'),
        data: Buffer.from(memo, 'utf8'),
      });
      
      // Sign and send transaction
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.feePayer = wallet.publicKey;
      transaction.sign(wallet);
      
      const signature = await connection.sendTransaction(transaction);
      await connection.confirmTransaction(signature);
      
      console.log('✅ Text encrypted and sent to blockchain:', signature);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('❌ Failed to send to blockchain:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    debouncedTextChange(newText);
  };

  const copySessionLink = () => {
    try {
      const link = `${window.location.origin}${window.location.pathname}?session=${sessionId}&key=${encryptionKey.current}`;
      navigator.clipboard.writeText(link);
      setError('Link copied to clipboard!');
      setTimeout(() => setError(''), 2000);
    } catch (error) {
      setError('Failed to copy link');
    }
  };

  const clearText = async () => {
    setText('');
    lastSentText.current = '';
    await sendToBlockchain('');
  };

  const openEditor = () => setIsOpen(true);
  const closeEditor = () => setIsOpen(false);

  // Handle URL parameters for joining sessions
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');
    const keyParam = urlParams.get('key');
    
    if (sessionParam && keyParam) {
      setSessionId(sessionParam);
      encryptionKey.current = keyParam;
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      {/* Collaborative Text Launcher */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg border border-purple-400 text-white overflow-hidden relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 gap-1 h-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">🔐 Solana Text</h3>
            <div className="text-2xl">⚡</div>
          </div>
          
          <p className="text-purple-100 mb-4 text-sm">
            Decentralized encrypted text space on Solana blockchain. Share the link to collaborate anonymously.
          </p>
          
          <button
            onClick={openEditor}
            disabled={isLoading}
            className="w-full bg-purple-300 hover:bg-purple-400 disabled:bg-purple-200 text-purple-800 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
          >
            {isLoading ? '🔄 Loading...' : '🚀 Open Editor'}
          </button>
        </div>
      </div>

      {/* Collaborative Text Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Solana Text Space</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {isConnected ? 'Connected to Solana' : 'Disconnected'}
                  </span>
                  <span className="text-sm text-gray-600">⚡ {balance.toFixed(4)} SOL</span>
                  {isTyping && (
                    <span className="text-sm text-blue-600">✍️ Typing...</span>
                  )}
                </div>
              </div>
              <button
                onClick={closeEditor}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="px-6 py-2 bg-yellow-50 border-b border-yellow-200">
                <div className="text-sm text-yellow-800">{error}</div>
              </div>
            )}

            {/* Session Info */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Session: <code className="bg-gray-200 px-2 py-1 rounded">{sessionId}</code>
                </div>
                <div className="flex gap-2">
                  {lastUpdate && (
                    <span className="text-xs text-gray-500">
                      Last update: {lastUpdate.toLocaleTimeString()}
                    </span>
                  )}
                  <button
                    onClick={copySessionLink}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  >
                    📋 Copy Link
                  </button>
                </div>
              </div>
            </div>

            {/* Text Editor */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Decentralized Text Editor</label>
                  <div className="flex gap-2">
                    {isLoading && (
                      <span className="text-sm text-blue-600">🔄 Sending...</span>
                    )}
                    <button
                      onClick={clearText}
                      disabled={isLoading}
                      className="text-sm bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded transition-colors"
                    >
                      🗑️ Clear
                    </button>
                  </div>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  placeholder="Start typing... Your text is encrypted and stored on Solana blockchain in real-time."
                  className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  style={{ minHeight: '300px' }}
                />
                
                <div className="mt-3 text-sm text-gray-500">
                  Characters: {text.length} | Words: {text.split(/\s+/).filter(word => word.length > 0).length}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                🔒 End-to-end encrypted • Decentralized on Solana • Anonymous collaboration
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollaborativeText;