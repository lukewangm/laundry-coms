const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});

// Function to send the current time to all connected and ready clients
function sendCurrentTime() {
    const currentTime = new Date().toTimeString(); // Get current time as a string
    server.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(currentTime); // Send the current time to each client
        }
    });
}

// Call sendCurrentTime every second (1000 milliseconds)
setInterval(sendCurrentTime, 1000);

// https://www.linkedin.com/pulse/real-time-data-synchronization-react-websockets-fidisys/
server.on('connection', (socket) => {
    socket.on('message', (message) => {
        server.clients.forEach((client) => {
            if(client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

