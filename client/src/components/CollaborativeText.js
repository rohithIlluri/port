import React, { useState, useEffect, useRef } from 'react';

const WS_URL = 'ws://localhost:8080'; // WebSocket server URL

const CollaborativeText = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const ws = useRef(null);
  const chatEndRef = useRef(null);

  // Generate guest ID on mount
  useEffect(() => {
    setGuestId(`guest_${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  // WebSocket connection
  useEffect(() => {
    if (!isOpen) return;
    ws.current = new window.WebSocket(WS_URL);
    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);
    ws.current.onerror = (e) => setError('WebSocket error');
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch (e) {
        // ignore
      }
    };
    return () => {
      ws.current && ws.current.close();
    };
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !ws.current || ws.current.readyState !== 1) return;
    const msg = { guestId, text: input.trim(), timestamp: Date.now() };
    ws.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
    setInput('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openEditor = () => setIsOpen(true);
  const closeEditor = () => setIsOpen(false);

  return (
    <>
      {/* Launcher */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-xl shadow-lg border border-purple-400 text-black overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">💬 Global Chat</h3>
            <div className="text-2xl">🌐</div>
          </div>
          <p className="text-purple-100 mb-6 text-sm leading-relaxed">
            Simple global chat. All users see all messages. No blockchain, no encryption.
          </p>
          <button
            onClick={openEditor}
            className="w-full bg-purple-300 hover:bg-purple-400 text-purple-800 font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            💬 Open Chat
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Global Chat</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                  <span className="text-sm text-gray-600">👤 {guestId}</span>
                </div>
              </div>
              <button
                onClick={closeEditor}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">💬</div>
                  <p>No messages yet. Be the first to say something!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.guestId === guestId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.guestId === guestId
                          ? 'bg-purple-500 text-black'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="text-xs opacity-75 mb-1">
                        {msg.guestId === guestId ? 'You' : msg.guestId} • {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-sm">{msg.text}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={!isConnected}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || !isConnected}
                  className="px-6 py-2 bg-purple-500 text-black rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollaborativeText;