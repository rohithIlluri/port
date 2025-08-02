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
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg border border-purple-400 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">💬 Global Chat</h3>
            <div className="text-2xl">🌐</div>
          </div>
          <p className="text-purple-100 mb-4 text-sm">
            Simple global chat. All users see all messages. No blockchain, no encryption.
          </p>
          <button
            onClick={openEditor}
            className="w-full bg-purple-300 hover:bg-purple-400 text-purple-800 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
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
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-6 py-2 bg-yellow-50 border-b border-yellow-200">
                <div className="text-sm text-yellow-800">{error}</div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.guestId === guestId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-4 py-2 max-w-xs break-words ${msg.guestId === guestId ? 'bg-purple-200 text-purple-900' : 'bg-gray-200 text-gray-800'}`}>
                      <span className="block text-xs font-semibold mb-1">{msg.guestId === guestId ? 'You' : msg.guestId}</span>
                      <span>{msg.text}</span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 flex gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ minHeight: '40px', maxHeight: '80px' }}
                disabled={!isConnected}
              />
              <button
                onClick={sendMessage}
                disabled={!isConnected || !input.trim()}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollaborativeText;