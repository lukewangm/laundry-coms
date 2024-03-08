const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});

var timerEndTimes = [null,null,null,null];

const sendCurrentTime = () => {
    var i = 0;
    timerEndTimes.forEach( () => {
        if(timerEndTimes[i] != null){
                const timerMsg = {
                    id: i,
                    endTime: timerEndTimes[i],
                    reset: false,
                }
                server.clients.forEach((client) => {
                    client.send(JSON.stringify(timerMsg));      
                });  
        }
        i = i+1 ;
    });
};

// setInterval(sendCurrentTime, 5000);

// https://www.linkedin.com/pulse/real-time-data-synchronization-react-websockets-fidisys/
server.on('connection', (socket) => {
    socket.on('message', (message) => {
        const timerMsg = JSON.parse(message);

        if(timerMsg.type == "requestTimer"){
            sendCurrentTime();
        }
        else{
            console.log('Received timer:', timerMsg.id);
            timerEndTimes[timerMsg.id] = timerMsg.endTime;
            console.log(timerEndTimes[timerMsg.id]);
            server.clients.forEach((client) => {
                if(client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });       
        }
    });
});

