const http = require('http');
const WebSocket = require('ws');

console.log('🔍 Checking application status...\n');

// Check if React client is running
const checkClient = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3001', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ React client is running on http://localhost:3001');
        resolve(true);
      } else {
        console.log('❌ React client is not responding properly');
        resolve(false);
      }
    });
    
    req.on('error', () => {
      console.log('❌ React client is not running on http://localhost:3001');
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      console.log('❌ React client connection timeout');
      resolve(false);
    });
  });
};

// Check if WebSocket server is running
const checkServer = () => {
  return new Promise((resolve) => {
    try {
      const ws = new WebSocket('ws://localhost:8080');
      
      ws.on('open', () => {
        console.log('✅ WebSocket server is running on ws://localhost:8080');
        ws.close();
        resolve(true);
      });
      
      ws.on('error', () => {
        console.log('❌ WebSocket server is not running on ws://localhost:8080');
        resolve(false);
      });
      
      setTimeout(() => {
        console.log('❌ WebSocket server connection timeout');
        resolve(false);
      }, 3000);
    } catch (error) {
      console.log('❌ WebSocket server connection failed');
      resolve(false);
    }
  });
};

// Run checks
async function checkStatus() {
  const clientRunning = await checkClient();
  const serverRunning = await checkServer();
  
  console.log('\n📊 Status Summary:');
  console.log(`Client: ${clientRunning ? '✅ Running' : '❌ Not Running'}`);
  console.log(`Server: ${serverRunning ? '✅ Running' : '❌ Not Running'}`);
  
  if (clientRunning && serverRunning) {
    console.log('\n🎉 Everything is working! You can now:');
    console.log('1. Open http://localhost:3001 in your browser');
    console.log('2. Click "💬 Open Chat" to start chatting');
    console.log('3. Open multiple browser tabs to test the chat');
  } else {
    console.log('\n🔧 To start the application:');
    console.log('1. Run: npm run dev');
    console.log('2. Or run server and client separately:');
    console.log('   - npm run server (in one terminal)');
    console.log('   - npm run client (in another terminal)');
  }
}

checkStatus(); 