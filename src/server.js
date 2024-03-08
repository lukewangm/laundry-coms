const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

var timerEndTimes = [null, null, null, null];

const sendCurrentTime = () => {
    timerEndTimes.forEach((endTime, i) => {
        if (endTime !== null) {
            const timerMsg = {
                id: i,
                endTime: endTime,
                reset: false,
            };
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(timerMsg));
                }
            });
        }
    });
};

server.on('connection', (socket) => {
    socket.on('message', (message) => {
        try {
            const timerMsg = JSON.parse(message);

            if (timerMsg.type === "requestTimer") {
                sendCurrentTime();
            } else {
                console.log('Received timer:', timerMsg.id);
                timerEndTimes[timerMsg.id] = timerMsg.endTime;
                console.log(timerEndTimes[timerMsg.id]);
                server.clients.forEach((client) => {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            }
        } catch (e) {
            console.error("Failed to parse incoming message as JSON:", e);
        }
    });
});
