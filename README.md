# Full Stack Chat Application

A real-time chat application built with React (client) and Node.js WebSocket server.

## Project Structure

```
port/
├── client/          # React frontend application
│   ├── src/         # React source code
│   ├── public/      # Static assets
│   └── package.json # Frontend dependencies
├── server/          # Node.js WebSocket server
│   ├── index.js     # WebSocket server code
│   └── package.json # Backend dependencies
└── package.json     # Root scripts and dev dependencies
```

## Features

- Real-time messaging via WebSocket
- Guest ID system for user identification
- Responsive chat interface
- Connection status indicators
- Message history display

## Quick Start

### First Time Setup
```bash
npm run setup
```

### Development

**Option 1: Run everything together**
```bash
npm run dev
```

**Option 2: Run separately**

1. **Start the WebSocket server:**
   ```bash
   npm run server
   # or
   cd server && node index.js
   ```

2. **Start the React client:**
   ```bash
   npm run client
   # or
   cd client && npm start
   ```

3. **Open your browser:**
   - Client: http://localhost:3001
   - WebSocket: ws://localhost:8080

## Development

### Installing Dependencies
```bash
npm run install-all
```

### Building for Production
```bash
npm run build
```

### Cleaning
```bash
npm run clean
```

## Technology Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, WebSocket (ws)
- **Real-time:** WebSocket communication
- **Styling:** Tailwind CSS

## Troubleshooting

### Port Conflicts
- The client runs on port 3001 to avoid conflicts
- The server runs on port 8080
- If you get port conflicts, try: `npm run clean && npm run setup`

### WebSocket Connection Issues
- Make sure the server is running before opening the client
- Check that port 8080 is not being used by another application

## Next Steps

- Add user authentication
- Implement message persistence (database)
- Add typing indicators
- Support for multiple chat rooms
- File sharing capabilities
