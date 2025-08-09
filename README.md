#  Shipping one port at a time.

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


## Next Steps

- Add user authentication
- Implement message persistence (database)
- Add typing indicators
- Support for multiple chat rooms
- File sharing capabilities
