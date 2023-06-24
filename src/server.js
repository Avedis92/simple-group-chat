const WebSocket = require('ws');
const http = require('http');

const onSocketError = (err) => {
    console.error(err);
};

const httpServer = http.createServer();
const wsServer = WebSocket.Server;
const port = 3000;
const host = 'localhost';

const wss = new wsServer({ noServer:true });
wss.on('connection', (ws, req) => {
    console.log('connected');
    ws.on('message', (data) => {
        console.log(data.toString());
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });
});

httpServer.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketError);

    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

httpServer.listen(port, host, () => {
    console.log(`server listening on port ${port}`);
});
